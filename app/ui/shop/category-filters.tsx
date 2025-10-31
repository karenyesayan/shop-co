"use client";

import clsx from "clsx";
import Link from "next/link";
import Modal from "../modal";
import Collapse from "../collapse";
import Pagination from "../pagination";
import RangeSlider from "../range-slider";
import { useParams } from "next/navigation";
import { searchParams } from "../../searchParams";
import { useState, useRef, useTransition } from "react";
import { createParser, parseAsInteger, useQueryState } from "nuqs";

import CheckIcon from "@/public/icons/check.svg";
import AdjustmentsIcon from "@/public/icons/adjustments.svg";
import ChevronRightIcon from "@/public/icons/chevron-right.svg";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";

const parseAsPrice = createParser({
  parse: (value) => {
    if (!value) return null;
    const [min = null, max = null] = value.split("-").map(parseAsInteger.parse);
    if (min === null) return null;
    if (max === null) return { eq: min };
    return { gte: min, lte: max };
  },
  serialize: (value) => {
    return value.eq !== undefined
      ? String(value.eq)
      : `${value.gte}-${value.lte}`;
  },
});

const categories = [
  { name: "Casual", href: "/shop/casual" },
  { name: "Formal", href: "/shop/formal" },
  { name: "Party", href: "/shop/party" },
  { name: "Gym", href: "/shop/gym" },
];

const subCategories = [
  { name: "T-shirts", href: "/shop/t-shirts" },
  { name: "Shorts", href: "/shop/shorts" },
  { name: "Shirts", href: "/shop/shirt" },
  { name: "Hoodie", href: "/shop/hoodies" },
  { name: "Jeans", href: "/shop/jeans" },
];

const sortOptions = [
  { name: "Most Popular", value: "most-popular" },
  { name: "Best Rating", value: "best-rating" },
  { name: "Price Min", value: "price-asc" },
  { name: "Price Max", value: "price-desc" },
];

const filters = {
  colors: [
    { id: "green", name: "Green", classes: "bg-green-500" },
    { id: "red", name: "Red", classes: "bg-red-500" },
    { id: "yellow", name: "Yellow", classes: "bg-yellow-300" },
    { id: "orange", name: "Orange", classes: "bg-orange-400" },
    { id: "sky-blue", name: "Sky-Blue", classes: "bg-sky-400" },
    { id: "blue", name: "Blue", classes: "bg-blue-600" },
    { id: "violet", name: "Violet", classes: "bg-violet-600" },
    { id: "pink", name: "Pink", classes: "bg-pink-500" },
    { id: "white", name: "White", classes: "bg-white" },
    { id: "black", name: "Black", classes: "bg-black" },
  ],
  sizes: [
    { name: "XX-Small" },
    { name: "X-Small" },
    { name: "Small" },
    { name: "Medium" },
    { name: "Large" },
    { name: "X-Large" },
    { name: "XX-Large" },
    { name: "3X-Large" },
    { name: "4X-Large" },
  ],
};

