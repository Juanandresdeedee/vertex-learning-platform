import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowTopRightOnSquareIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-primary-500 text-white hover:bg-primary-400 disabled:bg-primary-200 disabled:text-white disabled:cursor-not-allowed",
  secondary:
    "border border-primary-500 bg-white text-primary-500 hover:bg-primary-100 disabled:border-primary-200 disabled:text-primary-200 disabled:cursor-not-allowed",
  tertiary:
    "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-300 disabled:cursor-not-allowed",
  text: "border border-transparent bg-transparent text-primary-500 hover:text-primary-400 disabled:text-primary-200 disabled:cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "h-11 px-3 text-sm",
  lg: "h-11 px-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {variant === "tertiary" && (
        <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
      )}
      {variant === "text" && (
        <PlayCircleIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
      )}
      {children}
    </button>
  );
}
