import { cn } from "@/lib/cn";

export type VertexLogoProps = {
  className?: string;
};

export function VertexLogo({ className }: VertexLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          aria-hidden="true"
          fill="none"
        >
          <path d="M16 3L29 27H3L16 3Z" className="fill-primary-500" />
          <path d="M16 10L21 22H11L16 10Z" className="fill-white" />
        </svg>
      </div>
      <span className="text-lg font-semibold text-neutral-900">Vertex</span>
    </div>
  );
}
