import { ContextSearch } from "@/components/search/ContextSearch";
import { Navbar } from "@/components/navigation/Navbar";

export default function SearchPage() {
  return (
    <>
      <Navbar
        links={[
          {
            label: "Courses",
            href: "/courses",
          },
          {
            label: "Search",
            href: "/search",
            active: true,
          },
          {
            label: "My Learning",
            href: "#",
          },
        ]}
      />

      <main className="min-h-screen bg-neutral-50">
        <ContextSearch />
      </main>
    </>
  );
}