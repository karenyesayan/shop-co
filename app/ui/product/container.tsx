"use client";

import Tabs from "./tabs";
import Reviews from "./reviews";
import TabPanel from "./panel";
import { useState } from "react";

export default function TabContainer() {
  const [tab, setTab] = useState(1);

  function handleChange(id: number) {
    setTab(id);
  }

  return (
    <section className="flex flex-col items-center px-4 xl:mx-auto xl:max-w-310 xl:px-0">
      <Tabs value={tab} onChange={handleChange} />
      <TabPanel value={tab} index={0}>
        <p className="mt-5">Nothing to see here</p>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Reviews />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <p className="mt-5">Nothing to see here</p>
      </TabPanel>
    </section>
  );
}
