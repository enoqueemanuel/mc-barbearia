"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { LiquidApp } from "threejs-components/build/backgrounds/liquid1.min.js";

type LiquidEffectAnimationProps = {
  imageSrc?: string;
  className?: string;
};

export function LiquidEffectAnimation({
  imageSrc = "https://cdn.21st.dev/assets/mirror/95/95e97d22cb2df434400243c60803fb89a5e25a46dad13c4a6d5cb27246173cf0.png",
  className = "",
}: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let app: LiquidApp | undefined;
    let generation = 0;
    let unmounted = false;

    function stop() {
      generation++;
      canvas!.style.opacity = "0";
      app?.dispose();
      app = undefined;
    }

    async function start() {
      stop();
      if (reducedMotion.matches || unmounted) return;
      const current = generation;
      try {
        const { default: LiquidBackground } = await import(
          "threejs-components/build/backgrounds/liquid1.min.js"
        );
        if (unmounted || current !== generation) return;
        // Check support before constructing the renderer; the photo stays visible on failure.
        if (!canvas!.getContext("webgl2")) return;
        const instance = LiquidBackground(canvas!);
        app = instance;
        instance.three.maxPixelRatio = 1;
        instance.three.resize();
        instance.liquidPlane.material.metalness = 0.75;
        instance.liquidPlane.material.roughness = 0.25;
        instance.liquidPlane.uniforms.displacementScale.value = 5;
        instance.setRain(false);
        await instance.loadImage(imageSrc);
        if (unmounted || current !== generation) return;
        // Pointer tracking is handled by the library at document level, so the
        // decorative canvas never captures clicks or touch scrolling.
        canvas!.style.touchAction = "auto";
        canvas!.style.opacity = "1";
      } catch {
        if (current === generation) stop();
      }
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      stop();
    }
    void start();
    reducedMotion.addEventListener("change", start);
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => {
      unmounted = true;
      reducedMotion.removeEventListener("change", start);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      stop();
    };
  }, [imageSrc]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <Image src={imageSrc} alt="" fill priority quality={90} sizes="100vw" unoptimized={!imageSrc.startsWith("/")} className="object-cover" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 motion-reduce:transition-none" />
    </div>
  );
}
