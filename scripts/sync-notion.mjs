import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { subjects, COURSES_BASE } from "../config/subjects.mjs";
import { createNotionClient } from "./lib/notion-client.mjs";
import { queryLessonsForSubject } from "./lib/query-lessons.mjs";
import { createConverter, convertLessonToMarkdown } from "./lib/markdown-transform.mjs";
import { cleanSubjectContent, writeSubjectPages } from "./lib/write-pages.mjs";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const docsDir = path.join(rootDir, "src/content/docs");
const publicDir = path.join(rootDir, "public");

async function syncSubject(notion, subject) {
  const label = subject.displayName ?? subject.slug;
  const docsSlug = `${COURSES_BASE}/${subject.slug}`;
  console.log(`\nSincronizando "${label}"...`);

  const lessons = await queryLessonsForSubject(notion, subject.notionSubjectId);
  console.log(`  ${lessons.length} lección(es) encontrada(s).`);

  await cleanSubjectContent({ docsDir, publicDir, docsSlug, subjectSlug: subject.slug });

  const converter = createConverter(notion, { subjectSlug: subject.slug, publicDir });
  const markdownByLessonId = new Map();

  for (const lesson of lessons) {
    console.log(`  - ${lesson.title}`);
    const markdown = await convertLessonToMarkdown(converter, lesson.id);
    markdownByLessonId.set(lesson.id, markdown);
  }

  await writeSubjectPages({
    docsDir,
    docsSlug,
    subjectTitle: label,
    subjectDescription: subject.description,
    lessons,
    markdownByLessonId,
  });
}

async function main() {
  const notion = createNotionClient();

  for (const subject of subjects) {
    await syncSubject(notion, subject);
  }

  console.log("\nSincronización completa.");
}

main().catch((error) => {
  console.error("\nError al sincronizar con Notion:", error);
  process.exitCode = 1;
});
