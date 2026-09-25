import Image from "next/image";

export function BrandWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -right-12 top-8 w-56 select-none opacity-[0.045] mix-blend-screen sm:right-8 sm:w-72">
      <Image src="/brand-logo.svg" alt="" width={320} height={320} unoptimized />
    </div>
  );
}
