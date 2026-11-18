// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { subjects, SITE, BASE_PATH, COURSES_BASE } from './config/subjects.mjs';
import { SITE_DESCRIPTION } from './config/profile.mjs';

// Un grupo de sidebar por materia, generado desde config/subjects.mjs.
// Agregar una materia ahí es suficiente para que aparezca aquí también.
const subjectSidebarGroups = subjects.map((subject) => ({
	label: subject.displayName ?? subject.slug,
	items: [{ autogenerate: { directory: `${COURSES_BASE}/${subject.slug}` } }],
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
			title: 'Javier.',
			description: SITE_DESCRIPTION,
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/javivedev' }],
			sidebar: subjectSidebarGroups,
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/Header.astro',
			},
		}),
	],
});
