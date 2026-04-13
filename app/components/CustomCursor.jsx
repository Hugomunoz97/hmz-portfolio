"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [points, setPoints] = useState([]);
  const pointsRef = useRef([]);
  const requestRef = useRef();

  // Color e intensidad del trazo
  const strokeColor = "#FFE500"; // Amarillo desaturado de tu paleta
  const maxStrokeOpacity = 0.5;
  const strokeWidth = 1.5;
  const MAX_AGE = 40; // N° de frames que dura el trazo en pantalla (determina el fade out)

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : undefined);
      const y = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : undefined);
      
      if (x !== undefined && y !== undefined) {
        pointsRef.current.push({
          x,
          y,
          age: 0,
        });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      // Envejecer los puntos del trazo y eliminar los que superan MAX_AGE
      const nextPoints = [];
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        p.age += 1;
        if (p.age < MAX_AGE) {
          nextPoints.push(p);
        }
      }
      pointsRef.current = nextPoints;

      // Renderizar solo si hay puntos, evitando renders en bucle con la pantalla vacía
      setPoints([...nextPoints]);
      
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <svg className="w-full h-full">
        {points.length > 2 &&
          points.slice(0, -2).map((p, i) => {
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2];

            // Para crear curvas fluidas tipo vectorizamos los puntos medios como anclas
            // y usamos los puntos reales del mouse como puntos de control de Bezier Quadratic.
            const startX = (p1.x + p2.x) / 2;
            const startY = (p1.y + p2.y) / 2;

            const endX = (p2.x + p3.x) / 2;
            const endY = (p2.y + p3.y) / 2;

            // Opacidad dinámica basada en la "edad" del punto (fade out effect)
            const opacity = Math.max(0, 1 - p2.age / MAX_AGE) * maxStrokeOpacity;

            return (
              <path
                key={`pen-stroke-${i}`}
                d={`M ${startX} ${startY} Q ${p2.x} ${p2.y} ${endX} ${endY}`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={opacity}
                className="transition-opacity duration-75"
              />
            );
          })}
          {/* El tramo final que conecta el último par de puntos */}
          {points.length > 1 && (
            <path 
               d={`M ${(points[points.length-2].x + points[points.length-1].x)/2} ${(points[points.length-2].y + points[points.length-1].y)/2} L ${points[points.length-1].x} ${points[points.length-1].y}`}
               stroke={strokeColor}
               strokeWidth={strokeWidth}
               fill="none"
               strokeLinecap="round"
               strokeOpacity={Math.max(0, 1 - points[points.length-1].age / MAX_AGE) * maxStrokeOpacity}
            />
          )}
      </svg>
    </div>
  );
}
