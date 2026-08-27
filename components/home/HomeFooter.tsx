import { StarIcon } from "@heroicons/react/24/outline";
import { footerCopy } from "@/lib/homepage-data";

const barHeights = [40, 64, 96, 128, 160, 128, 96, 64, 48, 32, 24, 16];

export function HomeFooter() {
  return (
    <footer className="mt-auto px-6 pb-0 pt-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <StarIcon className="h-4 w-4 text-primary-500" strokeWidth={2} />
          <span>{footerCopy.callout}</span>
        </div>

        <div
          className="flex h-32 w-full max-w-4xl items-end justify-center gap-2 overflow-hidden opacity-80"
          aria-hidden="true"
        >
          {barHeights.map((height, index) => (
            <div
              key={index}
              className="w-3 rounded-t-sm bg-gradient-to-t from-primary-500/10 via-primary-400/40 to-primary-300/60"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
