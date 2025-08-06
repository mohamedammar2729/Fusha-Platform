import React from "react";
import Container from "@mui/material/Container";
import FinalProgram from "@/app/Components/FinalProgram";

export default function FinalPage() {
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
      <FinalProgram />
    </Container>
  );
}
