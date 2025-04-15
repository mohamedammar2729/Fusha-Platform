// IMPORTANT: Remove "use client" - this is a server component
import TripDetailsClient from "./TripDetailsClient";

export default function Page({ params }) {
  return <TripDetailsClient id={params.id} />;
}

// Server-side function runs at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://iti-server-production.up.railway.app/api/createprogram/all-ids"
    );

    if (!response.ok) {
      console.error("Failed to fetch trip IDs for static generation");
      return [{ id: "placeholder" }];
    }

    const data = await response.json();
    return data.ids.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // Return at least one ID to prevent build failure
    return [{ id: "placeholder" }];
  }
}
