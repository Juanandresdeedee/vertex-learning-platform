import type { ComponentType, SVGProps } from "react";
import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CloudIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CircleStackIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  layers: Square3Stack3DIcon,
  workflow: ArrowsRightLeftIcon,
  gauge: ArrowPathIcon,
  rocket: RocketLaunchIcon,
  database: CircleStackIcon,
  cylinder: CircleStackIcon,
  cloud: CloudIcon,
  shield: ShieldCheckIcon,
  code: CodeBracketIcon,
  sparkles: SparklesIcon,
  puzzle: PuzzlePieceIcon,
  chip: CpuChipIcon,
};

export function getLearningOutcomeIcon(icon?: string) {
  if (!icon) {
    return Square3Stack3DIcon;
  }

  return iconMap[icon.toLowerCase()] ?? Square3Stack3DIcon;
}
