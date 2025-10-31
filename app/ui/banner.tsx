import Link from "next/link";
import { useState } from "react";
import XMarkIcon from "@/public/icons/x-mark.svg";

export default function Banner() {
  const [active, setActive] = useState(true);

  function handleDismiss() {
    setActive(false);
  }

  if (!active) {
    return null;
  }

  return (
    <nav className="relative isolate flex w-full items-center justify-center gap-x-6 self-start overflow-hidden bg-black py-[0.4375rem] sm:px-3.5 xl:py-[0.5625rem]">
      <div className="xl:relative xl:mx-auto xl:w-full xl:max-w-310">
        <div className="flex flex-wrap items-center gap-x-0.5 gap-y-2 xl:justify-center">
          <p className="text-xs leading-4 font-normal text-white not-italic xl:text-sm xl:leading-[1.1875rem]">
            Sign up and get 20% off to your first order.
          </p>
          <Link
            href="/auth/sign-up"
            className="flex-none text-sm font-medium text-white underline shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Sign Up Now
          </Link>
        </div>
        <div className="group/dismiss absolute top-[-0.5625rem] -right-3 hidden justify-end xl:flex">
          <button
            type="button"
            onClick={handleDismiss}
            className="p-3 group-hover/dismiss:cursor-pointer focus-visible:-outline-offset-4"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="size-3.5 text-white group-hover/dismiss:text-[rgba(255,255,255,0.8)]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
