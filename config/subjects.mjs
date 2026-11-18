// Config central de materias. Para agregar una materia nueva:
// 1. Agrega una entrada al array `subjects` con su slug y el ID de su página de Notion.
// 2. Corre `npm run sync`.
// `astro.config.mjs` lee este mismo archivo para generar el sidebar, así que no hay que tocar nada más.

// GitHub Pages de este repo (sitio de proyecto, no de usuario/org).
// Si luego usas un dominio propio, cambia SITE a ese dominio y BASE_PATH a "/".
export const SITE = "https://javivedev.github.io";
export const BASE_PATH = "/javivetech-cursos";

export const LESSONS_DATABASE_ID = "cf331a7da0eb499ba3126a6240c909ab";

// OJO: el nombre de esta propiedad empieza con un espacio en Notion.
export const SUBJECT_RELATION_PROPERTY = " 📚Subject";
export const PARCIAL_PROPERTY = "Parcial";

// Orden en el que deben aparecer los parciales en el sidebar.
export const PARCIAL_ORDER = ["1er Parcial", "2do Parcial", "3er Parcial"];

/**
 * @typedef {Object} Subject
 * @property {string} slug - usado para la carpeta de contenido y la URL (ej. "big-data")
 * @property {string} notionSubjectId - ID de la página de Notion de la materia (en la base "Subjects")
 * @property {string} [displayName] - nombre mostrado en el sidebar; si se omite se usa el título de la página de Notion
 */

/** @type {Subject[]} */
export const subjects = [
  {
    slug: "big-data",
    notionSubjectId: "3d696afad3f680c89582dfda78773b8e",
    displayName: "Big Data",
  },
];
