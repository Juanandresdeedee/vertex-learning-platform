"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { BellIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/Button";

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

export function NavAuthActions() {
  const { isLoaded, isSignedIn, user } = useUser();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isPostHogConfigured || !isLoaded) return;

    if (!isSignedIn || !user) {
      if (identifiedUserId.current) {
        posthog.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === user.id) return;

    if (identifiedUserId.current) {
      posthog.reset();
    }

    posthog.identify(user.id, {
      email: user.primaryEmailAddress?.emailAddress,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
    });
    identifiedUserId.current = user.id;
  }, [isLoaded, isSignedIn, user]);

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
            <Button
              variant="tertiary"
              size="md"
              showVariantIcon={false}
              onClick={() => {
                if (isPostHogConfigured) posthog.capture("sign_in_started");
              }}
            >
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="redirect" forceRedirectUrl="/">
            <Button
              variant="primary"
              size="md"
              showVariantIcon={false}
              onClick={() => {
                if (isPostHogConfigured) posthog.capture("sign_up_started");
              }}
            >
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
