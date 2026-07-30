import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// This client-side app does not use ISR or cache components, so it needs no
// R2 binding. Add one here only when server-side caching is introduced.
export default defineCloudflareConfig();
