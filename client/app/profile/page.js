import React, { Suspense } from "react";
import Profile from "../Components/Profile";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Profile />
    </Suspense>
  );
};

export default Page;
