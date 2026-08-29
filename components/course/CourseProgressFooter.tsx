import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function CourseProgressFooter() {
  return (
    <div className="sticky bottom-0 border-t border-neutral-200 bg-white/95 px-6 py-4 shadow-lg backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="shrink-0">
            <p className="text-sm text-neutral-500">Your Progress</p>
            <p className="text-sm font-semibold text-neutral-900">35% complete</p>
          </div>
          <ProgressBar value={35} className="min-w-0 flex-1 sm:max-w-md" />
        </div>
        <Button
          variant="primary"
          showVariantIcon={false}
          trailingIcon={
            <ArrowRightIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
          }
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
}
