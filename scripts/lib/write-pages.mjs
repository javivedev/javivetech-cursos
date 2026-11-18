import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parcialFolder(parcial) {
  return parcial ? slugify(parcial) : "sin-parcial";
}

/**
 * Borra el contenido generado previamente de una materia, para que las
 * lecciones eliminadas en Notion desaparezcan del sitio en la próxima build.
 */
export async function cleanSubjectContent({ docsDir, publicDir, subjectSlug }) {
  await rm(path.join(docsDir, subjectSlug), { recursive: true, force: true });
  await rm(path.join(publicDir, "notion-images", subjectSlug), {
    recursive: true,
    force: true,
  });
}

/**
 * Escribe las páginas markdown de una materia, agrupadas por carpeta de Parcial.
 * @param {{
 *   docsDir: string,
 *   subjectSlug: string,
 *   subjectTitle: string,
 *   lessons: Array<{id: string, title: string, parcial: string|null}>,
 *   markdownByLessonId: Map<string, string>,
 * }} args
 */
export async function writeSubjectPages({
  docsDir,
  subjectSlug,
  subjectTitle,
  lessons,
  markdownByLessonId,
}) {
  const orderByFolder = new Map();
  const subjectDir = path.join(docsDir, subjectSlug);
  await mkdir(subjectDir, { recursive: true });

  // Página de aterrizaje estable de la materia (ej. /big-data/), independiente
  // de qué lecciones existan, para poder enlazarla desde otras páginas.
  const overview = [
    "---",
    `title: ${JSON.stringify(subjectTitle)}`,
    "---",
    "",
    "Elige un tema en la barra lateral para empezar.",
  ].join("\n");
  await writeFile(path.join(subjectDir, "index.md"), `${overview}\n`);

  for (const lesson of lessons) {
    const folder = parcialFolder(lesson.parcial);
    const order = (orderByFolder.get(folder) ?? 0) + 1;
    orderByFolder.set(folder, order);

    const targetDir = path.join(subjectDir, folder);
    await mkdir(targetDir, { recursive: true });

    const fileSlug = slugify(lesson.title) || lesson.id;
    const body = markdownByLessonId.get(lesson.id) ?? "";
    const frontmatter = [
      "---",
      `title: ${JSON.stringify(lesson.title)}`,
      "sidebar:",
      `  order: ${order}`,
      "---",
    ].join("\n");

    await writeFile(path.join(targetDir, `${fileSlug}.md`), `${frontmatter}\n\n${body}\n`);
  }
}
