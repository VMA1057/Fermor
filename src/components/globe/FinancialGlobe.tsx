"use client";

import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { countries, Country } from "@/data/countries";
import { useCursor } from "../cursor/CursorContext";


interface FinancialGlobeProps {
  onSelectCountry: (country: Country) => void;
  selectedCountry: Country | null;
}

export default function FinancialGlobe({ onSelectCountry, selectedCountry }: FinancialGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const { setCursorState, setCursorText } = useCursor();

  useEffect(() => {
    // Resize observer for responsive globe
    const handleResize = () => {
      const container = document.getElementById("globe-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = !selectedCountry;
      controls.autoRotateSpeed = 1;
      controls.enableZoom = false;

      if (selectedCountry) {
        globeRef.current.pointOfView({
          lat: selectedCountry.latitude,
          lng: selectedCountry.longitude,
          altitude: 1.0
        }, 1000);
      } else {
        globeRef.current.pointOfView({ altitude: 1.6 }, 1000);
      }
    }
  }, [selectedCountry]);

  // Generate arcs for financial routes
  const arcsData = [
    { startLat: 20.5937, startLng: 78.9629, endLat: 1.3521, endLng: 103.8198 }, // India to Singapore
    { startLat: 20.5937, startLng: 78.9629, endLat: 37.0902, endLng: -95.7129 }, // India to US
    { startLat: 37.0902, startLng: -95.7129, endLat: 36.2048, endLng: 138.2529 }, // US to Japan
    { startLat: 55.3781, startLng: -3.4360, endLat: 51.1657, endLng: 10.4515 }, // UK to Germany
  ];

  return (
    <div 
      id="globe-container" 
      className="w-full h-full absolute inset-0 flex items-center justify-center cursor-none"
      onMouseEnter={() => setCursorState("globe")}
      onMouseLeave={() => setCursorState("normal")}
    >
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={true}
        
        // Country markers
        pointsData={countries}
        pointLat="latitude"
        pointLng="longitude"
        pointColor={(d) => ((d as Country).id === selectedCountry?.id ? "#0F6B4F" : "#B8944A")}
        pointAltitude={(d) => ((d as Country).id === selectedCountry?.id ? 0.1 : 0.05)}
        pointRadius={(d) => ((d as Country).id === selectedCountry?.id ? 1.5 : 0.8)}
        pointsMerge={false}
        
        // Connections
        arcsData={arcsData}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={() => "#0F6B4F"}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        
        // Interactions
        onPointClick={(d) => {
          onSelectCountry(d as Country);
          setCursorState("normal");
        }}
        onPointHover={(d) => {
          if (d) {
            setCursorState("country");
            setCursorText((d as Country).code);
          } else {
            setCursorState("globe");
          }
        }}
        
        // Visuals
        atmosphereColor="#0F6B4F" // Brand deep-green atmosphere
        atmosphereAltitude={0.15}
      />
    </div>
  );
}
