import { Suspense } from "react";
import Rating from "@/app/ui/rating";
import { notFound } from "next/navigation";
import { getPercent } from "@/app/lib/utils";
import Gallery from "@/app/ui/product/gallery";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import AddToCartForm from "@/app/ui/product/form";
import TabContainer from "@/app/ui/product/container";
import { createClient } from "@/app/lib/supabase/server";
import { RecommendationsSkeleton } from "@/app/ui/skeletons";
import Recommendations from "@/app/ui/product/recommendations";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("data")
    .select("id, title, description")
    .eq("id", id)
    .single();

  return {
    title: product?.title,
    description: product?.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("data")
    .select(
      "id, title, price, discounted_price, description, category, type, colors, images, rating, thumbnail, sizes",
    )
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          {
            label: product?.category.replace(/^./, (char: string) =>
              char.toUpperCase(),
            ),
            href: "/shop/" + product?.category,
          },
          {
            label: product?.type.replace(/^./, (char: string) =>
              char.toUpperCase(),
            ),
            href: "/shop/" + product?.type,
            active: true,
          },
        ]}
      />
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-5 px-4 pt-5 pb-12.5 sm:grid-cols-12 lg:gap-x-8 xl:mx-auto xl:max-w-310 xl:gap-x-10 xl:px-0 xl:pt-3 xl:pb-14">
        <Gallery slides={product?.images} />
        <div className="sm:col-span-8 md:col-span-7 xl:col-span-6">
          <h2 className="text-2xl leading-7 font-black text-black not-italic sm:pr-12 xl:text-[2.5rem] xl:leading-12">
            {product?.title.toUpperCase()}
          </h2>
          <section
            aria-labelledby="information-heading"
            className="mt-3 border-b border-solid border-[rgba(0,0,0,0.1)] xl:mt-3.5"
          >
            <h3 id="information-heading" className="sr-only">
              Product information
            </h3>
            <div>
              <h4 className="sr-only">Rating</h4>
              <div className="flex items-center">
                <Rating value={product?.rating} size="lg" color="#FFC633" />
                <p className="sr-only">{product?.rating} out of 5 stars</p>
                <span className="ml-4 text-sm leading-[1.1875rem] font-normal text-black not-italic xl:text-base xl:leading-5.5">
                  {Number.parseFloat(product?.rating).toFixed(1)}/5
                </span>
              </div>
            </div>
            <div className="mt-3 flex gap-2.5 xl:mt-3.5 xl:items-center xl:gap-3">
              <span className="text-2xl leading-8 font-bold text-black not-italic xl:text-[2rem] xl:leading-[2.6875rem]">
                ${product?.discounted_price}
              </span>
              {product?.price !== product?.discounted_price && (
                <>
                  <span className="text-2xl leading-8 font-bold text-[rgba(0,0,0,0.3)] not-italic line-through xl:text-[2rem] xl:leading-[2.6875rem]">
                    ${product?.price}
                  </span>
                  <span className="rounded-[3.875rem] bg-[rgba(255,51,51,0.1)] px-3 py-1.5 text-sm leading-[1.1875rem] font-medium text-[#FF3333] not-italic xl:px-3.5 xl:text-base xl:leading-5.5">
                    -{getPercent(product?.price, product?.discounted_price)}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-5 pb-6 text-sm leading-5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-base xl:leading-5.5">
              {product?.description}
            </p>
          </section>
          <section aria-labelledby="options-heading" className="mt-6">
            <h3 id="options-heading" className="sr-only">
              Product options
            </h3>
            <AddToCartForm {...product} />
          </section>
        </div>
      </div>
      <TabContainer />
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />
      </Suspense>
    </div>
  );
}
