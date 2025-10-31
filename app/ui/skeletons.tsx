// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div className={`${shimmer} relative flex h-full flex-col bg-white`}>
      <div className="h-50 w-49.5 overflow-hidden bg-gray-200 min-[23.4375rem]:rounded-[0.8125rem] min-[33.75rem]:w-42 md:h-50 md:w-49.5 md:rounded-[1.25rem] lg:h-74.5 lg:w-[18.4375rem]" />
      <div className="mt-2.5 xl:mt-4">
        <div className="flex items-start">
          <div className="min-w-0">
            <div className="h-5.5 w-38.5 rounded bg-gray-200 xl:h-[1.6875rem] xl:w-50" />
            <div className="mt-1 flex items-center gap-[11px] xl:mt-2 xl:gap-[13px]">
              <div className="h-4 w-[5.938rem] rounded bg-gray-200 xl:h-4.5 xl:w-[7.063rem]" />
              <div className="h-4 w-7.5 rounded bg-gray-200 xl:h-[1.1875rem] xl:w-8.5" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-[5px] pt-0 xl:mt-2.5 xl:gap-2.5">
        <div className="h-[1.6875rem] w-11.5 rounded-[3.875rem] bg-gray-200 xl:h-8 xl:w-14" />
        <div className="h-[1.6875rem] w-11.5 rounded-[3.875rem] bg-gray-200 xl:h-8 xl:w-14" />
        <div className="flex h-5 w-10.5 items-center rounded-[3.875rem] bg-gray-200 xl:ml-0.5 xl:h-7 xl:w-14.5" />
      </div>
    </div>
  );
}

export function NewArrivalsSkeleton() {
  return (
    <section className="relative flex flex-col items-center px-4 pt-12.5 xl:mx-auto xl:max-w-310 xl:px-0 xl:pt-18">
      <h2 className="text-[2rem] leading-9.5 font-black text-black uppercase not-italic lg:text-5xl lg:leading-14.5">
        New Arrivals
      </h2>
      <ul
        className="mt-8 flex w-screen gap-x-4 gap-y-[60px] overflow-x-auto pl-4 min-[51.25rem]:w-[calc(100vw_-_16px)] min-[57rem]:gap-x-5 lg:justify-center xl:mt-[3.4375rem] xl:w-full xl:pl-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </ul>
      <div className="mt-6 h-11.5 w-full rounded-[3.875rem] bg-gray-100 px-13.5 py-[0.782rem] lg:h-13 lg:max-w-54.5 xl:mt-9 xl:py-3.5" />
      <hr className="mt-[2.4375rem] h-px w-full border-0 bg-gray-100 xl:mt-16" />
    </section>
  );
}

export function TopSellingSkeleton() {
  return (
    <section className="flex flex-col items-center px-4 pt-[2.4375rem] xl:mx-auto xl:max-w-310 xl:px-0 xl:pt-16">
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
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </ul>
      <div className="mt-6 h-11.5 w-full rounded-[3.875rem] bg-gray-100 px-13.5 py-[0.782rem] lg:h-13 lg:max-w-54.5 xl:mt-9 xl:py-3.5" />
    </section>
  );
}

export function RecommendationsSkeleton() {
  return (
    <section className="flex flex-col items-center px-4 py-12.5 xl:mx-auto xl:max-w-310 xl:px-0 xl:pt-16 xl:pb-19.5">
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
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </ul>
    </section>
  );
}
