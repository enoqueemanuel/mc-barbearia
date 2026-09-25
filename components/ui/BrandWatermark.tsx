import Image from "next/image";

export function BrandWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none mx-auto mt-8 w-32 select-none opacity-30 mix-blend-screen sm:mt-10 sm:w-40">
      <Image src="/brand-logo.png" alt="" width={512} height={512} className="h-auto w-full" />
    </div>
  );
}
