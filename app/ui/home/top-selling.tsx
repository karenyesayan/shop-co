import Card from "../card";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

export default async function TopSelling() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("data")
    .select("id, title, price, discounted_price, images, rating, thumbnail")
    .lte("stock", 10)
    .order("id", { ascending: true })
    .limit(4);

  return (
    <section
      id="top-selling"
      className="flex flex-col items-center px-4 pt-[2.4375rem] xl:mx-auto xl:max-w-310 xl:px-0 xl:pt-16"
    >
      <h2 className="text-[2rem] leading-9.5 font-black text-black uppercase not-italic lg:text-5xl lg:leading-14.5">
        Top Selling
      </h2>
      <ul
        className="mt-8 flex w-screen gap-x-4 gap-y-15 overflow-x-auto pl-4 min-[51.25rem]:w-[calc(100vw_-_16px)] min-[57rem]:gap-x-5 lg:justify-center xl:mt-[3.4375rem] xl:w-full xl:pl-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data?.map((product) => (
          <li key={product.id}>
            <Card {...product} size="md" />
          </li>
        ))}
      </ul>
      <Link
        href="/shop"
        className="mt-6 box-border w-full rounded-[3.875rem] border border-solid border-[rgba(0,0,0,0.1)] px-13.5 py-[0.782rem] text-center text-sm leading-[1.1875rem] font-medium text-black not-italic hover:border-black hover:bg-black hover:text-white hover:shadow-[0px_20px_35px_rgba(0,0,0,0.15)] lg:max-w-54.5 xl:mt-9 xl:py-3.5 xl:text-base xl:leading-5.5"
      >
        View All
      </Link>
    </section>
  );
}
