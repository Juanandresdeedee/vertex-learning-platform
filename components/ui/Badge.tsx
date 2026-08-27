import { cn } from "@/lib/cn";

export type BadgeVariant = "video" | "lesson" | "popular" | "feature";

export type BadgeProps = {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  video: "bg-primary-100 text-primary-500",
  lesson: "bg-lesson-100 text-lesson-500",
  popular: "border border-primary-500 bg-white text-primary-500",
  feature:
    "rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-500",
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium",
        variant !== "feature" && "rounded-sm",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
