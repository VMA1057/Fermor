"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  url: string;
  width: number;
  height: number;
  title?: string;
  subtitle?: string;
  tag?: string;
}

export interface GridItem {
  id: string;
  px: number;
  py: number;
  pz: number;
  size: number;
  imgIdx: number;
}

export interface FocusTarget {
  px: number;
  py: number;
  pz: number;
  scaleX: number;
  scaleY: number;
  media: GalleryImage;
}

export interface InfiniteGalleryProps {
  images?: GalleryImage[];
  width?: string | number;
  height?: string | number;
  className?: string;
  density?: number;
  imageSize?: number;
  cellSize?: number;
  viewRange?: number;
  fogNear?: number;
  fogFar?: number;
  dragSpeed?: number;
  driftAmount?: number;
  friction?: number;
  autoZoom?: boolean;
  autoZoomSpeed?: number;
  imageRadius?: number;
  allowImageFocusOnClick?: boolean;
  backgroundColor?: string;
  fogColor?: string;
  onItemSelect?: (image: GalleryImage) => void;
}

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const pseudoRandom = (seed: number) => {
  const t = 10000 * Math.sin(9999 * seed);
  return t - Math.floor(t);
};

const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();
const gridCache = new Map<string, GridItem[]>();
const sharedPlaneGeo = new THREE.PlaneGeometry(1, 1);

const vertexShader = `
varying vec2 vUv;
#include <fog_pars_vertex>
void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`;

const fragmentShader = `
precision highp float;
uniform sampler2D uMap;
uniform float uOpacity;
uniform float uRadius;
uniform vec2 uSize;
varying vec2 vUv;

#ifdef USE_FOG
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  varying float vFogDepth;
#endif

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

void main() {
  vec4 tex = texture2D(uMap, vUv);

  float shortEdge = min(uSize.x, uSize.y);
  float r = uRadius * shortEdge * 0.5;
  vec2 p = (vUv - 0.5) * uSize;
  vec2 halfSize = uSize * 0.5;
  float d = roundedBox(p, halfSize, r);
  float aa = fwidth(d);
  float mask = 1.0 - smoothstep(-aa, aa, d);

  float alpha = mask * uOpacity;

  #ifdef USE_FOG
    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    alpha *= 1.0 - fogFactor;
  #endif

  if (alpha < 0.001) discard;
  gl_FragColor = vec4(tex.rgb, alpha);
  #include <colorspace_fragment>
}
`;

const globalFocusedRef = {
  current: null as { px: number; py: number; pz: number; scaleX: number; scaleY: number } | null,
};

interface ItemProps {
  info: { id: string; px: number; py: number; pz: number; size: number; imgIdx: number };
  media: GalleryImage;
  camRef: React.MutableRefObject<{ x: number; y: number; z: number }>;
  cellSize: number;
  viewRange: number;
  imageRadius: number;
  onFocus: ((target: { px: number; py: number; pz: number; scaleX: number; scaleY: number; media: GalleryImage }) => void) | null;
}

