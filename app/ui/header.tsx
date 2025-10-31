"use client";

import clsx from "clsx";
import Logo from "./logo";
import Drawer from "./drawer";
import NavBar from "./navbar";
import Banner from "./banner";
import ToolBar from "./toolbar";
import { useState } from "react";
import { MenuButton } from "./buttons";
import { useScrollPosition } from "../lib/hooks";

const navigation = {
  categories: [
    {
      id: "shop",
      name: "Shop",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "All Clothing", href: "/shop" },
            { name: "T-Shirts", href: "/shop/t-shirts" },
            { name: "Shorts", href: "/shop/shorts" },
            { name: "Shirts", href: "/shop/shirts" },
            { name: "Hoodie", href: "/shop/hoodies" },
            { name: "Jeans", href: "/shop/jeans" },
          ],
        },
        {
          id: "shop-by-style",
          name: "Shop By Style",
          items: [
            { name: "Casual", href: "/shop/casual" },
            { name: "Formal", href: "/shop/formal" },
            { name: "Party", href: "/shop/party" },
            { name: "Gym", href: "/shop/gym" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [{ name: "All Accessories", href: "#" }],
        },
      ],
    },
  ],
  pages: [
    { name: "On Sale", href: "/shop" },
    { name: "New Arrivals", href: "/shop" },
    { name: "Brands", href: "/shop" },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const windowHeight = useScrollPosition();

  return (
    <header
      className={clsx(
        "sticky top-0 z-10 backdrop-blur-[5px] backdrop-saturate-[180%]",
        {
          "border-b border-solid border-[rgba(0,0,0,0.1)]": windowHeight > 200,
        },
      )}
    >
      <Banner />
      <nav
        className={clsx(
          "relative mx-auto flex h-16 w-full max-w-[calc(100%_-_32px)] flex-wrap items-center justify-between px-0 xl:h-24 xl:max-w-310",
          {
            "border-b border-solid border-[rgba(0,0,0,0.1)]":
              windowHeight < 200,
          },
        )}
      >
        <Drawer
          placement="left"
          isOpen={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Logo size="md" />
          <NavBar navigation={navigation} variant="mobile" />
        </Drawer>
        <MenuButton onToggle={setMobileMenuOpen} />
        <Logo size="md" />
        <NavBar navigation={navigation} variant="desktop" />
        <ToolBar />
      </nav>
    </header>
  );
}
