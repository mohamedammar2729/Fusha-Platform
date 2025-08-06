"use client";

import React, { Suspense } from "react";
import FinalProgram from "@/app/Components/FinalProgram";

const FinalProgramClient = ({ programId }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinalProgram programId={programId} />
    </Suspense>
  );
};

export default FinalProgramClient;
