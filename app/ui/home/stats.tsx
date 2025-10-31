import AnimatedCountUp from "./countup";

export default function Stats() {
  return (
    <div className="z-[9] md:pt-4 md:pb-29 xl:ml-[-1.8251875rem]">
      <div className="mx-auto max-w-7xl px-6 lg:mx-0 lg:max-w-149 lg:px-0">
        <div className="grid grid-cols-2 text-left lg:grid-cols-3">
          <div className="mx-auto flex w-full flex-col items-center not-italic shadow-[0.5px_0_0_0_rgba(0,0,0,0.1)]">
            <dl className="mx-auto flex max-w-xs flex-col not-italic">
              <dt className="-mt-1.5 text-xs leading-5.5 font-normal text-[rgba(0,0,0,0.6)] sm:-mt-0.5 lg:text-base">
                International Brands
              </dt>
              <dd className="order-first text-2xl leading-8 font-bold tracking-tight text-black sm:text-[2.5rem] sm:leading-13.5">
                <AnimatedCountUp>200</AnimatedCountUp>
              </dd>
            </dl>
          </div>
          <div className="mx-auto flex w-full flex-col items-center not-italic shadow-[-0.5px_0_0_0_rgba(0,0,0,0.1)]">
            <dl className="mx-auto flex max-w-xs flex-col not-italic">
              <dt className="-mt-1.5 text-xs leading-5.5 font-normal text-[rgba(0,0,0,0.6)] sm:-mt-0.5 lg:text-base">
                High-Quality Products
              </dt>
              <dd className="order-first text-2xl leading-8 font-bold tracking-tight text-black sm:text-[2.5rem] sm:leading-13.5">
                <AnimatedCountUp>2000</AnimatedCountUp>
              </dd>
            </dl>
          </div>
          <div className="col-span-2 mx-auto flex w-full flex-col items-center pt-3.5 not-italic lg:col-span-1 lg:pt-0 lg:shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]">
            <dl className="mx-auto flex max-w-xs flex-col not-italic">
              <dt className="-mt-1.5 w-26 text-xs leading-5.5 font-normal text-[rgba(0,0,0,0.6)] sm:-mt-0.5 md:w-43 lg:text-base">
                Happy Customers
              </dt>
              <dd className="order-first text-2xl leading-8 font-bold tracking-tight text-black sm:text-[2.5rem] sm:leading-13.5">
                <AnimatedCountUp>30000</AnimatedCountUp>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
