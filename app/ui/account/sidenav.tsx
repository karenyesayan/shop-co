import Link from "next/link";
import CubeIcon from "@/public/icons/cube.svg";
import UserIcon from "@/public/icons/user.svg";
import HomeIcon from "@/public/icons/home.svg";
import ChatIcon from "@/public/icons/chat.svg";
import { createClient } from "@/app/lib/supabase/server";
import ShoppingBagIcon from "@/public/icons/shopping-bag.svg";
import ChevronRightIcon from "@/public/icons/chevron-right.svg";
import { LogoutButton } from "../buttons";

export default async function SideNav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-4 md:w-80 2xl:gap-8">
      <p className="m-0 text-2xl leading-none font-semibold">{user?.email}</p>
      <div>
        <Link
          className="md:border-primary flex w-full cursor-pointer flex-row items-center gap-3 rounded border-b border-solid border-[rgba(0,0,0,0.1)] py-4 text-[rgba(0,0,0,0.6)] md:-mt-px md:border-y-0 md:border-l-4 md:bg-gray-100 md:pt-[1.0625rem] md:font-semibold md:hover:font-semibold 2xl:px-4"
          href="/account/order-history"
        >
          <CubeIcon className="size-6" />
          <p className="text-base">Order History</p>
          <div className="ml-auto opacity-60 md:hidden">
            <ChevronRightIcon className="size-6" />
          </div>
        </Link>
        <Link
          className="flex w-full cursor-pointer flex-row items-center gap-3 rounded border-b border-solid border-[rgba(0,0,0,0.1)] py-4 text-[rgba(0,0,0,0.6)] md:hover:font-semibold 2xl:px-4"
          href="/account/subscriptions"
        >
          <ShoppingBagIcon className="size-6" />
          <p className="text-base">My Subscriptions</p>
          <div className="ml-auto opacity-60 md:hidden">
            <ChevronRightIcon className="size-6" />
          </div>
        </Link>
        <Link
          className="flex w-full cursor-pointer flex-row items-center gap-3 rounded border-b border-solid border-[rgba(0,0,0,0.1)] py-4 text-[rgba(0,0,0,0.6)] md:hover:font-semibold 2xl:px-4"
          href="/account/my-details"
        >
          <UserIcon className="size-6" />
          <p className="text-base">My Details</p>
          <div className="ml-auto opacity-60 md:hidden">
            <ChevronRightIcon className="size-6" />
          </div>
        </Link>
        <Link
          className="flex w-full cursor-pointer flex-row items-center gap-3 rounded border-b border-solid border-[rgba(0,0,0,0.1)] py-4 text-[rgba(0,0,0,0.6)] md:hover:font-semibold 2xl:px-4"
          href="/account/addresses"
        >
          <HomeIcon className="size-6" />
          <p className="text-base">Addresses</p>
          <div className="ml-auto opacity-60 md:hidden">
            <ChevronRightIcon className="size-6" />
          </div>
        </Link>
        <Link
          className="flex w-full cursor-pointer flex-row items-center gap-3 rounded border-b border-solid border-[rgba(0,0,0,0.1)] py-4 text-[rgba(0,0,0,0.6)] md:hover:font-semibold 2xl:px-4"
          href="/account/contact-preferences"
        >
          <ChatIcon className="size-6" />
          <p className="text-base">Contact</p>
          <div className="ml-auto opacity-60 md:hidden">
            <ChevronRightIcon className="size-6" />
          </div>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
