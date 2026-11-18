// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { subjects, SITE, BASE_PATH } from './config/subjects.mjs';

// Un grupo de sidebar por materia, generado desde config/subjects.mjs.
// Agregar una materia ahí es suficiente para que aparezca aquí también.
const subjectSidebarGroups = subjects.map((subject) => ({
	label: subject.displayName ?? subject.slug,
	items: [{ autogenerate: { directory: subject.slug } }],
}));

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE_PATH,
	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true,
		}),
		starlight({
			title: 'Cursos',
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/javivedev/javivetech-cursos' }],
			sidebar: subjectSidebarGroups,
		}),
	],
});