export default function CategoryFilters({
  totalItems,
  currentPage,
  itemsPerPage,
  children,
}: {
  totalItems: number | null;
  currentPage: string | string[] | undefined;
  itemsPerPage: number;
  children: React.ReactNode;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const params = useParams<{ tag: string; item: string }>();
  const [, setPrice] = useQueryState(
    "price",
    parseAsPrice.withOptions({ shallow: false }),
  );
  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withOptions({
      startTransition,
      shallow: false,
      scroll: true,
    }),
  );
  const [colors, setColors] = useQueryState(
    "color",
    searchParams.category.withOptions({ shallow: false }),
  );
  const [sizes, setSizes] = useQueryState(
    "size",
    searchParams.category.withOptions({ shallow: false }),
  );
  const [, setSort] = useQueryState(
    "sort",
    searchParams.q.withOptions({ shallow: false, startTransition }),
  );
  const modalRef = useRef(null);
  const visibleRangeStart = currentPage
    ? (Number(currentPage) - 1) * itemsPerPage + Number(currentPage)
    : 1;
  const visibleRangeEnd = Math.min(
    visibleRangeStart + itemsPerPage,
    totalItems || 0,
  );
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 0;

  function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPage(1);
    if (!sizes.includes(e.target.value)) {
      setSizes([...sizes, e.target.value]);
    } else {
      setSizes(sizes.filter((s) => s !== e.target.value));
    }
  }

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPage(1);
    if (!colors.includes(e.target.value)) {
      setColors([...colors, e.target.value]);
    } else {
      setColors(colors.filter((c) => c !== e.target.value));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    setPage(1);
    setPrice({
      gte: Number(formJson.minPrice) || 0,
      lte: Number(formJson.maxPrice) || 260,
    });
    setMobileFiltersOpen(false);
  }

  return (
    <div data-pending={isPending ? "" : undefined}>
      <div>
        {/* Mobile filter modal */}
        <Modal
          ref={modalRef}
          open={mobileFiltersOpen}
          style={{ top: 93, borderRadius: "20px 20px 0px 0px" }}
          onClose={() => setMobileFiltersOpen(false)}
        >
          <h2 className="px-5 pt-5 text-xl leading-[1.6875rem] font-bold text-black not-italic">
            Filters
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex h-full w-full flex-col"
          >
            <div className="h-0 w-full flex-grow overflow-y-auto px-5">
              <div className="flex flex-col border-t border-[rgba(0,0,0,0.1)]">
                <h3 className="sr-only">Subcategories</h3>
                <ul className="pt-2.5 pb-3.5 leading-5.5 font-normal text-[rgba(0,0,0,0.6)] xl:py-[1.0625rem]">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="flex justify-between py-2.5 max-xl:hover:bg-[#F0F0F0] xl:py-[0.4375rem]"
                      >
                        {category.name}
                        <ChevronRightIcon className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Collapse title="Price">
                  <RangeSlider min={0} max={260} defaultValue={[50, 200]} />
                </Collapse>
                <Collapse title="Colors">
                  <fieldset aria-label="Choose a color">
                    <legend className="sr-only">Select Colors</legend>
                    <div className="mt-4 flex flex-wrap items-center gap-4 xl:mt-5 xl:grid xl:grid-cols-5">
                      {filters.colors.map((color, index) => (
                        <div
                          key={color.id}
                          className="group/colors relative flex rounded-full outline -outline-offset-2 outline-[rgba(0,0,0,0.2)]"
                        >
                          <input
                            defaultValue={color.name}
                            defaultChecked={false}
                            id={`filter-color-${index}`}
                            name="color"
                            type="checkbox"
                            onChange={handleColorChange}
                            className={clsx(
                              color.classes,
                              `peer size-[2.3125rem] appearance-none rounded-full forced-color-adjust-none focus-visible:outline-3 focus-visible:outline-offset-3`,
                            )}
                          />
                          <CheckIcon
                            className={clsx(
                              "pointer-events-none absolute top-2/4 left-[0.66125rem] -translate-y-2/4 opacity-0 group-has-checked/colors:opacity-100",
                              {
                                "text-black": color.id === "white",
                                "text-white": color.id !== "white",
                              },
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </Collapse>
                <Collapse title="Size">
                  <fieldset aria-label="Choose a size">
                    <legend className="sr-only">Choose Size</legend>
                    <div className="mt-4 flex flex-wrap gap-2 xl:mt-5">
                      {filters.sizes.map((size, index) => (
                        <label
                          key={size.name}
                          aria-label={size.name}
                          className="group/filters-sizes relative flex items-center justify-center rounded-[3.875rem] bg-[#F0F0F0] px-5 py-2.5 has-checked:bg-black has-checked:font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                        >
                          <input
                            defaultValue={size.name}
                            defaultChecked={false}
                            id={`filter-size-${index}`}
                            name="size"
                            type="checkbox"
                            onChange={handleSizeChange}
                            className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                          />
                          <span className="text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic group-has-checked/filters-sizes:font-medium group-has-checked/filters-sizes:text-white">
                            {size.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </Collapse>
                <Collapse title="Dress Style">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="pt-1.5 leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mb-[-0.4375rem] xl:pt-[0.8125rem]">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link
                          href={category.href}
                          className="flex justify-between py-2.5 max-xl:hover:bg-[#F0F0F0] xl:py-[0.4375rem]"
                        >
                          {category.name}
                          <ChevronRightIcon className="size-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </div>
            </div>
            <div className="flex flex-row justify-between px-5 pb-22">
              <button
                type="submit"
                className="hover:bg-primary/75 align-center h-12 w-full cursor-pointer justify-center rounded-[3.875rem] bg-black text-center align-middle text-sm leading-[1.1875rem] font-medium text-white not-italic hover:bg-white hover:text-black hover:inset-ring-1 hover:inset-ring-[rgba(0,0,0,0.1)] disabled:pointer-events-none disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500"
              >
                Apply Filter
              </button>
            </div>
          </form>
        </Modal>

        <div className="mx-auto max-w-310 px-4 lg:px-8 xl:px-0">
          <section
            aria-labelledby="products-heading"
            className="pt-3 pb-12.5 xl:pt-0 xl:pb-20"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
              {/* Filters */}
              <form
                onSubmit={handleSubmit}
                className="hidden lg:relative lg:block lg:h-305 xl:rounded-[1.25rem] xl:px-6 xl:py-5 xl:inset-ring xl:inset-ring-[rgba(0,0,0,0.1)]"
              >
                <div className="lg:flex lg:items-center lg:justify-between lg:border-b lg:border-solid lg:border-[rgba(0,0,0,0.1)] lg:pb-6">
                  <h3 className="sr-only lg:not-sr-only lg:text-xl lg:leading-[1.6875rem] lg:font-bold lg:text-black lg:not-italic">
                    Filters
                  </h3>
                  <AdjustmentsIcon className="lg:size-6 lg:text-[rgba(0,0,0,0.4)]" />
                </div>
                <h3 className="sr-only">Subcategories</h3>
                <ul className="pt-2.5 pb-3.5 leading-5.5 font-normal text-[rgba(0,0,0,0.6)] xl:py-[1.0625rem]">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="flex justify-between py-2.5 max-xl:hover:bg-[#F0F0F0] xl:py-[0.4375rem]"
                      >
                        {category.name}
                        <ChevronRightIcon className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Collapse title="Price">
                  <RangeSlider min={0} max={260} defaultValue={[50, 200]} />
                </Collapse>
                <Collapse title="Colors">
                  <fieldset aria-label="Choose a color">
                    <legend className="sr-only">Select Colors</legend>
                    <div className="mt-4 flex flex-wrap items-center gap-4 xl:mt-5 xl:grid xl:grid-cols-5">
                      {filters.colors.map((color, index) => (
                        <div
                          key={color.id}
                          className="group/colors relative flex rounded-full outline -outline-offset-2 outline-[rgba(0,0,0,0.2)]"
                        >
                          <input
                            defaultValue={color.name}
                            defaultChecked={false}
                            id={`filter-color-${index}`}
                            name="color"
                            type="checkbox"
                            onChange={handleColorChange}
                            className={clsx(
                              color.classes,
                              `peer size-[2.3125rem] appearance-none rounded-full forced-color-adjust-none focus-visible:outline-3 focus-visible:outline-offset-3`,
                            )}
                          />
                          <CheckIcon
                            className={clsx(
                              "pointer-events-none absolute top-2/4 left-[0.66125rem] -translate-y-2/4 opacity-0 group-has-checked/colors:opacity-100",
                              {
                                "text-black": color.id === "white",
                                "text-white": color.id !== "white",
                              },
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </Collapse>
                <Collapse title="Size">
                  <fieldset aria-label="Choose a size">
                    <legend className="sr-only">Choose Size</legend>
                    <div className="mt-4 flex flex-wrap gap-2 xl:mt-5">
                      {filters.sizes.map((size, index) => (
                        <label
                          key={size.name}
                          aria-label={size.name}
                          className="group/filters-sizes relative flex items-center justify-center rounded-[3.875rem] bg-[#F0F0F0] px-5 py-2.5 has-checked:bg-black has-checked:font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                        >
                          <input
                            defaultValue={size.name}
                            defaultChecked={false}
                            id={`filter-size-${index}`}
                            name="size"
                            type="checkbox"
                            onChange={handleSizeChange}
                            className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                          />
                          <span className="text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic group-has-checked/filters-sizes:font-medium group-has-checked/filters-sizes:text-white">
                            {size.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </Collapse>
                <Collapse title="Dress Style">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="pt-1.5 leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:mb-[-0.4375rem] xl:pt-[0.8125rem]">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link
                          href={category.href}
                          className="flex justify-between py-2.5 max-xl:hover:bg-[#F0F0F0] xl:py-[0.4375rem]"
                        >
                          {category.name}
                          <ChevronRightIcon className="size-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
                <button
                  type="submit"
                  className="hover:bg-primary/75 align-center h-12 w-full cursor-pointer justify-center rounded-[3.875rem] bg-black text-center align-middle text-sm leading-[1.1875rem] font-medium text-white not-italic hover:bg-white hover:text-black hover:inset-ring-1 hover:inset-ring-[rgba(0,0,0,0.1)] disabled:pointer-events-none disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500 lg:absolute lg:bottom-0 lg:max-w-[15.4375rem] xl:bottom-[1.8125rem]"
                >
                  Apply Filter
                </button>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex items-baseline justify-between xl:items-center">
                  <div className="flex items-center gap-2 xl:w-[78.78378378%] xl:justify-between">
                    {params.tag && (
                      <>
                        <h1 className="text-2xl leading-8 font-bold text-black not-italic xl:text-[2rem] xl:leading-[2.6875rem]">
                          {params.tag.replace(/^./, (char) =>
                            char.toUpperCase(),
                          )}
                        </h1>
                        <span className="text-sm leading-[1.1875rem] font-normal text-[rgba(0,0,0,0.6)] not-italic xl:text-base xl:leading-5.5">
                          Showing {visibleRangeStart}-{visibleRangeEnd} of{" "}
                          {totalItems} Products
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="relative hidden text-[rgba(0,0,0,0.6)] xl:inline-flex xl:items-center">
                      Sort by:
                      <select
                        onChange={(e) => setSort(e.target.value)}
                        className="cursor-pointer appearance-none rounded-[3.875rem] text-base leading-5.5 font-normal text-black focus:outline-none xl:pr-5 xl:pl-1.5"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.name} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-black xl:right-0" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(true)}
                      className="group/filters flex size-8 items-center justify-center rounded-[3.875rem] bg-[#F0F0F0] text-black transition-colors duration-200 hover:bg-black sm:ml-6 lg:hidden"
                    >
                      <span className="sr-only">Filters</span>
                      <AdjustmentsIcon className="size-4 group-hover/filters:text-white" />
                    </button>
                  </div>
                </div>
                {children}
                <Pagination total={totalPages} page={page} onChange={setPage} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
