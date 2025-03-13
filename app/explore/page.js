import React from "react";
import ReadyPrograms from "../Components/ReadyPrograms";
import Container from "@mui/material/Container";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/api/readyprogram", {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const programsData = await res.json();

  return {
    props: {
      programsData,
    },
  };
}

const Page = ({ programsData }) => {
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
      <ReadyPrograms initialData={programsData} />
    </Container>
  );
};

export default Page;
