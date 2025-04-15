import FinalProgramClient from "./FinalProgramClient";
import Container from "@mui/material/Container";

export default function Page({ params }) {
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
      <FinalProgramClient programId={params.final} />
    </Container>
  );
}

// Add generateStaticParams to fetch all program IDs
export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://iti-server-production.up.railway.app/api/createprogram/all-ids"
    );

    if (!response.ok) {
      console.error("Failed to fetch program IDs for static generation");
      return [{ final: "placeholder" }];
    }

    const data = await response.json();
    return data.ids.map((id) => ({
      final: id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // Return at least one ID to prevent build failure
    return [{ final: "placeholder" }];
  }
}
