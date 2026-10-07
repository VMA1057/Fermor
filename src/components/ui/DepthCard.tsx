"use client";

import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  HTMLMotionProps,
} from "framer-motion";

interface DepthCardContextValue {
  isHovered: boolean;
  isTouchOrReduced: boolean;
  baseDepth: number;
}

const DepthCardContext = createContext<DepthCardContextValue>({
  isHovered: false,
  isTouchOrReduced: false,
  baseDepth: 40,
});

export interface DepthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxRotation?: number;
  perspective?: number;
  depth?: number;
  glow?: boolean;
  glowColor?: string;
  glowSize?: number;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export function DepthCard({
  children,
  maxRotation = 12,
  perspective = 1000,
  depth = 40,
  glow = true,
  glowColor = "rgba(255, 255, 255, 0.12)",
  glowSize = 340,
  disabled = false,
  className = "",
  containerClassName = "",
  onClick,
  ...props
}: DepthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  // Normalized cursor coordinate from center (-0.5 to +0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowOpacityTarget = useMotionValue(0);

  // Responsive spring interpolation (tuned for crisp yet fluid physical response)
  const springConfig = { stiffness: 260, damping: 25, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const glowOpacity = useSpring(glowOpacityTarget, { stiffness: 220, damping: 26 });

  // 3D Perspective Rotation:
  // Cursor Top (smoothMouseY < 0) -> Tilts backward/upward (positive rotateX)
  // Cursor Bottom (smoothMouseY > 0) -> Tilts forward/downward (negative rotateX)
  // Cursor Left (smoothMouseX < 0) -> Tilts left (negative rotateY)
  // Cursor Right (smoothMouseX > 0) -> Tilts right (positive rotateY)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Center distance boost for cursor lighting
  const spotlightX = useTransform(smoothMouseX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(smoothMouseY, [-0.5, 0.5], [0, 100]);

  const glowBackground = useMotionTemplate`radial-gradient(circle ${glowSize}px at ${spotlightX}% ${spotlightY}%, ${glowColor}, transparent 70%)`;

  // Detect coarse pointers (touchscreens) and prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const touchMediaQuery = window.matchMedia("(pointer: coarse)");
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapabilities = () => {
      setIsTouchOrReduced(touchMediaQuery.matches || motionMediaQuery.matches);
    };

    updateCapabilities();
    touchMediaQuery.addEventListener("change", updateCapabilities);
    motionMediaQuery.addEventListener("change", updateCapabilities);

    return () => {
      touchMediaQuery.removeEventListener("change", updateCapabilities);
      motionMediaQuery.removeEventListener("change", updateCapabilities);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchOrReduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Calculate relative position centered at 0 (-0.5 to 0.5)
      const normX = clientX / rect.width - 0.5;
      const normY = clientY / rect.height - 0.5;

      mouseX.set(normX);
      mouseY.set(normY);
    },
    [disabled, isTouchOrReduced, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchOrReduced) return;
    setIsHovered(true);
    glowOpacityTarget.set(1);
  }, [disabled, isTouchOrReduced, glowOpacityTarget]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glowOpacityTarget.set(0);
  }, [mouseX, mouseY, glowOpacityTarget]);

  const contextValue = useMemo(
    () => ({
      isHovered,
      isTouchOrReduced,
      baseDepth: depth,
    }),
    [isHovered, isTouchOrReduced, depth]
  );

  return (
    <DepthCardContext.Provider value={contextValue}>
      <div
        className={`relative ${containerClassName}`}
        style={{
          perspective: `${perspective}px`,
        }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          style={{
            rotateX: isTouchOrReduced || disabled ? 0 : rotateX,
            rotateY: isTouchOrReduced || disabled ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          whileTap={isTouchOrReduced ? { scale: 0.98 } : undefined}
          className={`relative select-none transition-shadow duration-500 will-change-transform ${className}`}
          {...(props as HTMLMotionProps<"div">)}
        >
          {/* Subtle Ambient Shadow based on tilt */}
          <div
            className="absolute inset-0 rounded-[inherit] -z-10 pointer-events-none transition-opacity duration-500 opacity-60"
            style={{
              transform: "translateZ(-20px)",
              boxShadow: isHovered
                ? "0 30px 60px -15px rgba(0, 0, 0, 0.45), 0 10px 24px -8px rgba(0, 0, 0, 0.3)"
                : "0 15px 35px -10px rgba(0, 0, 0, 0.25), 0 5px 15px -5px rgba(0, 0, 0, 0.15)",
            }}
          />

          {/* Interactive Cursor Spotlight Glow */}
          {glow && !isTouchOrReduced && !disabled && (
            <motion.div
              className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 overflow-hidden mix-blend-screen"
              style={{
                opacity: glowOpacity,
                background: glowBackground,
              }}
            />
          )}

          {/* Card Body and Children */}
          {children}
        </motion.div>
      </div>
    </DepthCardContext.Provider>
  );
}

export interface DepthLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DepthLayer positions child elements along the 3D Z-axis.
 * Positive depth values push content toward the viewer.
 * Negative depth values push content behind the card surface.
 */
export function DepthLayer({
  depth,
  children,
  className = "",
  style = {},
  ...props
}: DepthLayerProps) {
  const { baseDepth, isTouchOrReduced } = useContext(DepthCardContext);
  const targetDepth = depth !== undefined ? depth : baseDepth;

  return (
    <div
      className={`will-change-transform [transform-style:preserve-3d] ${className}`}
      style={{
        ...style,
        transform: isTouchOrReduced ? undefined : `translateZ(${targetDepth}px)`,
        transition: "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DepthFloatingProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: number;
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  style?: React.CSSProperties;
}

/**
 * DepthFloating is for emblems, badges, cards, or chips floating above the main content layer.
 * Includes optional dynamic elevation shadow.
 */
export function DepthFloating({
  depth = 60,
  children,
  className = "",
  shadow = true,
  style = {},
  ...props
}: DepthFloatingProps) {
  const { isTouchOrReduced, isHovered } = useContext(DepthCardContext);

  return (
    <div
      className={`will-change-transform [transform-style:preserve-3d] relative ${className}`}
      style={{
        ...style,
        transform: isTouchOrReduced ? undefined : `translateZ(${depth}px)`,
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      {...props}
    >
      {shadow && !isTouchOrReduced && (
        <div
          className="absolute inset-0 rounded-[inherit] -z-10 pointer-events-none transition-opacity duration-300"
          style={{
            transform: `translateZ(-${Math.max(10, depth * 0.4)}px) translateY(8px) scale(0.96)`,
            boxShadow: isHovered
              ? "0 18px 30px -8px rgba(0, 0, 0, 0.5)"
              : "0 10px 18px -6px rgba(0, 0, 0, 0.35)",
            opacity: isHovered ? 0.8 : 0.5,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default DepthCard;
