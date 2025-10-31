import Rating from "../rating";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useViewportWidth } from "@/app/lib/hooks";
import { createClient } from "@/app/lib/supabase/client";
import AdjustmentsIcon from "@/public/icons/adjustments.svg";
import CheckCircleIcon from "@/public/icons/check-circle.svg";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";
import { Review } from "@/app/lib/definitions";

export default function Reviews() {
  const params = useParams();
  const supabase = createClient();
  const ITEMS_PER_PAGE = useViewportWidth() < 768 ? 3 : 6;
  const [page, setPage] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from("data")
          .select("reviews")
          .eq("id", params.id)
          .single();
        if (error) {
          throw error;
        }

        setPage(ITEMS_PER_PAGE);
        setReviews(data?.reviews);
        setIsLoading(false);
      } catch (error) {
        console.log("Error downloading data: ", error);
      }
    }
    fetchReviews();
  }, [supabase, params, ITEMS_PER_PAGE]);

  return (
    <div className="mt-5 w-full xl:mt-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5 xl:gap-2">
          <h4 className="text-xl leading-[1.6875rem] font-bold text-black not-italic xl:text-2xl xl:leading-8">
            All Reviews
          </h4>
          <span className="text-sm leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mt-[0.4375rem] xl:text-base xl:leading-5.5">
            ({reviews.length})
          </span>
        </div>
        <div className="flex items-center gap-2 xl:gap-2.5">
          <button
            type="button"
            className="group/adjustments rounded-full bg-[#F0F0F0] p-2.5 transition-colors duration-200 hover:bg-black xl:p-3"
          >
            <span className="sr-only">Adjustments</span>
            <AdjustmentsIcon className="size-5 group-hover/adjustments:text-white xl:size-6" />
          </button>
          <div className="relative hidden xl:inline-block">
            <select className="cursor-pointer appearance-none rounded-[3.875rem] bg-[#F0F0F0] px-5 py-[0.8125rem] pr-[3.5625rem] text-base leading-5.5 font-medium text-black focus:outline-none">
              <option>Latest</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-black" />
          </div>
          <button
            type="button"
            className="rounded-[3.875rem] bg-black px-4 py-3 text-xs leading-4 font-medium text-white not-italic hover:bg-white hover:text-black hover:ring hover:ring-[rgba(0,0,0,0.1)] xl:px-[1.85rem] xl:py-[0.813rem] xl:text-base xl:leading-5.5"
          >
            Write a Review
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-y-4 lg:grid lg:grid-cols-2 lg:gap-5 xl:mt-6">
        {reviews.slice(0, page).map((review: Review) => (
          <Card {...review} key={review.id} />
        ))}
      </div>
      {isLoading && (
        <div className="relative h-0.5 w-full overflow-hidden bg-gradient-to-r from-transparent via-gray-100 to-transparent after:absolute after:h-full after:w-1/2 after:-translate-x-2/3 after:translate-y-0 after:animate-[slide_1s_infinite] after:bg-gradient-to-r after:from-transparent after:via-gray-200 after:to-transparent after:content-['']" />
      )}
      {page !== reviews.length && !isLoading && (
        <button
          onClick={() => setPage((page) => page + page)}
          className="mt-5 flex justify-self-center rounded-[3.875rem] px-9 py-3.5 text-sm leading-[1.1875rem] font-medium text-black not-italic inset-ring inset-ring-[rgba(0,0,0,0.1)] hover:bg-black hover:text-white xl:mt-[2.27625rem] xl:px-[2.8265rem] xl:py-4 xl:text-base xl:leading-5.5"
        >
          Load More Reviews
        </button>
      )}
    </div>
  );
}

function Card({ date, name, rating, comment }: Review) {
  return (
    <figure className="flex flex-col-reverse items-start justify-center rounded-[1.25rem] p-6 text-[4rem] font-semibold shadow-[inset_0_0_0_0.0625rem_rgba(0,0,0,0.1)] select-none xl:px-8 xl:py-7">
      <p className="sr-only">{rating} out of 5 stars</p>
      <div className="order-1">
        <Rating value={rating} size="md" color={"#FFC633"} />
      </div>
      <blockquote className="mt-2 xl:mt-3">
        <p className="text-sm leading-5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-base xl:leading-5.5">
          {comment}
        </p>
        <div className="mt-4 flex text-sm leading-5.5 font-medium text-[rgba(0,0,0,0.6)] not-italic xl:mt-6 xl:text-base xl:leading-5.5">
          <p>Posted on</p>&nbsp;
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </blockquote>
      <figcaption className="mt-3 xl:mt-[0.9375rem]">
        <div className="flex items-center gap-1 text-base leading-5.5 font-bold text-black not-italic xl:text-xl xl:leading-6">
          {name}
          <CheckCircleIcon />
        </div>
      </figcaption>
    </figure>
  );
}
