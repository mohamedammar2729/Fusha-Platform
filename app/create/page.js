import React, { Suspense } from "react";
import Create from "../Components/Create";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Create />
    </Suspense>
  );
};

export default Page;