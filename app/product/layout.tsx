import Header from "../ui/header";
import Newsletter from "../ui/newsletter";
import Footer from "../ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
