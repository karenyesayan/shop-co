import { clsx } from "clsx";

type TabProps = {
  id: number;
  label: string;
  value: string;
};

const tabs = [
  { id: 0, label: "Product Details", value: "details" },
  { id: 1, label: "Rating & Reviews", value: "reviews" },
  { id: 2, label: "FAQs", value: "faq" },
];

export default function Tab({
  value,
  onChange,
}: {
  value: number;
  onChange: (id: number) => void;
}) {
  return (
    <div className="w-full xl:h-15.5">
      <ul className="flex h-16 justify-between border-b border-solid border-[rgba(0,0,0,0.1)] xl:grid xl:h-auto xl:grid-cols-3">
        {tabs.map((tab: TabProps) => (
          <li key={tab.id}>
            <button
              onClick={() => onChange(tab.id)}
              className={clsx(
                "py-5 text-center text-base leading-5.5 font-normal text-[rgba(0,0,0,0.6)] not-italic xl:w-full xl:py-5.5 xl:text-xl xl:leading-5.5",
                {
                  "border-b-2 !font-medium text-black": tab.id === value,
                },
              )}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
