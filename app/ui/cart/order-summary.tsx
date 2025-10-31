import Link from "next/link";
import useStore from "@/app/lib/hooks";
import useCartStore from "@/app/stores/cart-store";
import TagIcon from "@/public/icons/tag.svg";

export default function OrderSummary() {
  const deliveryFee = 15;
  const discountPercent = 20;
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice) || 0;
  const discount = Math.round(totalPrice * (discountPercent / 100));

  return (
    <div className="px-4 pb-12.5 xl:w-full xl:max-w-[31.5625rem] xl:px-0">
      <div className="rounded-[1.25rem] p-5 inset-ring inset-ring-[rgba(0,0,0,0.1)] xl:px-6">
        <div>
          <div className="flex flex-row">
            <h2 className="mb-2 flex-grow text-xl leading-[1.6875rem] font-bold text-black not-italic xl:mb-0 xl:text-2xl xl:leading-8">
              Order Summary
            </h2>
          </div>
          <div className="flex flex-col pt-2 xl:pt-6">
            <div className="flex flex-row">
              <span className="flex-1 pb-5 text-base leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-xl xl:leading-[1.6875rem]">
                Subtotal
              </span>
              <span className="text-base leading-5.5 font-bold text-black not-italic xl:text-xl xl:leading-[1.6875rem]">
                {totalPrice ? `$${totalPrice}` : "-"}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="flex-1 pb-5 text-base leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-xl xl:leading-[1.6875rem]">
                Discount (-{discountPercent}%)
              </span>
              <span className="text-base leading-5.5 font-bold text-[#FF3333] not-italic xl:text-xl xl:leading-[1.6875rem]">
                {discount ? `-$${discount}` : "-"}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="flex-1 pb-5 text-base leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-xl xl:leading-[1.6875rem]">
                Delivery Fee
              </span>
              <span className="text-base leading-5.5 font-bold text-black not-italic xl:text-xl xl:leading-[1.6875rem]">
                {totalPrice ? `$${deliveryFee}` : "-"}
              </span>
            </div>
            <div className="flex flex-row border-t border-[rgba(0,0,0,0.1)] pt-5 pb-4 xl:pb-6">
              <span className="flex-1 text-base leading-5.5 font-normal text-black not-italic xl:text-xl xl:leading-[1.6875rem]">
                Total
              </span>
              <span className="text-xl leading-[1.6875rem] font-bold not-italic xl:text-2xl xl:leading-8">
                {totalPrice ? `$${totalPrice - discount + deliveryFee}` : "-"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <form method="post" action="/checkout/details">
            <fieldset>
              <div className="flex justify-between gap-3">
                <div className="flex flex-grow flex-col gap-2 align-middle">
                  <div className="relative flex flex-col gap-2.5 rounded-[3.875rem]">
                    <TagIcon className="absolute top-1/2 left-4.5 size-4.5 -translate-y-2/4 xl:size-6" />
                    <input
                      defaultValue=""
                      name="code"
                      placeholder="Add promo code"
                      className="h-12 w-full gap-2.5 rounded-[3.875rem] bg-[#F0F0F0] px-4 py-3 pl-11.5 text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.4)] not-italic focus:border-black focus:text-black focus:shadow-xs focus:ring-2 focus:outline-none xl:pl-13 xl:text-base xl:leading-5.5"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="hover:border-primary/50 h-12 cursor-pointer rounded-[3.875rem] bg-black px-[1.452rem] py-3 text-center align-middle text-sm leading-[1.1875rem] font-medium text-white uppercase not-italic hover:bg-white hover:text-black hover:ring hover:ring-[rgba(0,0,0,0.1)] disabled:pointer-events-none disabled:cursor-default disabled:border-gray-200 disabled:text-gray-500 xl:px-[2.234375rem] xl:text-base xl:leading-5.5"
                >
                  Apply
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div className="mt-4 xl:mt-6">
          <Link
            href="#"
            className="flex items-center justify-center gap-3 rounded-[3.875rem] bg-black px-13.5 py-[1.094rem] text-sm leading-[1.1875rem] font-medium text-white not-italic hover:bg-white hover:text-black hover:shadow-xs hover:ring hover:ring-[rgba(0,0,0,0.1)] xl:py-[1.1875rem] xl:text-base xl:leading-5.5"
          >
            Go to Checkout
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
