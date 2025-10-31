import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "../lib/hooks";
import XMarkIcon from "@/public/icons/x-mark.svg";

export default function Modal({
  ref,
  open,
  style,
  onClose,
  children,
}: {
  ref: React.RefObject<null | HTMLInputElement>;
  open: boolean;
  style?: React.CSSProperties;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}) {
  useLockBodyScroll(open);

  return (
    (open || ref.current) &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        className={clsx("", {
          "relative z-10": open,
          "animate-[fade-out_250ms_forwards]": !open,
        })}
      >
        <div
          aria-hidden="true"
          className={clsx(
            "fixed inset-0 bg-black transition-opacity delay-150 duration-[cubic-bezier(0.4,0,0.2,1)]",
            {
              "animate-[backdrop-fade-in_300ms_ease-out] opacity-20": open,
              "animate-[backdrop-fade-out_200ms_ease-in]": !open,
            },
          )}
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center lg:items-start lg:px-4">
            <div
              ref={ref}
              className={clsx(
                "flex w-full text-left text-base leading-normal transition-all delay-150 duration-[cubic-bezier(0.4,0,0.2,1)] lg:mx-8 lg:max-w-4xl lg:px-4",
                {
                  "animate-[scale-up_300ms_ease-out] md:animate-[scale-up-48_300ms_ease-out]":
                    open,
                  "animate-[scale-down_200ms_ease-in] md:animate-[scale-down-48_200ms_ease-in]":
                    !open,
                },
              )}
            >
              <div
                style={style}
                className="relative w-full flex-row items-start overflow-hidden bg-white shadow-[0px_3px_8px_rgba(0,0,0,0.24)] md:flex md:flex-col md:items-center lg:mt-7 lg:rounded-2xl"
              >
                <button
                  type="button"
                  data-autofocus
                  onClick={onClose}
                  className="absolute top-6.5 right-4 z-10 text-[#99a1af] sm:right-6 lg:top-6"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="size-4 text-[rgba(0,0,0,0.4)] hover:text-black" />
                </button>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}
