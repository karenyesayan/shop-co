import Link from "next/link";
import Image from "next/image";

export default function ImageGrid() {
  return (
    <div className="px-4 py-12.5 sm:py-20">
      <div className="mx-auto max-w-310 rounded-[1.25rem] bg-[#f0f0f0] px-6 pt-10 pb-7 lg:px-16 lg:pt-17.5 lg:pb-19 xl:rounded-[2.5rem]">
        <h2 className="mx-auto max-w-lg text-center text-4xl text-[32px] leading-9 font-black tracking-tight text-balance text-black not-italic sm:text-5xl md:max-w-none">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-3 md:mt-16 md:gap-6 xl:gap-5">
          <div className="group/item relative flex h-47.5 items-end overflow-hidden rounded-[1.25rem] bg-white hover:shadow-lg md:h-[18.0625rem]">
            <p className="absolute top-4 left-6 z-[2] text-2xl leading-8 font-bold text-black not-italic md:ml-5 md:text-4xl md:leading-[3.0625rem]">
              Casual
            </p>
            <Image
              alt="Tattooed Man"
              src="/casual.png"
              quality={100}
              fill
              sizes="100vw"
              loading="lazy"
              className="inset-0 scale-[-2_2] transform object-cover object-[28px_13%] transition duration-200 group-hover/item:scale-[-220%_220%] md:scale-[-210%_210%] md:object-[7px_12px]"
            />
            <Link
              href="/shop/casual"
              className="absolute inset-0 group-hover/item:bg-gradient-to-t group-hover/item:from-gray-800 group-hover/item:via-transparent group-hover/item:to-transparent group-hover/item:opacity-50"
            />
          </div>
          <div className="group/item relative flex h-47.5 items-end overflow-hidden rounded-[1.25rem] bg-white hover:shadow-lg md:col-span-2 md:h-[18.0625rem]">
            <p className="absolute top-4 left-6 z-[2] text-2xl leading-8 font-bold text-black not-italic md:ml-5 md:text-4xl md:leading-[3.0625rem] xl:top-[1.5625rem] xl:left-9">
              Formal
            </p>
            <Image
              alt="Smiling handsome man"
              src="/formal.png"
              quality={100}
              fill
              sizes="100vw"
              loading="lazy"
              className="inset-0 scale-200 object-cover object-[85px_-52%] transition duration-200 group-hover/item:scale-[160%] lg:scale-150 lg:object-[224px_17%]"
            />
            <Link
              href="/shop/formal"
              className="absolute inset-0 group-hover/item:bg-gradient-to-t group-hover/item:from-gray-800 group-hover/item:via-transparent group-hover/item:to-transparent group-hover/item:opacity-50"
            />
          </div>
          <div className="group/item relative flex h-47.5 items-end overflow-hidden rounded-[1.25rem] bg-white hover:shadow-lg md:col-span-2 md:h-[18.0625rem]">
            <p className="absolute top-4 left-6 z-[2] text-2xl leading-8 font-bold text-black not-italic md:ml-5 md:text-4xl md:leading-[3.0625rem] xl:top-[1.5625rem] xl:left-9">
              Party
            </p>
            <Image
              alt="Elegant girl"
              src="/party.png"
              quality={100}
              fill
              sizes="100vw"
              loading="lazy"
              className="inset-0 scale-125 object-cover object-[32px_78%] transition duration-200 group-hover/item:scale-[120%] lg:scale-110 lg:object-[90px_48%]"
            />
            <Link
              href="/shop/party"
              className="absolute inset-0 group-hover/item:bg-gradient-to-t group-hover/item:from-gray-800 group-hover/item:via-transparent group-hover/item:to-transparent group-hover/item:opacity-50"
            />
          </div>
          <div className="group/item relative flex h-47.5 items-end overflow-hidden rounded-[1.25rem] bg-white hover:shadow-lg md:h-[18.0625rem]">
            <p className="absolute top-4 left-6 z-[2] text-2xl leading-8 font-bold text-black not-italic md:ml-5 md:text-4xl md:leading-[3.0625rem] xl:top-[1.5625rem] xl:left-9">
              Gym
            </p>
            <Image
              alt="Young man holding a dumbbell"
              src="/gym.png"
              quality={100}
              fill
              sizes="100vw"
              loading="lazy"
              className="inset-0 object-cover object-[49px_36%] transition duration-200 group-hover/item:scale-[135%] lg:scale-125"
            />
            <Link
              href="/shop/gym"
              className="absolute inset-0 group-hover/item:bg-gradient-to-t group-hover/item:from-gray-800 group-hover/item:via-transparent group-hover/item:to-transparent group-hover/item:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
