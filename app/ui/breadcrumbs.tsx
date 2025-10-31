import clsx from "clsx";
import Link from "next/link";
import ChevronRightIcon from "@/public/icons/chevron-right.svg";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-5 block px-4 lg:mb-[2.4375rem] xl:mx-auto xl:my-6 xl:max-w-310 xl:px-0"
    >
      <ol className="flex justify-start text-xl font-normal not-italic md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx("flex items-center text-sm leading-[1.1875rem]", {
              "text-black xl:text-base xl:leading-5.5 xl:font-normal":
                breadcrumb.active,
              "text-[rgba(0,0,0,0.6)] xl:text-base xl:leading-5.5 xl:font-normal":
                !breadcrumb.active,
            })}
          >
            <Link href={breadcrumb.href} className="hover:underline">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mr-1.5 ml-1 inline-block xl:mr-3">
                <ChevronRightIcon className="size-3.5 xl:size-4" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
