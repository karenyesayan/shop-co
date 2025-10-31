import { headers } from "next/headers";
import ProductList from "../ui/shop/product-list";
import { createClient } from "@/app/lib/supabase/client";
import CategoryFilters from "../ui/shop/category-filters";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { tag } = await params;
  const filters = await searchParams;
  const supabase = await createClient();
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  const regex =
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
  let isMobile = Boolean(userAgent?.match(regex));
  const ITEMS_PER_PAGE = isMobile ? 6 : 9;

  let query = supabase.from("data").select("discounted_price, colors, sizes", {
    count: "exact",
  });

  if (filters.size) {
    query = query.overlaps("sizes", filters.size.split(","));
  }
  if (filters.color) {
    query = query.in("colors->0->>name", filters.color.split(","));
  }
  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    query = query.gte("discounted_price", min).lte("discounted_price", max);
  }

  const { count, error } = await query;

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }

  return (
    <div className="mt-[3.0625rem] xl:mt-17.5">
      <CategoryFilters
        totalItems={count}
        currentPage={filters.page}
        itemsPerPage={ITEMS_PER_PAGE}
      >
        <ProductList {...{ ...filters, tag, ITEMS_PER_PAGE }} />
      </CategoryFilters>
    </div>
  );
}
