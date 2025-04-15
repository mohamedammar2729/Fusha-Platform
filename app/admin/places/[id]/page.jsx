
import PlaceDetailClient from "./PlaceDetailClient";

// This is a server component - no "use client" directive
export default function Page({ params }) {
  // Server components can pass props to client components
  return <PlaceDetailClient id={params.id} />;
}

// Server-side function runs at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://iti-server-production.up.railway.app/api/seller-places/all-ids"

    );

    if (!response.ok) {
      return [{ id: "placeholder" }];
    }

    const data = await response.json();
    return data.ids.map((id) => ({
      id: id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [{ id: "placeholder" }];
  }
}
