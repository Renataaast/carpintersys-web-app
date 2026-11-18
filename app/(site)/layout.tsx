import { PerfilProvider } from "@/components/site/PerfilProvider";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { BackToTop, CustomCursor, NoiseOverlay, ScrollProgress, Splash, WhatsAppFloat } from "@/components/site/Chrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PerfilProvider>
      <Splash />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <NoiseOverlay />
    </PerfilProvider>
  );
}
