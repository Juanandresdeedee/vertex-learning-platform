import { CoursesSection } from "@/components/home/CoursesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { Navbar } from "@/components/navigation/Navbar";

export default function HomePage() {
  return (
    <div className="page-texture flex min-h-full flex-col">
      <Navbar layout="homepage" showActions />
      <HeroSection />
      <CoursesSection />
      <HomeFooter />
    </div>
  );
}
