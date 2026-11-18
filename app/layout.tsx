import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });

const title = "CarpinterSys | Carpintería Morales · Muebles artesanales a tu medida";
const description =
  "Carpintería Morales en Ciudad Juárez, Chihuahua. Muebles, puertas, closets y cocinas hechos a la medida con la mejor madera.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Carpintería Morales" },
  description,
  applicationName: "CarpinterSys",
  openGraph: { title, description, locale: "es_MX", type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = { themeColor: "#8B5E3C" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
