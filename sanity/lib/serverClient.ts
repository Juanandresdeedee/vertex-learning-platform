import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { getSanityReadToken } from "./token";

export function getServerClient() {
  const token = getSanityReadToken();

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
