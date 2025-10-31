"use client";

import clsx from "clsx";
import { Options } from "nuqs";
import { generatePagination } from "../lib/utils";
import ArrowLeftIcon from "@/public/icons/arrow-left.svg";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";

export default function Pagination({
  total,
  page,
  onChange,
}: {
  total: number;
  page: number;
  onChange: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
}) {
  const allPages = generatePagination(page, total);

  return (
    <div className="inline-flex w-full items-center justify-between pt-5 xl:pt-5">
      <PaginationArrow
        direction="left"
        onClick={() => onChange((p) => Math.max(1, p - 1))}
        isDisabled={!total}
      />

      <div className="flex -space-x-px xl:space-x-0.5">
        {allPages.map((p, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (p === "...") position = "middle";

          return (
            <PaginationNumber
              key={p}
              onClick={() => onChange(index + 1)}
              page={p}
              position={position}
              isActive={page === index + 1}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        onClick={() => onChange((p) => Math.min(total, p + 1))}
        isDisabled={!total}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: () => any;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "text-[rgba(0,0,0,0.5)] not-italic font-medium text-xs leading-5 flex w-9 h-9 items-center justify-center not-italic xl:h-10 xl:w-10 xl:text-sm xl:leading-5 rounded-lg",
    {
      "z-10 bg-[rgba(0,0,0,0.06)] text-black": isActive,
      "hover:bg-[rgba(0,0,0,0.06)]": !isActive && position !== "middle",
      "text-[rgba(0,0,0,0.5)]": position === "middle",
      "hidden sm:flex": page === 3 && !isActive,
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={onClick} className={className}>
      {page}
    </button>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}: {
  onClick: () => any;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex flex-row justify-center items-center gap-2 rounded-lg inset-ring inset-ring-[rgba(0,0,0,0.1)] not-italic font-medium text-xs leading-5 text-black h-9 xl:text-sm xl:leading-5 hover:text-white hover:bg-black",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "mr-2 md:mr-4 w-22.5 xl:mr-0 xl:w-27.5": direction === "left",
      "ml-2 md:ml-4 w-[4.5625rem] xl:ml-0 xl:w-21.5": direction === "right",
    },
  );

  const icon =
    direction === "left" ? (
      <>
        <ArrowLeftIcon className="size-4 xl:size-5" />{" "}
        <span className="">Previous</span>
      </>
    ) : (
      <>
        <span className="">Next</span>{" "}
        <ArrowRightIcon className="size-4 xl:size-5" />
      </>
    );
  return (
    !isDisabled && (
      <button className={className} onClick={onClick}>
        {icon}
      </button>
    )
  );
}
