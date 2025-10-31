"use client";

import { clsx } from "clsx";
import { useState } from "react";
import ChevronRightIcon from "@/public/icons/chevron-right.svg";

export default function Collapse({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  function handleChange(e: React.SyntheticEvent) {
    e.preventDefault();
    setExpanded(!expanded);
  }

  return (
    <div className="border-t border-[rgba(0,0,0,0.1)] py-5 xl:py-6">
      <h3 className="flow-root">
        <button
          onClick={handleChange}
          className="flex w-full items-center justify-between bg-white text-xl leading-[1.6875rem] font-normal text-black not-italic hover:text-gray-500"
        >
          <span className="font-bold text-black">{title}</span>
          <span className="ml-6 flex items-center xl:ml-0">
            <ChevronRightIcon
              className={clsx(
                "size-4 transform fill-black transition-transform duration-300 ease-in-out",
                { "-rotate-90": expanded, "rotate-90": !expanded },
              )}
            />
          </span>
        </button>
      </h3>
      <div
        className={clsx("transition-all duration-300 ease-in-out", {
          "max-h-96 opacity-100": expanded,
          "max-h-0 opacity-0": !expanded,
        })}
      >
        {expanded && children}
      </div>
    </div>
  );
}
