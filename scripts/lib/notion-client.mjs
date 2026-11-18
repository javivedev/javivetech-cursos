import notionhq from "@notionhq/client";
const { Client } = notionhq;
import { LESSONS_DATABASE_ID } from "../../config/subjects.mjs";

export function createNotionClient() {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new Error(
      "Falta la variable de entorno NOTION_TOKEN. Define un .env en local o el secret NOTION_TOKEN en GitHub Actions."
    );
  }
  return new Client({ auth: token });
}

let cachedDataSourceId = null;

/**
 * Las bases de datos de Notion ahora exponen uno o más "data sources".
 * Para consultar filas hay que resolver primero el data_source_id de la base Lessons.
 */
export async function getLessonsDataSourceId(notion) {
  if (cachedDataSourceId) return cachedDataSourceId;

  const database = await notion.databases.retrieve({
    database_id: LESSONS_DATABASE_ID,
  });

  const dataSource = database.data_sources?.[0];
  if (!dataSource) {
    throw new Error(
      `La base de datos Lessons (${LESSONS_DATABASE_ID}) no devolvió ningún data source.`
    );
  }

  cachedDataSourceId = dataSource.id;
  return cachedDataSourceId;
}
