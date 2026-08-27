import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { heroCopy } from "@/lib/homepage-data";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pb-16 pt-12 text-center md:px-10 md:pt-16">
      <Badge variant="feature">{heroCopy.badge}</Badge>

      <h1 className="mt-6 max-w-[720px] font-display text-display-1 font-bold leading-[56px] text-neutral-900">
        {heroCopy.headline}
      </h1>

      <p className="mt-4 max-w-[560px] text-body-lg leading-6 text-neutral-500">
        {heroCopy.subtext}
      </p>

      <div className="mt-8">
        <Button
          variant="primary"
          showVariantIcon={false}
          trailingIcon={<ArrowRightIcon className="h-4 w-4 shrink-0" strokeWidth={2} />}
        >
          {heroCopy.ctaLabel}
        </Button>
      </div>

      <form action="#" className="mt-8 w-full max-w-[640px]">
        <Input
          size="lg"
          showSearchIcon
          shortcutHint="⌘ K"
          placeholder={heroCopy.searchPlaceholder}
          aria-label="Search your learning"
        />
      </form>
    </section>
  );
}
