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
    <section className="rounded-lg border border-neutral-200 bg-white p-6 md:p-8">
      <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
        What you&apos;ll learn
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {outcomes.map((outcome) => {
          const Icon = getLearningOutcomeIcon(outcome.icon);

          return (
            <div
              key={outcome.title}
              className="flex gap-4 rounded-lg border border-neutral-200 p-5"
            >
              <Icon
                className="h-6 w-6 shrink-0 text-primary-500"
                strokeWidth={2}
              />
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="font-display text-heading-3 font-semibold leading-[26px] text-neutral-900">
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