function GalleryItemPlane({
  info,
  media,
  camRef,
  cellSize,
  viewRange,
  imageRadius,
  onFocus,
}: ItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const isTarget =
    globalFocusedRef.current &&
    globalFocusedRef.current.px === info.px &&
    globalFocusedRef.current.py === info.py &&
    globalFocusedRef.current.pz === info.pz;

  const opacityRef = useRef(isTarget ? 1 : 0);
  const loadedRef = useRef(false);

  const scale = useMemo(() => {
    const aspect = media.width / media.height;
    return new THREE.Vector3(info.size * aspect, info.size, 1);
  }, [media, info.size]);

  const uniforms = useMemo(
    () =>
      THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          uMap: { value: null },
          uOpacity: { value: isTarget ? 1 : 0 },
          uRadius: { value: imageRadius },
          uSize: { value: new THREE.Vector2(1, 1) },
        },
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (textureCache.has(media.url)) {
      loadedRef.current = true;
      return;
    }
    textureLoader.setCrossOrigin("anonymous");
    textureLoader.load(
      media.url,
      (tex: THREE.Texture) => {
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        textureCache.set(media.url, tex);
        loadedRef.current = true;
      },
      undefined,
      () => {
        console.warn("InfiniteGallery: failed to load texture", media.url);
      }
    );
  }, [media.url]);

  const maxDist = cellSize * (viewRange + 1);

  useFrame(() => {
    const mesh = meshRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;

    if (!mat.uniforms.uMap.value && loadedRef.current) {
      const tex = textureCache.get(media.url);
      if (tex) {
        mat.uniforms.uMap.value = tex;
        mat.needsUpdate = true;
      }
    }

    if (!mat.uniforms.uMap.value) {
      mesh.visible = false;
      return;
    }

    const cam = camRef.current;
    if (!cam) return;

    const dx = info.px - cam.x;
    const dy = info.py - cam.y;
    const dz = info.pz - cam.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    const activeFocus = globalFocusedRef.current;
    const isThisFocused =
      activeFocus &&
      activeFocus.px === info.px &&
      activeFocus.py === info.py &&
      activeFocus.pz === info.pz;

    opacityRef.current = isThisFocused
      ? 1
      : lerp(opacityRef.current, isThisFocused || dist < maxDist ? 1 : 0, 0.12);

    mat.uniforms.uOpacity.value = opacityRef.current;
    mat.uniforms.uRadius.value = imageRadius;
    mat.uniforms.uSize.value.set(scale.x, scale.y);

    mesh.visible = opacityRef.current > 0.01;
    mesh.renderOrder = isThisFocused ? 999 : 0;
    mat.depthTest = !isThisFocused;
  });

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (onFocus) {
        e.stopPropagation();
        onFocus({
          px: info.px,
          py: info.py,
          pz: info.pz,
          scaleX: scale.x,
          scaleY: scale.y,
          media,
        });
      }
    },
    [info, scale, onFocus, media]
  );

  return (
    <mesh
      ref={meshRef}
      geometry={sharedPlaneGeo}
      position={[info.px, info.py, info.pz]}
      scale={scale}
      visible={false}
      onClick={handleClick}
    >
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        fog={true}
        side={THREE.DoubleSide}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function GridCell({
  cx,
  cy,
  cz,
  images,
  cellSize,
  density,
  imageSize,
  camRef,
  viewRange,
  imageRadius,
  onFocus,
}: {
  cx: number;
  cy: number;
  cz: number;
  images: GalleryImage[];
  cellSize: number;
  density: number;
  imageSize: number;
  camRef: React.MutableRefObject<{ x: number; y: number; z: number }>;
  viewRange: number;
  imageRadius: number;
  onFocus: ((t: FocusTarget) => void) | null;
}) {
  const items = useMemo(() => {
    const key = `${cx},${cy},${cz}|${cellSize}|${density}|${imageSize}`;
    const cached = gridCache.get(key);
    if (cached) return cached;

    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    }
    const seed = Math.abs(hash);

    const generated: GridItem[] = [];
    for (let i = 0; i < density; i++) {
      const itemSeed = seed + 7919 * i;
      const sizeVariation = imageSize * (0.65 + 0.7 * pseudoRandom(itemSeed + 4));
      generated.push({
        id: `${key}-${i}`,
        px: cx * cellSize + pseudoRandom(itemSeed + 0) * cellSize,
        py: cy * cellSize + pseudoRandom(itemSeed + 1) * cellSize,
        pz: cz * cellSize + pseudoRandom(itemSeed + 2) * cellSize,
        size: sizeVariation,
        imgIdx: Math.floor(1000000 * pseudoRandom(itemSeed + 5)),
      });
    }

    gridCache.set(key, generated);
    if (gridCache.size > 512) {
      const firstKey = gridCache.keys().next().value;
      if (firstKey !== undefined) gridCache.delete(firstKey);
    }
    return generated;
  }, [cx, cy, cz, cellSize, density, imageSize]);

  return (
    <>
      {items.map((item) => {
        const media = images[item.imgIdx % images.length];
        return media ? (
          <GalleryItemPlane
            key={item.id}
            info={item}
            media={media}
            camRef={camRef}
            cellSize={cellSize}
            viewRange={viewRange}
            imageRadius={imageRadius}
            onFocus={onFocus}
          />
        ) : null;
      })}
    </>
  );
}

