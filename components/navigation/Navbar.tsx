import { VertexLogo } from "@/components/brand/VertexLogo";
import { NavAuthActions } from "@/components/navigation/NavAuthActions";
import { cn } from "@/lib/cn";

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavbarProps = {
  links?: NavLink[];
  layout?: "default" | "homepage";
  showActions?: boolean;
  className?: string;
};

export function Navbar({
  links = [
    { label: "Courses", href: "#", active: true },
    { label: "My Learning", href: "#" },
  ],
  layout = "default",
  showActions = false,
  className,
}: NavbarProps) {
  const navLinks = (
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
  );

  const actions = showActions ? <NavAuthActions /> : null;

  if (layout === "homepage") {
    return (
      <header
        className={cn(
          "grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 md:px-10",
          className,
        )}
      >
        <VertexLogo />
        <div className="justify-self-center">{navLinks}</div>
        <div className="justify-self-end">{actions}</div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6 py-4",
        className,
      )}
    >
      <VertexLogo />
      {navLinks}
      {actions}
    </header>
  );
}
