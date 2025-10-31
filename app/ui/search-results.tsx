import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { Product } from "../lib/definitions";

export default function SearchResults({
  query,
  onChange,
}: {
  query: string;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const supabase = createClient();
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    async function fetchtProducts(q: string) {
      const { data } = await supabase
        .from("data")
        .select("id, title, description")
        .ilike("description", `%${q}%`);
      setProducts(data);
      onChange(false);
    }

    if (query) {
      onChange(true);
      const timer = setTimeout(() => {
        fetchtProducts(query);
      }, 300);

      return () => {
        onChange(false);
        clearTimeout(timer);
      };
    }
  }, [query, supabase]);

  if (query && products.length === 0) {
    return (
      <p className="text-center">
        No matches for "<i>{query}</i>"
      </p>
    );
  }

  return (
    <ul className="my-0 flex w-full flex-col gap-y-6 pl-0 lg:overflow-y-auto">
      {products.map((product: Product) => (
        <li key={product.id}>
          <Link
            href={`/product/${product.id}`}
            className="p-0 text-[0.875rem] leading-[1.2142857142857142rem] font-thin"
          >
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
