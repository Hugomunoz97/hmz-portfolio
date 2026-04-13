import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "HMZ - Diseño Integral de Producto",
  description: "Portfolio de diseño UX/UI e Industrial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full antialiased dark">
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col bg-neutral-950 text-white`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
