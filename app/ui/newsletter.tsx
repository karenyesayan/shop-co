"use client";

import { useState } from "react";
import EnvelopeIcon from "@/public/icons/envelope.svg";
import CheckCircleIcon from "@/public/icons/check-circle.svg";

export default function Newsletter() {
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSent(true);
  }

  return (
    <div className="relative mx-4 -mb-39.5 rounded-[1.25rem] bg-black lg:-mb-22.5 lg:max-w-310 xl:mx-auto">
      <div className="px-6 pt-8 pb-7 lg:flex lg:items-center lg:justify-between xl:px-16 xl:py-9">
        <h2 className="text-left text-[2rem] leading-[2.1875rem] font-black text-white not-italic lg:max-w-[34.4375rem] xl:text-[2.5rem] xl:leading-[2.8125rem]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        {isSent ? (
          <p
            data-success-message="true"
            className="flex items-center gap-1.5 p-[3.188rem] pl-0 text-base leading-6.5 font-normal text-[#8A8A8A] not-italic xl:p-[2.5625rem] xl:pl-0"
          >
            <CheckCircleIcon />
            Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex grow flex-col gap-3 lg:mt-0 lg:max-w-[21.8125rem] xl:gap-3.5"
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute top-1/2 left-4 -translate-y-2/4" />
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                autoComplete="email"
                className="w-full min-w-0 flex-auto rounded-[3.875rem] bg-white px-4 py-[0.813rem] pl-12 text-sm leading-4 font-normal text-[rgba(0,0,0,0.4)] not-italic placeholder:text-[rgba(0,0,0,0.4)] hover:shadow-[0px_163px_80px_rgba(0,0,0,0.04),0px_105.648px_46.8519px_rgba(0,0,0,0.0303704),0px_62.7852px_25.4815px_rgba(0,0,0,0.0242963),0px_32.6px_13px_rgba(0,0,0,0.02),0px_13.2815px_6.51852px_rgba(0,0,0,0.0157037),0px_3.01852px_3.14815px_rgba(0,0,0,0.00962963)] xl:text-base xl:leading-5.5"
              />
            </div>
            <button
              type="submit"
              className="flex-none rounded-[3.875rem] bg-white px-4 py-[0.719rem] text-sm leading-[1.1875rem] font-medium text-black not-italic hover:bg-[rgb(26,26,26)] hover:text-[#888888] hover:shadow-[0px_20px_35px_rgba(0,0,0,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fafafa] xl:w-full xl:py-3 xl:text-base xl:leading-5.5 2xl:self-center"
            >
              Subscribe to Newsletter
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
