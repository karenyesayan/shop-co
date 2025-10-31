"use client";

import Link from "next/link";
import Image from "next/image";
import useStore from "@/app/lib/hooks";
import NumberInput from "../number-input";
import OrderSummary from "./order-summary";
import useCartStore from "@/app/stores/cart-store";
import TrashIcon from "@/public/icons/trash.svg";

export default function ShoppingCart() {
  const items = useStore(useCartStore, (state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="xl:mx-auto xl:max-w-310 xl:pb-20">
      <h2 className="mt-2 px-4 text-[2rem] leading-9.5 font-black text-black not-italic xl:mt-0 xl:px-0 xl:text-[2.5rem] xl:leading-12">
        {items?.length ? "YOUR CART" : "Cart is empty"}
      </h2>
      <div className="xl:mt-6 xl:flex xl:gap-5">
        <div className="flex-1 overflow-y-auto px-4 py-5 xl:max-w-[44.6875rem] xl:p-0">
          <div className="flow-root">
            <ul className="divide-y divide-[rgba(0,0,0,0.1)] rounded-[1.25rem] px-3.5 inset-ring inset-ring-[rgba(0,0,0,0.1)] xl:flex xl:flex-col xl:gap-[7px] xl:px-6">
              {items?.map((product) => (
                <li key={product.id} className="flex py-4 xl:py-5">
                  <div className="relative size-[6.1875rem] shrink-0 overflow-hidden rounded-[0.541rem] border border-gray-200 bg-[#F0EEED] xl:size-31">
                    <Image
                      fill
                      alt={product.title}
                      src={product.image_src}
                      className="object-cover"
                    />
                  </div>

                  <div className="ml-3.5 flex flex-1 flex-col xl:ml-4">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-base leading-5.5 font-bold text-black not-italic xl:text-xl xl:leading-[1.6875rem]">
                          <Link href={`/product/${product.id}`}>
                            {product.title}
                          </Link>
                        </h3>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="relative font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <span className="sr-only">Remove item</span>
                            <TrashIcon className="h-4 w-[0.9375rem] text-[#FF3333] hover:text-[rgba(255,51,51,0.1)] xl:size-6" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-px text-xs leading-4 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mt-0.5 xl:text-sm xl:leading-[1.1875rem]">
                        <b className="text-black">Size:</b> {product.size}
                      </p>
                      <p className="mt-0.5 text-xs leading-4 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mt-1 xl:text-sm xl:leading-[1.1875rem]">
                        <b className="text-black">Color:</b> {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-xl leading-[1.6875rem] font-bold text-black not-italic xl:text-2xl xl:leading-8">
                        ${product.price}
                      </p>
                      <NumberInput
                        id={product.id}
                        defaultValue={product.quantity}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}
