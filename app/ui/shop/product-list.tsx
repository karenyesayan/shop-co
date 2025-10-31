import Card from "../card";
import { createClient } from "@/app/lib/supabase/server";

type PageProps = {
  tag?: string;
  page?: string;
  sort?: string;
  size?: string;
  color?: string;
  price?: string;
  ITEMS_PER_PAGE: number;
};

interface SortOption {
  [key: string]: any;
}

export default async function ProductList({
  tag,
  page: currentPage = "1",
  sort: sortBy = "",
  size: filterBySize = "",
  color: filterByColor = "",
  price: filterByPrice = "",
  ITEMS_PER_PAGE: pageSize,
}: PageProps) {
  const supabase = await createClient();
  const sortOption = sortOptions[sortBy];
  const offset = (Number(currentPage) - 1) * pageSize;
  const [min, max] = filterByPrice.split("-").map(Number);

  let query = supabase
    .from("data")
    .select(
      "id, title, price, discounted_price, category, type, colors, images, rating, thumbnail, sizes",
      { count: "exact" },
    );

  if (tag) {
    query = query.or(`category.eq.${tag},type.eq.${tag}`);
  }
  if (sortBy) {
    query = query.order(sortOption.field, {
      ascending: sortOption.order === "asc",
    });
  }
  if (filterBySize) {
    query = query.overlaps("sizes", filterBySize.split(","));
  }
  if (filterByColor) {
    query = query.in("colors->0->>name", filterByColor.split(","));
  }
  if (filterByPrice) {
    query = query.gte("discounted_price", min).lte("discounted_price", max);
  }

  query = query.range(offset, offset + pageSize - 1);
  const { data: products, error } = await query;

  if (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
  if (!products.length) {
    return <p>Nothing found</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-3.5 gap-y-6 border-b border-solid border-[rgba(0,0,0,0.1)] pt-[1.8125rem] pb-6 group-has-[[data-pending]]:animate-pulse min-[33.75rem]:grid-cols-3 sm:gap-x-5 lg:grid-cols-2 xl:grid-cols-3 xl:py-9 xl:pt-4 xl:pb-8">
      {products.map((product) => (
        <li key={product.id}>
          <Card {...product} size="sm" />
        </li>
      ))}
    </ul>
  );
}

const sortOptions: SortOption = {
  "most-popular": { field: "stock", order: "asc" },
  "best-rating": { field: "rating", order: "desc" },
  "price-asc": { field: "discounted_price", order: "asc" },
  "price-desc": { field: "discounted_price", order: "desc" },
};
