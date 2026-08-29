import type { ComponentType, SVGProps } from "react";
import {
  CloudIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CircleStackIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  layers: Square3Stack3DIcon,
  database: CircleStackIcon,
  cylinder: CircleStackIcon,
  gauge: CpuChipIcon,
  cloud: CloudIcon,
  shield: ShieldCheckIcon,
  code: CodeBracketIcon,
  sparkles: SparklesIcon,
  puzzle: PuzzlePieceIcon,
};

export function getLearningOutcomeIcon(icon?: string) {
  if (!icon) {
    return Square3Stack3DIcon;
  }

  return iconMap[icon.toLowerCase()] ?? Square3Stack3DIcon;
}
