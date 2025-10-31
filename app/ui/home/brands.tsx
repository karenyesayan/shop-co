import Image from "next/image";

export default function Brands() {
  return (
    <div className="bg-black py-[2.39rem] sm:py-10.5">
      <div className="mx-auto flex max-w-lg flex-wrap items-center justify-around gap-y-[1.284375rem] min-[25.75rem]:gap-x-8.5 sm:max-w-xl sm:gap-x-10 lg:max-w-310 xl:justify-between">
        <Image
          alt="Versace"
          src="/versace.svg"
          width={166}
          height={33}
          className="max-h-[1.4375rem] max-xl:w-fit xl:max-h-[2.0625rem]"
        />

        <Image
          alt="Zara"
          src="/zara.svg"
          width={91}
          height={38}
          className="max-h-[1.6875rem] max-xl:w-fit xl:max-h-9.5"
        />

        <Image
          alt="Gucci"
          src="/gucci.svg"
          width={156}
          height={48}
          className="max-h-[1.5625rem] max-xl:w-fit xl:max-h-9"
        />

        <Image
          alt="Prada"
          src="/prada.svg"
          width={194}
          height={32}
          className="max-h-[1.3125rem] max-xl:w-fit xl:max-h-8"
        />

        <Image
          alt="Calvin Klein"
          src="/calvin-klein.svg"
          width={207}
          height={33}
          className="max-h-5.5 max-xl:w-fit xl:max-h-[2.0625rem]"
        />
      </div>
    </div>
  );
}
