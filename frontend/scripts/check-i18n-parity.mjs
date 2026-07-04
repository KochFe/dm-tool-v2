import { readFileSync } from "node:fs";

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

const load = (locale) =>
  new Set(flatten(JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"))));

const en = load("en");
const de = load("de");
const onlyEn = [...en].filter((k) => !de.has(k));
const onlyDe = [...de].filter((k) => !en.has(k));

if (onlyEn.length > 0 || onlyDe.length > 0) {
  console.error("i18n parity check FAILED");
  if (onlyEn.length > 0) console.error("  missing in de.json:", onlyEn.join(", "));
  if (onlyDe.length > 0) console.error("  missing in en.json:", onlyDe.join(", "));
  process.exit(1);
}
console.log(`i18n parity OK (${en.size} keys)`);
