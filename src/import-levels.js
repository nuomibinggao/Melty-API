import { indieLevels, plcrLevels, comingSoonLevel } from "../../Melty-Pages/levels.js";

// Use the Cloudflare D1 REST API or a local Node client
// This is for single use/debug
// Example: Using fetch with your Worker API if you have /upload-level endpoint
async function uploadLevels(levels) {
  for (const level of levels) {
    await fetch("https://melty-api.sicheng-guide.workers.dev/upload-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(level)
    });
  }
}

const allLevels = [
  { ...comingSoonLevel, category: "coming-soon" },
  ...indieLevels.map(l => ({ ...l, category: "indie" })),
  ...plcrLevels.map(l => ({ ...l, category: "plcr" }))
];

uploadLevels(allLevels).then(() => console.log("Levels uploaded!"));
