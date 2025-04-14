import React, { Suspense } from "react";
import FinalProgram from "@/app/Components/FinalProgram";
import Container from "@mui/material/Container";

const Page = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        fontFamily: "Amiri, serif",
        padding: "1rem",
        borderRadius: "15px",
        marginTop: "6rem",
      }}
    >
      <Suspense fallback={<div>Loading…</div>}>
        <FinalProgram />
      </Suspense>
    </Container>
  );
};

export default Page;
