import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WorksGrid } from "@/components/WorksGrid";
import { ShowreelSection } from "@/components/ShowreelSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/ContactSection";
import { MotionProvider } from "@/components/MotionProvider";
import { AntigravityBackground } from "@/components/AntigravityBackground";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <MotionProvider>
      {/* Bespoke 3D Studio Cursor */}
      <CustomCursor />

      {/* Antigravity Interactive Background & Cursor Physics */}
      <AntigravityBackground />

      <Navbar />

      <main id="main-content" className="flex-1 relative z-10">
        {/* Section 1: Hero with 3D Turntable, Headlines & 4-Pillar Strip */}
        <HeroSection />

        {/* Section 2: Selected Works Filterable Grid & Lightbox Modals */}
        <WorksGrid />

        {/* Section 3: About The Artist, Metrics & Interactive Skills Matrix */}
        <AboutSection />

        {/* Section 4: 2026 Animation & 3D Breakdown Showreel */}
        <ShowreelSection />

        {/* Section 5: 5-Stage Concept to Render Production Pipeline */}
        <ProcessSection />

        {/* Section 6: Contact Inquiries, Email Copy & Studio Channels */}
        <ContactSection />
      </main>

      <Footer />
    </MotionProvider>
  );
}
