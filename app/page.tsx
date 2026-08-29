import { CoursesSection } from "@/components/home/CoursesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { Navbar } from "@/components/navigation/Navbar";
import { getHomepageCourses } from "@/lib/sanity/courses";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const courses = await getHomepageCourses();

  return (
    <div className="page-texture flex min-h-full flex-col">
      <Navbar layout="homepage" showActions />
      <HeroSection />
      <CoursesSection courses={courses} />
      <HomeFooter />
    </div>
  );
}
