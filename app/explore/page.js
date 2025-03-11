import React from "react";
import ReadyPrograms from "../Components/ReadyPrograms";
import Container from "@mui/material/Container";

export const dynamic = "force-dynamic";

async function fetchPrograms() {
  const res = await fetch("http://localhost:4000/api/readyprogram", {
    cache: "no-store", // تعطيل التخزين المؤقت للبيانات
  });

  if (!res.ok) throw new Error("فشل في جلب البيانات");

  return res.json();
}

const Page = async () => {
  const programsData = await fetchPrograms();


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
