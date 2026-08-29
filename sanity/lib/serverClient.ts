import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { getSanityReadToken } from "./token";

export function getServerClient() {
  const token = getSanityReadToken();

  if (!token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN. Add a Viewer token from sanity.io/manage to .env.local.",
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
