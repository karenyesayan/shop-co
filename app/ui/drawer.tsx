"use client";

import { clsx } from "clsx";
import { useRef } from "react";
import XMarkIcon from "../../public/icons/x-mark.svg";
import { useClickOutside, useLockBodyScroll } from "../lib/hooks";

export default function Drawer({
  placement,
  isOpen,
  onClose,
  children,
}: {
  placement: "left" | "right";
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const drawerRef = useRef(null);

  useClickOutside(drawerRef, onClose);
  useLockBodyScroll(isOpen);

  return (
    <div className="absolute">
      <div
        className={clsx(
          "fixed inset-0 !z-[99] h-screen bg-[rgba(120,120,120,0.41)] transition-opacity",
          {
            "visible opacity-75 duration-200": isOpen,
            "invisible opacity-0 duration-100": !isOpen,
          },
        )}
      />
      <div className="fixed top-0 right-0 left-0 !z-[100] z-[110] flex justify-center">
        <div className="relative z-40 w-full">
          <div
            className={clsx(
              "absolute top-0 w-full max-w-[375px] transition-all",
              { "!max-w-[375px]": placement === "left" },
              { "left-full !max-w-[741px]": placement === "right" },
            )}
            style={{
              height: "100vh",
              transform: isOpen
                ? placement === "left"
                  ? "translateX(0px)"
                  : "translateX(-100%)"
                : placement === "left"
                  ? "translateX(-100%)"
                  : "translateX(0px)",
              transitionDuration: isOpen ? "200ms" : "100ms",
              transitionTimingFunction: isOpen ? "ease-out" : "ease-in",
              visibility: isOpen ? "visible" : "hidden",
            }}
          >
            <div className="pointer-events-none absolute top-0 bottom-0 -left-32 inline-block w-32 rotate-180" />
            <div
              ref={drawerRef}
              className="relative h-full w-full overflow-hidden overflow-y-auto border-t border-r border-gray-200 bg-white p-5 md:border-t-0 md:border-r-0"
            >
              {children}
              <button
                onClick={() => onClose(false)}
                className="group/drawer absolute top-8 right-5 cursor-pointer text-center align-middle leading-4 font-semibold text-black disabled:pointer-events-none disabled:cursor-default xl:top-[2.0625rem] xl:right-[2.4375rem]"
              >
                <XMarkIcon className="size-5 group-hover/drawer:text-[rgba(0,0,0,0.4)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
