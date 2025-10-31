"use client";

import React from "react";
import Rating from "../rating";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton, usePrevNextButtons } from "../buttons";
import CheckCircleIcon from "@/public/icons/check-circle.svg";

const people = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    text: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”`,
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    text: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”`,
  },
  {
    id: 4,
    name: "Mooen",
    rating: 5,
    text: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”`,
  },
  {
    id: 5,
    name: "Sarah M.",
    rating: 5,
    text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="m-auto max-w-310 px-4 pb-17 xl:px-0 xl:pb-20">
      <div className="mt-[1.8rem] flex items-end min-[33.75rem]:justify-between xl:mt-0">
        <h2 className="text-[2rem] leading-9 font-black text-black not-italic lg:text-5xl lg:leading-14.5">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="grid grid-cols-[repeat(2,1fr)] items-center xl:gap-4">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden xl:mt-10" ref={emblaRef}>
        <div className="touch-[pan-y_pinch-zoom] ml-[calc(2rem_*_-1)] flex xl:-ml-5">
          {people.map((person) => (
            <Card {...person} key={person.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  name,
  rating,
  text,
}: {
  name: string;
  rating: number;
  text: string;
}) {
  return (
    <div className="translate3d-[0_0_0] min-w-0 flex-[0_0_100%] transform pl-8 lg:max-w-105 xl:pl-5">
      <div className="flex h-[11.636875rem] items-center justify-center rounded-[1.25rem] text-[4rem] font-semibold shadow-[inset_0_0_0_0.0625rem_rgba(0,0,0,0.1)] select-none xl:h-60">
        <figure className="flex flex-col-reverse p-6 xl:px-8 xl:py-7">
          <p className="sr-only">5 out of 5 stars</p>
          <div className="order-1">
            <Rating value={rating} size={"md"} color={"#FFC633"} />
          </div>
          <blockquote className="mt-2 xl:mt-3">
            <p className="text-sm leading-5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-base xl:leading-5.5">
              {text}
            </p>
          </blockquote>
          <figcaption className="mt-3 xl:mt-[0.9375rem]">
            <div className="flex items-center gap-1 text-base leading-5.5 font-bold text-black not-italic xl:text-xl xl:leading-5.5">
              {name}
              <CheckCircleIcon />
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