function GalleryWorld({
  images,
  cellSize,
  density,
  imageSize,
  viewRange,
  dragSpeed,
  driftAmount,
  friction,
  autoZoom,
  autoZoomSpeed,
  imageRadius,
  allowFocus,
  onItemSelect,
}: {
  images: GalleryImage[];
  cellSize: number;
  density: number;
  imageSize: number;
  viewRange: number;
  dragSpeed: number;
  driftAmount: number;
  friction: number;
  autoZoom: boolean;
  autoZoomSpeed: number;
  imageRadius: number;
  allowFocus: boolean;
  onItemSelect?: (image: GalleryImage) => void;
}) {
  const { camera, gl } = useThree();

  const neighborhood = useMemo(() => {
    const list: { dx: number; dy: number; dz: number }[] = [];
    const r = viewRange + 1;
    for (let x = -r; x <= r; x++) {
      for (let y = -r; y <= r; y++) {
        for (let z = -r; z <= r; z++) {
          if (Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) <= r) {
            list.push({ dx: x, dy: y, dz: z });
          }
        }
      }
    }
    return list;
  }, [viewRange]);

  const stateRef = useRef({
    vel: { x: 0, y: 0, z: 0 },
    tgt: { x: 0, y: 0, z: 0 },
    pos: { x: 0, y: 0, z: 50 },
    drift: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    dragging: false,
    scrollAccum: 0,
    lastKey: "",
    lastTouches: [] as Touch[],
    lastTouchDist: 0,
    focused: false,
    focusTarget: null as FocusTarget | null,
    preFocusPos: { x: 0, y: 0, z: 0 },
    dragDistSq: 0,
  });

  const camPosRef = useRef({ x: 0, y: 0, z: 50 });
  const [activeCells, setActiveCells] = useState<
    { key: string; cx: number; cy: number; cz: number }[]
  >([]);

  const handleFocus = useCallback(
    (target: FocusTarget) => {
      const state = stateRef.current;
      if (state.dragDistSq > 16) return;

      if (onItemSelect && target.media) {
        onItemSelect(target.media);
      }

      if (state.focused && state.focusTarget) {
        const curr = state.focusTarget;
        if (curr.px === target.px && curr.py === target.py && curr.pz === target.pz) {
          state.focused = false;
          state.focusTarget = null;
          globalFocusedRef.current = null;
          return;
        }
        state.focusTarget = target;
        globalFocusedRef.current = target;
        state.vel = { x: 0, y: 0, z: 0 };
        state.tgt = { x: 0, y: 0, z: 0 };
        state.scrollAccum = 0;
        return;
      }

      state.focused = true;
      state.focusTarget = target;
      globalFocusedRef.current = target;
      state.preFocusPos = { ...state.pos };
      state.vel = { x: 0, y: 0, z: 0 };
      state.tgt = { x: 0, y: 0, z: 0 };
      state.scrollAccum = 0;
    },
    [onItemSelect]
  );

  const handleDismissFocus = useCallback(() => {
    const state = stateRef.current;
    if (state.focused) {
      state.focused = false;
      state.focusTarget = null;
      globalFocusedRef.current = null;
    }
  }, []);

  useEffect(() => {
    const state = stateRef.current;
    state.pos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    const cx = Math.floor(state.pos.x / cellSize);
    const cy = Math.floor(state.pos.y / cellSize);
    const cz = Math.floor(state.pos.z / cellSize);

    setActiveCells(
      neighborhood.map((n) => ({
        key: `${cx + n.dx},${cy + n.dy},${cz + n.dz}`,
        cx: cx + n.dx,
        cy: cy + n.dy,
        cz: cz + n.dz,
      }))
    );
  }, [camera, cellSize, neighborhood]);

  useEffect(() => {
    const dom = gl.domElement;
    const state = stateRef.current;

    const onMouseDown = (e: MouseEvent) => {
      state.dragging = true;
      state.lastMouse = { x: e.clientX, y: e.clientY };
      state.dragDistSq = 0;
    };

    const onMouseUp = () => {
      state.dragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const w = dom.clientWidth || 1;
      const h = dom.clientHeight || 1;
      state.mouse = {
        x: (e.clientX / w) * 2 - 1,
        y: -((e.clientY / h) * 2) + 1,
      };

      if (state.dragging) {
        const dx = e.clientX - state.lastMouse.x;
        const dy = e.clientY - state.lastMouse.y;
        state.dragDistSq += dx * dx + dy * dy;

        if (state.focused) {
          if (state.dragDistSq > 16) {
            state.focused = false;
            state.focusTarget = null;
            globalFocusedRef.current = null;
          }
        } else {
          state.tgt.x -= dx * dragSpeed * 0.025;
          state.tgt.y += dy * dragSpeed * 0.025;
        }
        state.lastMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (state.focused) {
        state.focused = false;
        state.focusTarget = null;
        globalFocusedRef.current = null;
      }
      state.scrollAccum += e.deltaY * 0.006;
    };

    const getTouchDist = (touches: Touch[]) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      state.lastTouches = Array.from(e.touches);
      state.lastTouchDist = getTouchDist(state.lastTouches);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      if (touches.length === 1 && state.lastTouches.length >= 1) {
        const t0 = touches[0];
        const prev = state.lastTouches[0];
        if (t0 && prev) {
          if (state.focused) {
            state.focused = false;
            state.focusTarget = null;
            globalFocusedRef.current = null;
          }
          state.tgt.x -= (t0.clientX - prev.clientX) * dragSpeed * 0.02;
          state.tgt.y += (t0.clientY - prev.clientY) * dragSpeed * 0.02;
        }
      } else if (touches.length === 2 && state.lastTouchDist > 0) {
        const dist = getTouchDist(touches);
        if (state.focused) {
          state.focused = false;
          state.focusTarget = null;
          globalFocusedRef.current = null;
        }
        state.scrollAccum += (state.lastTouchDist - dist) * 0.006;
        state.lastTouchDist = dist;
      }
      state.lastTouches = touches;
    };

    const onTouchEnd = (e: TouchEvent) => {
      state.lastTouches = Array.from(e.touches);
      state.lastTouchDist = getTouchDist(state.lastTouches);
    };

    const onMouseLeave = () => {
      state.mouse = { x: 0, y: 0 };
      state.dragging = false;
    };

    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    dom.addEventListener("mouseleave", onMouseLeave);
    dom.addEventListener("wheel", onWheel, { passive: false });
    dom.addEventListener("touchstart", onTouchStart, { passive: false });
    dom.addEventListener("touchmove", onTouchMove, { passive: false });
    dom.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      dom.removeEventListener("mouseleave", onMouseLeave);
      dom.removeEventListener("wheel", onWheel);
      dom.removeEventListener("touchstart", onTouchStart);
      dom.removeEventListener("touchmove", onTouchMove);
      dom.removeEventListener("touchend", onTouchEnd);
    };
  }, [gl, dragSpeed]);

  useFrame(() => {
    const state = stateRef.current;

    if (state.focused && state.focusTarget) {
      const target = state.focusTarget;
      const zoomPadding = 1.25 * Math.max(target.scaleX, target.scaleY);
      const targetX = target.px;
      const targetY = target.py;
      const targetZ = target.pz + zoomPadding;

      state.pos.x = lerp(state.pos.x, targetX, 0.08);
      state.pos.y = lerp(state.pos.y, targetY, 0.08);
      state.pos.z = lerp(state.pos.z, targetZ, 0.08);

      state.drift.x = lerp(state.drift.x, 0, 0.15);
      state.drift.y = lerp(state.drift.y, 0, 0.15);

      camera.position.set(
        state.pos.x + state.drift.x,
        state.pos.y + state.drift.y,
        state.pos.z
      );

      state.vel = { x: 0, y: 0, z: 0 };
      state.tgt = { x: 0, y: 0, z: 0 };
      state.scrollAccum = 0;
      camPosRef.current = { x: state.pos.x, y: state.pos.y, z: state.pos.z };

      const cx = Math.floor(state.pos.x / cellSize);
      const cy = Math.floor(state.pos.y / cellSize);
      const cz = Math.floor(state.pos.z / cellSize);
      const cellKey = `${cx},${cy},${cz}`;

      if (cellKey !== state.lastKey) {
        state.lastKey = cellKey;
        setActiveCells(
          neighborhood.map((n) => ({
            key: `${cx + n.dx},${cy + n.dy},${cz + n.dz}`,
            cx: cx + n.dx,
            cy: cy + n.dy,
            cz: cz + n.dz,
          }))
        );
      }
      return;
    }

    const depthFactor = clamp(state.pos.z / 50, 0.3, 2.0);
    if (!state.dragging) {
      state.drift.x = lerp(
        state.drift.x,
        state.mouse.x * driftAmount * depthFactor,
        0.12
      );
      state.drift.y = lerp(
        state.drift.y,
        state.mouse.y * driftAmount * depthFactor,
        0.12
      );
    }

    state.tgt.z += state.scrollAccum;
    state.scrollAccum *= 0.8;

    if (autoZoom) {
      state.pos.z -= autoZoomSpeed;
    }

    state.tgt.x = clamp(state.tgt.x, -3.2, 3.2);
    state.tgt.y = clamp(state.tgt.y, -3.2, 3.2);
    state.tgt.z = clamp(state.tgt.z, -3.2, 3.2);

    state.vel.x = lerp(state.vel.x, state.tgt.x, 0.16);
    state.vel.y = lerp(state.vel.y, state.tgt.y, 0.16);
    state.vel.z = lerp(state.vel.z, state.tgt.z, 0.16);

    state.pos.x += state.vel.x;
    state.pos.y += state.vel.y;
    state.pos.z += state.vel.z;

    camera.position.set(
      state.pos.x + state.drift.x,
      state.pos.y + state.drift.y,
      state.pos.z
    );

    state.tgt.x *= friction;
    state.tgt.y *= friction;
    state.tgt.z *= friction;

    camPosRef.current = { x: state.pos.x, y: state.pos.y, z: state.pos.z };

    const cx = Math.floor(state.pos.x / cellSize);
    const cy = Math.floor(state.pos.y / cellSize);
    const cz = Math.floor(state.pos.z / cellSize);
    const cellKey = `${cx},${cy},${cz}`;

    if (cellKey !== state.lastKey) {
      state.lastKey = cellKey;
      setActiveCells(
        neighborhood.map((n) => ({
          key: `${cx + n.dx},${cy + n.dy},${cz + n.dz}`,
          cx: cx + n.dx,
          cy: cy + n.dy,
          cz: cz + n.dz,
        }))
      );
    }
  });

  return (
    <>
      {allowFocus && (
        <mesh
          position={[camera.position.x, camera.position.y, camera.position.z - 400]}
          onClick={handleDismissFocus}
        >
          <planeGeometry args={[10000, 10000]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}

      {activeCells.map((cell) => (
        <GridCell
          key={cell.key}
          cx={cell.cx}
          cy={cell.cy}
          cz={cell.cz}
          images={images}
          cellSize={cellSize}
          density={density}
          imageSize={imageSize}
          camRef={camPosRef}
          viewRange={viewRange}
          imageRadius={imageRadius}
          onFocus={allowFocus ? handleFocus : null}
        />
      ))}
    </>
  );
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=75",
    width: 600,
    height: 400,
  },
  {
    url: "https://images.unsplash.com/photo-1465056836900-8f1e4f32c1f6?w=600&q=75",
    width: 600,
    height: 338,
  },
];

