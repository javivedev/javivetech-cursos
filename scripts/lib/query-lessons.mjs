import {
  SUBJECT_RELATION_PROPERTY,
  PARCIAL_PROPERTY,
} from "../../config/subjects.mjs";
import { getLessonsDataSourceId } from "./notion-client.mjs";

function getTitle(page) {
  const titleProp = Object.values(page.properties).find(
    (prop) => prop.type === "title"
  );
  return (titleProp?.title ?? []).map((t) => t.plain_text).join("").trim();
}

/**
 * Consulta todas las lecciones de Lessons cuya relación " 📚Subject" incluya
 * la página de materia dada. Maneja paginación.
 * @returns {Promise<Array<{id: string, title: string, parcial: string|null}>>}
 */
export async function queryLessonsForSubject(notion, subjectPageId) {
  const dataSourceId = await getLessonsDataSourceId(notion);
  const lessons = [];
  let cursor;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      filter: {
        property: SUBJECT_RELATION_PROPERTY,
        relation: { contains: subjectPageId },
      },
    });

    for (const page of response.results) {
      if (!("properties" in page)) continue;
      const parcial = page.properties[PARCIAL_PROPERTY]?.select?.name ?? null;
      lessons.push({
        id: page.id,
        title: getTitle(page) || "Sin título",
        parcial,
      });
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return lessons;
}
