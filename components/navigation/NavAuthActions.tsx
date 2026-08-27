"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { BellIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

export function NavAuthActions() {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Notifications"
        className="rounded-sm p-1 text-neutral-700 transition-colors hover:text-neutral-900"
      >
        <BellIcon className="h-6 w-6" strokeWidth={2} />
      </button>

      <Show when="signed-out">
        <div className="flex items-center gap-2">
          <SignInButton mode="redirect" forceRedirectUrl="/">
            <Button variant="tertiary" size="md" showVariantIcon={false}>
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="redirect" forceRedirectUrl="/">
            <Button variant="primary" size="md" showVariantIcon={false}>
              Sign up
            </Button>
          </SignUpButton>
        </div>
      </Show>

      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      </Show>
    </div>
  );
}
