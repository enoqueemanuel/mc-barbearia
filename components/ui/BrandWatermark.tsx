import Image from "next/image";

export function BrandWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none mx-auto mt-8 w-48 select-none opacity-50 mix-blend-screen sm:mt-10 sm:w-60">
      <Image src="/brand-logo.png" alt="" width={512} height={512} sizes="(min-width: 640px) 240px, 192px" className="h-auto w-full" />
    </div>
  );
}
