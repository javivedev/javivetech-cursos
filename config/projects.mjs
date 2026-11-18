// Proyectos profesionales mostrados en "/proyectos" y como destacado en la
// home. Para agregar uno nuevo: añade una entrada aquí, nada más.
//
// `liveUrl`/`repoUrl` en null no se inventan — el componente de tarjeta
// simplemente no muestra ese botón hasta que los completes. `repoUrl` solo
// debe llenarse si el repositorio es público.

/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {string[]} tech
 * @property {string|null} liveUrl
 * @property {string|null} repoUrl
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "grades-ai",
    name: "Grades AI",
    description:
      "Plataforma web para la evaluación académica por competencias, integrada con Google Classroom y herramientas de analítica educativa e inteligencia artificial.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Docker", "Machine Learning"],
    // TODO: completar cuando el proyecto esté público / tenga demo en vivo.
    liveUrl: null,
    repoUrl: null,
  },
];
