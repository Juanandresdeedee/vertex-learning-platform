import "server-only";

export function getSanityReadToken(): string | undefined {
  return process.env.SANITY_API_READ_TOKEN;
}
