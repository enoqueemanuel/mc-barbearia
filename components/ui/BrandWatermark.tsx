import Image from "next/image";

export function BrandWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-8 w-64 select-none opacity-[0.12] mix-blend-screen sm:right-8 sm:w-80">
      <Image src="/brand-logo.png" alt="" width={512} height={512} className="h-auto w-full" />
    </div>
  );
}
