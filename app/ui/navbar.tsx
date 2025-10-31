import Link from "next/link";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";

interface Navigation {
  pages: {
    name: string;
    href: string;
  }[];
  categories: {
    id: string;
    name: string;
    sections: {
      id: string;
      name: string;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  }[];
}

export default function NavBar({
  navigation,
  variant,
}: {
  navigation: Navigation;
  variant: "mobile" | "desktop";
}) {
  return (
    <>
      {variant === "mobile" && (
        <div className="lg:hidden">
          <div className="mt-2">
            <div className="border-b border-[rgba(0,0,0,0.1)]">
              <div className="-mb-px flex space-x-8 px-4">
                {navigation.categories.map((category) => (
                  <button
                    key={category.name}
                    className="flex-1 border-b-2 border-transparent px-1 py-4 text-xl font-bold whitespace-nowrap text-black"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            {navigation.categories.map((category) => (
              <div key={category.name} className="space-y-10 pt-10 pb-8">
                {category.sections.map((section) => (
                  <div key={section.name}>
                    <p
                      id={`${category.id}-${section.id}-heading-mobile`}
                      className="text-xl font-bold text-black"
                    >
                      {section.name}
                    </p>
                    <ul
                      aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                      className="mt-6 flex flex-col space-y-6"
                    >
                      {section.items.map((item) => (
                        <li key={item.name} className="flow-root">
                          <Link
                            href={item.href}
                            className="-m-2 block p-2 text-[rgba(0,0,0,0.6)]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-6 border-t border-[rgba(0,0,0,0.1)] py-6">
            {navigation.pages.map((page) => (
              <div key={page.name} className="flow-root">
                <Link
                  href={page.href}
                  className="-m-2 block p-2 text-xl font-bold text-black"
                >
                  {page.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === "desktop" && (
        <div className="hidden lg:ml-8 lg:block lg:self-stretch xl:ml-0">
          <div className="flex h-full space-x-17.5 xl:space-x-6">
            {navigation.categories.map((category) => (
              <div key={category.name} className="group/nav flex">
                <div className="relative flex">
                  <button className="relative flex items-center justify-center gap-1 text-base leading-5.5 font-normal text-black not-italic transition-colors duration-200 ease-out hover:text-black">
                    {category.name}
                    <ChevronDownIcon className="hidden size-4 text-black min-[53.3125rem]:block" />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px z-30 h-px transition duration-200 ease-out group-hover/nav:bg-[#484848]"
                    />
                  </button>
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-16 z-20 w-full border-t border-solid border-t-[rgba(0,0,0,0.1)] bg-white text-sm text-[rgba(0,0,0,0.6)] opacity-0 transition duration-150 ease-in group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:duration-200 group-hover/nav:ease-out xl:top-24">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 top-1/2 bg-white shadow-sm"
                  />
                  <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                        <div className="col-start-2 grid h-100 grid-cols-2 gap-x-8" />
                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${section.id}-heading`}
                                className="font-medium text-black"
                              >
                                {section.name}
                              </p>
                              <ul
                                aria-labelledby={`${section.id}-heading`}
                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flex">
                                    <Link
                                      href={item.href}
                                      className="hover:text-black"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {navigation.pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                className="group/link relative flex items-center text-base leading-5.5 font-normal text-black not-italic hover:text-gray-800"
              >
                {page.name}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px z-30 h-px transition duration-200 ease-out group-hover/link:bg-[#484848]"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
