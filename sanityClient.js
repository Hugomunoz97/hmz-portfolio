import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "isev05v8",
    dataset: "production",
    apiVersion: "2026-04-11",
    useCdn: true,
});