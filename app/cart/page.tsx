import Header from "../ui/header";
import Breadcrumbs from "../ui/breadcrumbs";
import ShoppingCart from "../ui/cart/shopping-cart";
import Newsletter from "../ui/newsletter";
import Footer from "../ui/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            {
              label: "Cart",
              href: "/cart",
              active: true,
            },
          ]}
        />
        <ShoppingCart />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
