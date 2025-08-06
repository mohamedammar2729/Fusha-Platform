import React from "react";
import ReadyPrograms from "../Components/ReadyPrograms";
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
      <ReadyPrograms />
    </Container>
  );
};

export default Page;
