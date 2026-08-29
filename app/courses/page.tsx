import { Navbar } from "@/components/navigation/Navbar";
import { CoursesSection } from "@/components/home/CoursesSection";
import { getAllCourses } from "@/lib/sanity/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CoursesSection courses={courses} />
      </main>
    </>
  );
}
