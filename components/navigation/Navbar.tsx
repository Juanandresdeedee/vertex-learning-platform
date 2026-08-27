import { cn } from "@/lib/cn";

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavbarProps = {
  links?: NavLink[];
  className?: string;
};

function VertexLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M16 3L29 27H3L16 3Z"
            className="fill-primary-500"
          />
          <path
            d="M16 10L21 22H11L16 10Z"
            className="fill-white"
          />
        </svg>
      </div>
      <span className="text-lg font-semibold text-neutral-900">Vertex</span>
    </div>
  );
}

export function Navbar({
  links = [
    { label: "Courses", href: "#", active: true },
    { label: "My Learning", href: "#" },
  ],
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6 py-4",
        className,
      )}
    >
      <VertexLogo />
      <nav className="flex flex-wrap items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors",
              link.active
                ? "text-primary-500"
                : "text-neutral-700 hover:text-neutral-900",
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
