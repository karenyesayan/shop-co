import clsx from "clsx";
import Link from "next/link";
import Search from "./search";
import useCartStore from "../stores/cart-store";
import UserCircleIcon from "@/public/icons/user-circle.svg";
import ShoppingCartIcon from "@/public/icons/shopping-cart.svg";

export default function ToolBar() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <div className="ml-auto flex items-center lg:ml-0">
      <Search />
      <div className="ml-3 flow-root min-[53.3125rem]:ml-6.5 xl:ml-10">
        <Link href="/cart" className="group/cart relative flex items-center">
          <span
            className={clsx(
              "absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-black text-[0.5625rem] text-white group-hover/cart:bg-[rgba(0,0,0,0.4)]",
              {
                "sr-only": !totalItems,
              },
            )}
          >
            {totalItems || "Items in cart, view bag"}
          </span>
          <ShoppingCartIcon className="size-6 shrink-0 text-black group-hover/cart:text-[rgba(0,0,0,0.4)]" />
        </Link>
      </div>
      <div className="ml-3 min-[53.3125rem]:ml-7.5 xl:ml-3.5">
        <Link href="/account" className="group/user flex items-center">
          <span className="sr-only">Open profile</span>
          <UserCircleIcon className="size-6 shrink-0 text-black group-hover/user:text-[rgba(0,0,0,0.4)]" />
        </Link>
      </div>
    </div>
  );
}
