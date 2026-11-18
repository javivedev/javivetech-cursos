import { NotionToMarkdown } from "notion-to-md";
import { downloadNotionImage } from "./images.mjs";

const ASIDE_BY_EMOJI = {
  "ℹ️": "note",
  "🚀": "tip",
  "⚠️": "caution",
  "🚨": "danger",
  "❗": "danger",
};

const PURE_BOLD_LINE = /^\*\*[^*]+\*\*$/;

async function listAllChildren(notion, blockId) {
  const blocks = [];
  let cursor;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    blocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);
  return blocks;
}

function richTextToMarkdown(n2m, richText = []) {
  return richText
    .map((run) => {
      let text = n2m.annotatePlainText(run.plain_text, run.annotations);
      if (run.href) text = `[${text}](${run.href})`;
      return text;
    })
    .join("");
}

/**
 * Crea una instancia de NotionToMarkdown con transformers personalizados
 * (callouts -> asides de Starlight, imágenes -> descarga local) para una materia.
 */
export function createConverter(notion, { subjectSlug, publicDir }) {
  const n2m = new NotionToMarkdown({ notionClient: notion });

  n2m.setCustomTransformer("callout", async (block) => {
    const callout = block.callout;
    const asideType = ASIDE_BY_EMOJI[callout.icon?.emoji] ?? "note";

    let directText = richTextToMarkdown(n2m, callout.rich_text).trim();
    if (PURE_BOLD_LINE.test(directText)) {
      // Starlight ya muestra el título del aside; evitamos duplicarlo.
      directText = "";
    }

    let childrenMarkdown = "";
    if (block.has_children) {
      const children = await listAllChildren(notion, block.id);
      const mdBlocks = await n2m.blocksToMarkdown(children);
      childrenMarkdown = n2m.toMarkdownString(mdBlocks).parent?.trim() ?? "";
    }

    const body = [directText, childrenMarkdown].filter(Boolean).join("\n\n");
    return `:::${asideType}\n${body}\n:::\n`;
  });

  n2m.setCustomTransformer("image", async (block) => {
    const image = block.image;
    const caption = richTextToMarkdown(n2m, image.caption) || "image";

    if (image.type === "external") {
      // URL externa (no expira): se deja tal cual.
      return `![${caption}](${image.external.url})`;
    }

    const localSrc = await downloadNotionImage({
      url: image.file.url,
      subjectSlug,
      blockId: block.id,
      publicDir,
    });
    return `![${caption}](${localSrc})`;
  });

  return n2m;
}

/**
 * Convierte una página de Notion (lección) a una cadena de markdown.
 */
export async function convertLessonToMarkdown(n2m, pageId) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const { parent = "" } = n2m.toMarkdownString(mdBlocks);
  return parent.trim();
}
