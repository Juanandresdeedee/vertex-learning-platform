import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-7 text-neutral-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 text-xl font-semibold text-neutral-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 text-lg font-semibold text-neutral-950">
        {children}
      </h3>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 list-disc space-y-2 text-sm leading-7 text-neutral-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-2 text-sm leading-7 text-neutral-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};