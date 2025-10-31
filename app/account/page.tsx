import Header from "../ui/header";
import Footer from "../ui/footer";
import Newsletter from "../ui/newsletter";
import { redirect } from "next/navigation";
import Breadcrumbs from "../ui/breadcrumbs";
import Dashboard from "../ui/account/dashboard";
import { createClient } from "../lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My account",
};

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            {
              label: "Account",
              href: "/account",
              active: true,
            },
          ]}
        />
        <Dashboard />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
