import { Suspense } from "react";
import Header from "./ui/header";
import Hero from "./ui/home/hero";
import Brands from "./ui/home/brands";
import NewArrivals from "./ui/home/new-arrivals";
import TopSelling from "./ui/home/top-selling";
import ImageGrid from "./ui/home/grid";
import Testimonials from "./ui/home/testimonials";
import Newsletter from "./ui/newsletter";
import Footer from "./ui/footer";
import { NewArrivalsSkeleton, TopSellingSkeleton } from "./ui/skeletons";

export default async function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Brands />
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <NewArrivals />
        </Suspense>
        <Suspense fallback={<TopSellingSkeleton />}>
          <TopSelling />
        </Suspense>
        <ImageGrid />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
