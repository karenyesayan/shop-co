import { clsx } from "clsx";

export default function Rating({
  value,
  size,
  color,
}: {
  value: number;
  size: string;
  color: string;
}) {
  const sizes: { [key: string]: string } = {
    sm: "size-4 xl:size-4.5",
    md: "size-[1.1875rem] xl:size-[1.41125rem]",
    lg: "size-[1.1875rem] xl:size-[1.544375rem]",
  };

  return (
    <div
      className={clsx("flex items-center", {
        "gap-1 xl:gap-[5.31px]": size === "sm",
        "gap-1.5 xl:gap-[6.49px]": size === "md",
        "gap-1.5 xl:gap-[7px]": size === "lg",
      })}
    >
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <svg
            key={i}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={sizes[size]}
          >
            {i < value ? (
              <path
                d="M15 5.54532L9.54964 5.18699L7.49701 0.0302734L5.44439 5.18699L0 5.54532L4.1758 9.09101L2.80553 14.4696L7.49701 11.5041L12.1885 14.4696L10.8183 9.09101L15 5.54532Z"
                fill={color}
              />
            ) : (
              <path
                d="M15 5.5456L9.55274 5.18735L7.5 0.0305176L5.44726 5.18738L0 5.54563L4.17943 9.0885L2.80828 14.4697L7.5 11.5044L12.1917 14.4697L10.8206 9.08873L15 5.5456ZM7.5 10.4647L4.20516 12.5471L5.16688 8.77276L2.22155 6.28004L6.05859 6.028L7.5 2.40696L8.94141 6.02803L12.7829 6.28004L9.83306 8.77253L10.7948 12.5471L7.5 10.4647Z"
                fill={color}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}
