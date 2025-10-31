"use client";

import { useState } from "react";
import useCartStore from "../stores/cart-store";

export default function NumberInput({
  id,
  defaultValue = 1,
}: {
  id?: number;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="inline-flex rounded-[3.875rem] bg-[#F0F0F0] px-[0.657rem] py-[0.219rem] xl:px-5 xl:py-3.5">
      <div className="flex items-center gap-x-1.5 xl:gap-x-3">
        <button
          type="button"
          tabIndex={-1}
          aria-label="Decrease"
          onClick={() => {
            if (id) {
              updateQuantity("decrement", id);
            }
            setValue((cur) => (cur === 0 ? 0 : cur - 1));
          }}
          className="inline-flex size-6 items-center justify-center gap-x-2 bg-[#F0F0F0] text-sm font-medium text-gray-800 focus:text-[rgba(0,0,0,0.4)] focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        >
          <svg
            className="size-4 shrink-0 hover:text-[rgba(0,0,0,0.4)]"
            viewBox="0 0 16 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8125 1C15.8125 1.24864 15.7137 1.4871 15.5379 1.66291C15.3621 1.83873 15.1236 1.9375 14.875 1.9375H1.125C0.87636 1.9375 0.637903 1.83873 0.462087 1.66291C0.286272 1.4871 0.1875 1.24864 0.1875 1C0.1875 0.75136 0.286272 0.512903 0.462087 0.337087C0.637903 0.161272 0.87636 0.0625 1.125 0.0625H14.875C15.1236 0.0625 15.3621 0.161272 15.5379 0.337087C15.7137 0.512903 15.8125 0.75136 15.8125 1Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <input
          name="quantity"
          type="number"
          value={value}
          aria-roledescription="Number field"
          style={{ MozAppearance: "textfield" }}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-6 border-0 bg-transparent p-0 text-center font-medium text-black focus:ring-0 focus:outline-none xl:w-14.5 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Increase"
          onClick={() => {
            if (id) {
              updateQuantity("increment", id);
            }
            setValue((cur) => cur + 1);
          }}
          className="inline-flex size-6 items-center justify-center gap-x-2 bg-[#F0F0F0] text-sm font-medium text-gray-800 focus:text-[rgba(0,0,0,0.4)] focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        >
          <svg
            className="size-4 shrink-0 hover:text-[rgba(0,0,0,0.4)]"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8125 8C15.8125 8.24864 15.7137 8.4871 15.5379 8.66291C15.3621 8.83873 15.1236 8.9375 14.875 8.9375H8.9375V14.875C8.9375 15.1236 8.83873 15.3621 8.66291 15.5379C8.4871 15.7137 8.24864 15.8125 8 15.8125C7.75136 15.8125 7.5129 15.7137 7.33709 15.5379C7.16127 15.3621 7.0625 15.1236 7.0625 14.875V8.9375H1.125C0.87636 8.9375 0.637903 8.83873 0.462087 8.66291C0.286272 8.4871 0.1875 8.24864 0.1875 8C0.1875 7.75136 0.286272 7.5129 0.462087 7.33709C0.637903 7.16127 0.87636 7.0625 1.125 7.0625H7.0625V1.125C7.0625 0.87636 7.16127 0.637903 7.33709 0.462087C7.5129 0.286272 7.75136 0.1875 8 0.1875C8.24864 0.1875 8.4871 0.286272 8.66291 0.462087C8.83873 0.637903 8.9375 0.87636 8.9375 1.125V7.0625H14.875C15.1236 7.0625 15.3621 7.16127 15.5379 7.33709C15.7137 7.5129 15.8125 7.75136 15.8125 8Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
