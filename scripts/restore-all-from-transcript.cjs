const fs = require("fs");
const path = require("path");

const TRANSCRIPT =
  "C:/Users/Kurou/.cursor/projects/c-Users-Kurou-Desktop-Khazina-MVP/agent-transcripts/9cf28f43-8a83-444b-9398-71d764376e5f/9cf28f43-8a83-444b-9398-71d764376e5f.jsonl";
const OUT_ROOT = "C:/Users/Kurou/Desktop/Khazina-MVP";

function normalizeWritePath(rawPath) {
  if (!rawPath || typeof rawPath !== "string") return null;
  let p = rawPath.replace(/\\/g, "/");
  const marker = "Khazina-MVP/";
  const idx = p.toLowerCase().indexOf(marker.toLowerCase());
  if (idx !== -1) p = p.slice(idx + marker.length);
  return p.replace(/^\/+/, "");
}

function replayAll() {
  const state = new Map();
  const lines = fs.readFileSync(TRANSCRIPT, "utf8").split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }

    const content = record?.message?.content;
    if (!Array.isArray(content)) continue;

    for (const item of content) {
      if (item?.type !== "tool_use") continue;
      const rel = normalizeWritePath(item?.input?.path);
      if (!rel || !rel.startsWith("src/")) continue;

      if (item.name === "Write" && typeof item.input?.contents === "string") {
        state.set(rel, item.input.contents);
        continue;
      }

      if (item.name === "StrReplace") {
        const current = state.get(rel);
        if (current === undefined) continue;
        const { old_string: oldStr, new_string: newStr, replace_all: replaceAll } = item.input || {};
        if (typeof oldStr !== "string" || typeof newStr !== "string") continue;
        if (replaceAll) state.set(rel, current.split(oldStr).join(newStr));
        else if (current.includes(oldStr)) state.set(rel, current.replace(oldStr, newStr));
      }
    }
  }

  const restored = [];
  for (const [rel, contents] of state) {
    const outPath = path.join(OUT_ROOT, rel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, contents, "utf8");
    restored.push(rel);
  }

  console.log(JSON.stringify({ count: restored.length, files: restored.sort() }, null, 2));
}

replayAll();
