import Card from "../card";
import { createClient } from "@/app/lib/supabase/server";

export default async function Recommendations() {
  // await new Promise((res) => setTimeout(res, 3000));
  const supabase = await createClient();

  const { data } = await supabase
    .from("data")
    .select("id, title, price, discounted_price, images, rating, thumbnail")
    .in(
      "id",
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 21) + 1),
    );

  return (
    <section
      id="recommendations"
      className="flex flex-col items-center px-4 py-12.5 xl:mx-auto xl:max-w-310 xl:px-0 xl:pt-16 xl:pb-19.5"
    >
      <h2 className="text-center text-[2rem] leading-9 font-black text-balance text-black uppercase not-italic xl:text-5xl xl:leading-14.5">
        You might also like
      </h2>
      <ul
        className="mt-10 flex w-screen gap-x-3.5 gap-y-15 overflow-x-auto pl-4 min-[51.25rem]:w-[calc(100vw_-_16px)] min-[57rem]:gap-x-5 lg:justify-center lg:pl-0 xl:mt-[3.4375rem] xl:w-full"
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
    </section>
  );
}
