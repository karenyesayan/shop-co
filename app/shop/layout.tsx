import Header from "../ui/header";
import Newsletter from "../ui/newsletter";
import Footer from "../ui/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="group">
        {children}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
