"use client";

import clsx from "clsx";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";

export default function Gallery({
  slides,
  options = {},
}: {
  slides: string[];
  options?: EmblaOptionsType;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    axis: "x",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex w-full flex-col max-xl:gap-y-3 sm:col-span-4 md:col-span-5 xl:col-span-6 xl:flex-row-reverse">
      <div ref={emblaMainRef} className="overflow-hidden">
        <div className="touch-[pan-y_pinch-zoom] ml-[calc(1rem_*_-1)] flex backface-hidden">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-[0] flex-[0_0_100%] pl-4">
              <div className="flex h-72.5 items-center justify-center overflow-hidden rounded-[1.25rem] xl:h-132.5">
                <Image
                  alt={`slide ${index}`}
                  src={slide}
                  width={640}
                  height={960}
                  className="aspect-2/3 w-full bg-gray-100 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex h-26.5 w-full items-stretch overflow-hidden xl:h-auto xl:w-[42.8625rem]">
        <div
          className="absolute h-full w-full overflow-hidden xl:max-w-38"
          ref={emblaThumbsRef}
        >
          <div className="ml-[calc(0.520625rem * -1)] flex h-full flex-row xl:flex-col xl:justify-between">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={slide}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Thumb({
  selected,
  index,
  onClick,
}: {
  selected: boolean;
  index?: string;
  onClick: () => void;
}) {
  return (
    <div className="min-w-[0] pl-[0.520625rem] max-xl:w-full xl:pl-0">
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          "m-0 flex inline-flex h-26.5 w-full cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-[1.25rem] border-0 bg-transparent bg-cover bg-center bg-no-repeat p-0 no-underline xl:h-42",
          { "shadow-[inset_0_0_0_1px_black]": selected },
        )}
        style={{
          backgroundImage: `url("${index}")`,
        }}
      />
    </div>
  );
}
