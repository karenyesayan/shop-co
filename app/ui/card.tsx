import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Rating from "./rating";
import { getPercent } from "../lib/utils";
import { Product } from "../lib/definitions";

interface CardProps extends Product {
  size: "sm" | "md";
}

export default function Card({
  id,
  title,
  price,
  discounted_price,
  images,
  rating,
  thumbnail,
  size,
}: CardProps) {
  const sizes = {
    sm: "w-43 h-43.5 min-[23.4375rem]:rounded-[0.8125rem] min-[33.75rem]:w-42 md:w-49.5 md:h-50 lg:w-[18.4375rem] lg:h-74.5",
    md: "w-49.5 h-50 rounded-[0.8125rem] xl:w-[18.4375rem] xl:h-74.5 xl:rounded-[1.25rem]",
  };

  return (
    <div
      className={clsx(
        "group/card relative flex h-full flex-col bg-white hover:opacity-75",
        { "max-[23.4375rem]:overflow-hidden": size === "sm" },
      )}
    >
      <div className={`relative overflow-hidden bg-[#f0eeed] ${sizes[size]}`}>
        <Image
          fill={true}
          alt={title}
          src={thumbnail}
          sizes="(min-width: 808px) 50vw, 100vw"
          className="object-cover"
        />
        <Image
          fill={true}
          alt={title}
          src={images[1]}
          sizes="(min-width: 808px) 50vw, 100vw"
          className="object-cover opacity-0 transition-opacity duration-[0.5s] group-hover/card:opacity-100"
        />
      </div>
      <div className="mt-2.5 text-left xl:mt-4">
        <div className="flex items-start">
          <div className="min-w-0 text-left">
            <h6 className="truncate text-base leading-5.5 font-bold text-black not-italic xl:text-xl xl:leading-[1.6875rem]">
              {title}
            </h6>
            <div className="mt-1 flex items-center gap-[11px] xl:mt-2 xl:gap-[13px]">
              <Rating value={rating} size="sm" color="#FFC633" />
              <p className="text-xs leading-4 font-normal text-black not-italic xl:text-sm xl:leading-[1.1875rem]">
                {Number.parseFloat(String(rating)).toFixed(1)}/5
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-[5px] pt-0 xl:mt-2.5 xl:gap-2.5">
        <span className="text-xl leading-[1.6875rem] font-bold text-black not-italic xl:text-2xl xl:leading-8">
          ${price !== discounted_price ? discounted_price : price}
        </span>
        {price !== discounted_price ? (
          <>
            <span className="text-xl leading-[1.6875rem] font-bold text-[rgba(0,0,0,0.4)] not-italic line-through xl:text-2xl xl:leading-8">
              ${price}
            </span>
            <span className="flex h-5 items-center rounded-[3.875rem] bg-[rgba(255,51,51,0.1)] px-[0.508rem] py-1.5 text-[0.625rem] leading-3.5 font-medium text-[#FF3333] not-italic xl:ml-0.5 xl:h-7 xl:px-3.5 xl:py-1.5 xl:text-xs xl:leading-4">
              -{getPercent(price, discounted_price)}%
            </span>
          </>
        ) : null}
      </div>
      <Link href={`/product/${id}`} className="absolute inset-px" />
    </div>
  );
}
