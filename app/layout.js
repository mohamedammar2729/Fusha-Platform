
// import global css file
'use client'
import NavBar from "./Components/NavBar";
import "./globals.css";
import { StyledEngineProvider } from '@mui/material/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f4fafd",
          boxSizing: "border-box",
        }}
      >
        <StyledEngineProvider injectFirst>
          <NavBar />

          {children}
        </StyledEngineProvider>
      </body>
    </html>
  );
}
