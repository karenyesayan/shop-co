"use client";

import { clsx } from "clsx";
import { redirect } from "next/navigation";
import CheckIcon from "@/public/icons/check.svg";
import NumberInput from "@/app/ui/number-input";
import useCartStore from "@/app/stores/cart-store";
import { Product, Color } from "@/app/lib/definitions";

export default function AddToCartForm({
  id,
  title,
  discounted_price,
  colors,
  sizes,
  thumbnail,
}: Product) {
  const addToCart = useCartStore((state) => state.addToCart);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    redirect("/product/" + e.target.id);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    addToCart({
      id: id,
      title: title,
      size: String(formJson.size),
      color: String(formJson.color),
      price: discounted_price,
      image_src: thumbnail,
      quantity: Number(formJson.quantity),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        aria-label="Choose a color"
        className="border-b border-solid border-[rgba(0,0,0,0.1)]"
      >
        <legend className="text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-base xl:leading-5.5">
          Select Colors
        </legend>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 pb-6 xl:gap-x-4">
          {colors?.map((color: Color) => (
            <div
              key={color.id}
              className="relative flex rounded-full outline -outline-offset-1 outline-black/10"
            >
              <input
                id={color.id}
                defaultValue={color.name}
                defaultChecked={color === colors[0]}
                name="color"
                type="radio"
                aria-label={color.name}
                onChange={handleChange}
                className={clsx(
                  color.classes,
                  `peer size-[2.4375rem] appearance-none rounded-full forced-color-adjust-none focus-visible:outline-3 focus-visible:outline-offset-3 xl:size-[2.3125rem]`,
                )}
              />
              <CheckIcon
                className={clsx(
                  "pointer-events-none absolute top-2/4 left-[0.66125rem] -translate-y-2/4 opacity-0 peer-checked:opacity-100",
                  {
                    "text-black": color.name === "White",
                    "text-white": color.name !== "White",
                  },
                )}
              />
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset
        aria-label="Choose a size"
        className="mt-6 border-b border-solid border-[rgba(0,0,0,0.1)]"
      >
        <legend className="text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-base xl:leading-5.5">
          Choose Size
        </legend>
        <div className="mt-4 flex flex-wrap gap-2 pb-6 xl:gap-3">
          {sizes?.map((size: string) => (
            <label
              key={size}
              aria-label={size}
              className="group/size relative flex items-center justify-center rounded-[3.875rem] bg-[#F0F0F0] px-5 py-2.5 has-checked:bg-black has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25 xl:px-[1.505625rem] xl:py-3"
            >
              <input
                defaultValue={size}
                defaultChecked={size === sizes[2]}
                name="size"
                type="radio"
                className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
              />
              <span className="text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic group-has-checked/size:font-medium group-has-checked/size:text-white xl:text-base xl:leading-5.5">
                {size}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-6 flex h-11 gap-3 xl:h-auto xl:items-center xl:gap-5">
        <NumberInput />
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-[3.875rem] bg-black px-13.5 py-4 text-sm leading-[1.1875rem] font-medium text-white not-italic hover:bg-white hover:text-black hover:ring hover:ring-[rgba(0,0,0,0.1)] focus:outline-hidden xl:py-[0.9375rem] xl:text-base xl:leading-5.5"
        >
          Add to Cart
        </button>
      </div>
    </form>
  );
}