const getDprSnapshot = () =>
  Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);

const subscribeDpr = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
  media.addEventListener("change", cb, { once: true });
  return () => media.removeEventListener("change", cb);
};

const getDprServer = () => 1;

const normalizeColor = (hex: string) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? `#${match[1]}${match[2]}${match[3]}` : "#ffffff";
};

export function InfiniteGallery({
  width = "100%",
  height = "100%",
  className,
  images,
  density = 5,
  imageSize = 14,
  cellSize = 110,
  viewRange = 2,
  fogNear = 120,
  fogFar = 320,
  dragSpeed = 1,
  driftAmount = 8,
  friction = 0.9,
  autoZoom = false,
  autoZoomSpeed = 0.5,
  imageRadius = 0.06,
  allowImageFocusOnClick = true,
  backgroundColor = "#000000",
  fogColor = "#000000",
  onItemSelect,
}: InfiniteGalleryProps) {
  const imageList = images && images.length > 0 ? images : DEFAULT_IMAGES;
  const bg = normalizeColor(backgroundColor);
  const fog = normalizeColor(fogColor);
  const dpr = useSyncExternalStore(subscribeDpr, getDprSnapshot, getDprServer);

  return (
    <div
      className={cn("relative overflow-hidden touch-none", className)}
      style={{ width, height }}
    >
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 50], fov: 60, near: 1, far: 500 }}
        dpr={dpr}
        flat={true}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[bg]} />
        <fog attach="fog" args={[fog, fogNear, fogFar]} />
        <GalleryWorld
          images={imageList}
          cellSize={cellSize}
          density={density}
          imageSize={imageSize}
          viewRange={viewRange}
          dragSpeed={dragSpeed}
          driftAmount={driftAmount}
          friction={friction}
          autoZoom={autoZoom}
          autoZoomSpeed={autoZoomSpeed}
          imageRadius={imageRadius}
          allowFocus={allowImageFocusOnClick}
          onItemSelect={onItemSelect}
        />
      </Canvas>
    </div>
  );
}

InfiniteGallery.displayName = "InfiniteGallery";

export default InfiniteGallery;
