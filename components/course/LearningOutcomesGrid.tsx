import { getLearningOutcomeIcon } from "@/lib/course-icons";
import type { LearningOutcome } from "@/types/course";

type LearningOutcomesGridProps = {
  outcomes: LearningOutcome[];
};

export function LearningOutcomesGrid({ outcomes }: LearningOutcomesGridProps) {
  if (outcomes.length === 0) {
    return null;
  }

  return (
    <section className="rounded-md border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
        What you&apos;ll learn
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {outcomes.map((outcome) => {
          const Icon = getLearningOutcomeIcon(outcome.icon);

          return (
            <div key={outcome.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-100">
                <Icon className="h-5 w-5 text-primary-500" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-heading-3 font-medium leading-[26px] text-neutral-900">
                  {outcome.title}
                </h3>
                <p className="text-body leading-5 text-neutral-500">
                  {outcome.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
