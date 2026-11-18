// Datos del sitio profesional. Un solo lugar para nombre, bio, navegación,
// tecnologías y contacto — así Header.astro y las páginas de portafolio no
// tienen texto hardcodeado repetido.

export const SITE_TITLE = "Javier | Software Engineer & Educator";
export const SITE_DESCRIPTION =
  "Sitio profesional de Javier. Proyectos de desarrollo de software, ingeniería de datos, inteligencia artificial y recursos educativos gratuitos.";

export const PROFILE = {
  brand: "Javier.",
  name: "Javier Moya",
  aliases: "Javier, Javi o Javive",
  role: "Software Engineer · Data Engineer · Educator",
  heroDescription:
    "Soy ingeniero en Sistemas Computacionales, desarrollador de software y profesor universitario. Me interesa construir soluciones tecnológicas, trabajar con datos y compartir conocimientos sobre ingeniería de software, inteligencia artificial y tecnologías modernas.",
};

// Items del nav del header. `href` es relativo a la raíz del sitio (sin el
// BASE_PATH, Astro/Starlight lo resuelve solo).
export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi/" },
  { label: "Proyectos", href: "/proyectos/" },
  { label: "Cursos", href: "/cursos/" },
  { label: "Contacto", href: "/contacto/" },
];

export const ABOUT = {
  education: [
    "Ingeniero en Sistemas Computacionales.",
    "Estudios de Maestría en Ingeniería en Sistemas Productivos e Industria 4.0.",
  ],
  experience: [
    "Experiencia en desarrollo de software dentro del sector bancario.",
    "Desarrollo de aplicaciones web y soluciones tecnológicas.",
    "Experiencia en docencia universitaria.",
    "Investigación aplicada en inteligencia artificial y analítica educativa.",
  ],
  interests: [
    "Software Engineering",
    "Backend Development",
    "Data Engineering",
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "High Performance Computing",
  ],
};

/**
 * @typedef {Object} Tech
 * @property {string} name
 * @property {string} [icon] - nombre de ícono de `@astrojs/starlight/components` Icon (seti:* para lenguajes/herramientas). Se omite si no existe uno real.
 */

/** @type {{ category: string, items: Tech[] }[]} */
export const TECH_STACK = [
  {
    category: "Lenguajes",
    items: [
      { name: "Python", icon: "seti:python" },
      { name: "TypeScript", icon: "seti:typescript" },
      { name: "JavaScript", icon: "seti:javascript" },
      { name: "SQL", icon: "seti:db" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI" },
      { name: "Django" },
      { name: "Laravel", icon: "seti:php" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "seti:react" },
      { name: "Next.js" },
      { name: "Astro", icon: "astro" },
    ],
  },
  {
    category: "Datos e IA",
    items: [
      { name: "PostgreSQL", icon: "seti:db" },
      { name: "scikit-learn" },
      { name: "PyTorch" },
    ],
  },
  {
    category: "Infraestructura",
    items: [
      { name: "Docker", icon: "seti:docker" },
      { name: "Git", icon: "seti:git" },
      { name: "GitHub", icon: "github" },
      { name: "Linux", icon: "linux" },
      { name: "Cloudflare", icon: "cloudflare" },
    ],
  },
];

// TODO: completar linkedin y email cuando los tengas a la mano — mientras
// estén en null, los componentes de contacto simplemente no muestran ese botón.
export const CONTACT = {
  github: "https://github.com/javivedev",
  linkedin: null,
  email: null,
};
