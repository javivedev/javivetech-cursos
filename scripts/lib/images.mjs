import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { BASE_PATH } from "../../config/subjects.mjs";

const EXT_BY_CONTENT_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

function guessExtension(url, contentType) {
  const fromContentType = EXT_BY_CONTENT_TYPE[contentType?.split(";")[0]?.trim()];
  if (fromContentType) return fromContentType;

  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : "png";
}

/**
 * Descarga una imagen de Notion (URL firmada, expira) a public/notion-images/<slug>/
 * y devuelve la ruta pública con la que debe referenciarse en el markdown.
 */
export async function downloadNotionImage({ url, subjectSlug, blockId, publicDir }) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo descargar la imagen ${url}: HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  const ext = guessExtension(url, contentType);
  const fileName = `${blockId}.${ext}`;

  const targetDir = path.join(publicDir, "notion-images", subjectSlug);
  await mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(targetDir, fileName), buffer);

  const base = BASE_PATH === "/" ? "" : BASE_PATH;
  return `${base}/notion-images/${subjectSlug}/${fileName}`;
}
