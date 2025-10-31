import Stats from "./stats";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex flex-col lg:-mt-px lg:bg-[#f2f0f1]">
      <div className="-mt-px flex grow flex-col bg-[#f2f0f1] md:flex-row lg:relative lg:mx-auto lg:mt-0 lg:max-w-310">
        <div className="z-[9] flex flex-col justify-center gap-5 rounded-lg px-4 pt-10 md:w-7/10 lg:w-2/4 lg:gap-8 lg:px-0 lg:pt-19">
          <h1 className="text-4xl leading-[1.9375rem] font-black text-black min-[25.75rem]:text-balance sm:text-[4rem] sm:leading-[3.604rem]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-sm leading-5 font-normal text-[rgba(0,0,0,0.6)] lg:text-base lg:leading-[1.03125rem]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            href="/shop"
            className="mt-1 inline-block w-full rounded-[3.875rem] bg-black px-13.5 py-[0.938rem] text-center text-base leading-5.5 font-medium text-white not-italic hover:bg-white hover:text-black hover:ring hover:ring-[rgba(0,0,0,0.1)] min-[57rem]:max-w-52.5 lg:mt-0"
          >
            Shop Now
          </Link>
          <Stats />
        </div>
        <div className="-mt-1.5 flex items-center justify-center md:w-3/10 md:py-12 lg:w-2/4">
          <Image
            src="/hero-desktop.png"
            alt="Young Couple desktop version"
            fill
            sizes="100vw"
            className="hidden object-cover md:block"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            alt="Young Couple mobile version"
            className="block md:hidden"
          />
        </div>
      </div>
    </div>
  );
}
