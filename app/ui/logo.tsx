import Link from "next/link";

export default function Logo({ size }: { size: string }) {
    const sizes: { [key: string]: string } = {
        sm: "md:text-4xl 2xl:leading-[100%] text-2xl 2xl:text-[2rem]",
        md: "font-black text-[1.8029375rem] leading-9 md:text-4xl xl:leading-9.5 text-[1.55rem] xl:text-[2rem]",
        lg: "hidden text-4xl sm:flex 2xl:text-[4.16228125rem] 2xl:leading-[4.16228125rem]",
    };

    return (
        <Link
            href="/"
            className="text-black not-italic"
        >
            <span className={sizes[size]}>SHOP.CO</span>
        </Link>
    );
}
