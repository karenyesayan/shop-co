import SideNav from "./sidenav";

export default function Dashboard() {
  return (
    <div className="flex flex-col px-4 pt-3 pb-12.5 md:flex-row md:justify-center md:gap-12 md:py-9.5 xl:mx-auto xl:max-w-310 xl:px-0">
      <SideNav />
      <div className="flex w-full flex-1 flex-col">
        <div className="mb-5 block w-full md:hidden" />
        <div className="hidden w-full flex-col items-start gap-6 md:flex">
          <span className="w-full font-semibold">No orders yet</span>
        </div>
      </div>
    </div>
  );
}
