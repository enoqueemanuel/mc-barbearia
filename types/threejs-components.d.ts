declare module "threejs-components/build/backgrounds/liquid1.min.js" {
  export interface LiquidApp {
    three: { maxPixelRatio: number; resize(): void };
    liquidPlane: {
      material: { metalness: number; roughness: number };
      uniforms: { displacementScale: { value: number } };
    };
    loadImage(src: string): Promise<void>;
    setRain(enabled: boolean): void;
    dispose(): void;
  }
  export default function LiquidBackground(canvas: HTMLCanvasElement): LiquidApp;
}
