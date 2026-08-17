import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Absolute path of this package's root (lib/ sits one level under it).
const PACKAGE_ROOT = fileURLToPath(new URL("..", import.meta.url));
const SKILLS_ROOT = join(PACKAGE_ROOT, "skills");

/**
 * Parse a DSH SKILL.md into its frontmatter map and markdown body.
 * Supports only single-line `key: value` scalar frontmatter, which is all
 * this package's bundled skills use.
 */
function parseSkillFile(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) return { data: {}, content: text };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) data[key] = value;
  }
  return { data, content: match[2] };
}

/** Hard dependency: the skill registry provided by @deepseek-ai/dsh-skill. */
export const inject = ["skills"];

export function apply(ctx) {
  const names = readdirSync(SKILLS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  ctx.effect(() => {
    const disposers = [];
    for (const name of names) {
      const skillDir = join(SKILLS_ROOT, name);
      const skillFile = join(skillDir, "SKILL.md");
      let text;
      try {
        text = readFileSync(skillFile, "utf8");
      } catch (error) {
        ctx.logger?.warn?.(`dsh-specify: cannot read ${skillFile}: ${error.message}`);
        continue;
      }
      const { data, content } = parseSkillFile(text);
      if (typeof data.name !== "string" || typeof data.description !== "string") {
        ctx.logger?.warn?.(`dsh-specify: ${skillFile} is missing name/description frontmatter`);
        continue;
      }
      disposers.push(ctx.skills.register({
        name: data.name,
        description: data.description,
        ...(typeof data.whenToUse === "string" ? { whenToUse: data.whenToUse } : {}),
        content,
        // Required by the registry's SkillDefinition contract: without it the
        // loader rejects the skill with `loaded skill "…" source must be a string`.
        source: "bundled",
        // All bundled skills share the same base so `references/…` and
        // `scripts/…` resolve for every granular command.
        resourceBase: { kind: "directory", path: SKILLS_ROOT }
      }));
    }
    return () => {
      for (const dispose of disposers) dispose();
    };
  });
}
