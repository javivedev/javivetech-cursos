# Cursos — sitio sincronizado con Notion

Sitio de documentación (Astro + [Starlight](https://starlight.astro.build)) cuyo contenido se escribe en Notion y se publica automáticamente en GitHub Pages.

## Cómo funciona

1. Escribes tus lecciones en la base de datos **Lessons** de tu "Teacher Dashboard" en Notion.
2. `npm run sync` descarga esas páginas, las convierte a Markdown y las guarda en `src/content/docs/<materia>/<parcial>/`.
3. `npm run build` genera el sitio estático a partir de ese Markdown.
4. GitHub Actions corre ambos pasos automáticamente (ver [Actualización automática](#actualización-automática)) y publica en GitHub Pages.

## 1. Crear la integración de Notion

1. Ve a [notion.so/my-integrations](https://www.notion.so/my-integrations) y crea una integración interna (p. ej. "Sitio de cursos").
2. Copia el **Internal Integration Secret** — ese es tu `NOTION_TOKEN`.
3. Abre la base de datos **Lessons** en Notion → menú `•••` → **Connections** → conecta la integración que acabas de crear.
4. Repite el paso 3 en la base de **Subjects** (donde vive la página de cada materia), porque el script también la lee.

Sin este paso, la API de Notion devuelve "object not found" aunque el token sea válido.

## 2. Correr en local

```bash
cp .env.example .env
```

Abre `.env` y pega tu token:

```
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Instala dependencias y sincroniza:

```bash
npm install
npm run sync
npm run dev
```

`npm run sync` borra y regenera el contenido de cada materia definida en [`config/subjects.mjs`](config/subjects.mjs), así que las lecciones que borres en Notion también desaparecen del sitio. `npm run dev` levanta el sitio en `http://localhost:4321/javivetech-cursos/`.

Antes de un build de producción real corre:

```bash
npm run sync && npm run build
```

## 3. Agregar el secret en GitHub

1. En el repo: **Settings → Secrets and variables → Actions → New repository secret**.
2. Nombre: `NOTION_TOKEN`. Valor: el mismo token del paso 1.

## 4. Activar GitHub Pages

**Settings → Pages → Source: "GitHub Actions"**. No hace falta elegir una rama; el workflow [`deploy.yml`](.github/workflows/deploy.yml) se encarga de publicar.

El sitio queda en `https://<tu-usuario>.github.io/javivetech-cursos/`. Si usas un dominio propio, cambia `SITE` y `BASE_PATH` en `config/subjects.mjs` (pon `BASE_PATH = "/"`) y `astro.config.mjs` los toma automáticamente.

## Actualización automática

El workflow se dispara por:

- **Push a `main`** (si editas el código del sitio).
- **Botón manual** (`workflow_dispatch`) desde la pestaña *Actions* del repo.
- **Cron cada hora** (`0 * * * *`), por si olvidas disparar un update manual.
- **`repository_dispatch` tipo `notion-update`** — para que una automatización de Notion fuerce una actualización inmediata en segundos en vez de esperar la hora en punto.

### Disparar un update inmediato desde una automatización de Notion

1. Crea un **fine-grained personal access token** en GitHub ([github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)) con acceso *solo* a este repositorio y el permiso **"Contents: Read and write"** (es el permiso mínimo que habilita `repository_dispatch`). Guárdalo, no lo compartas.
2. En Notion, crea una automatización (en la base Lessons) con la acción **"Send webhook"**, método `POST`, hacia:
   ```
   https://api.github.com/repos/javivedev/javivetech-cursos/dispatches
   ```
3. Headers:
   ```
   Accept: application/vnd.github+json
   Authorization: Bearer TU_TOKEN_DE_GITHUB
   ```
4. Body:
   ```json
   { "event_type": "notion-update" }
   ```

Cada vez que se dispare esa automatización (p. ej. al editar una página de Lessons), GitHub arranca el workflow de inmediato.

## 5. Agregar otra materia

1. Abre la página de la materia en Notion y copia su ID (el UUID al final de la URL, sin guiones o con guiones, cualquiera funciona).
2. Agrega una entrada en [`config/subjects.mjs`](config/subjects.mjs):
   ```js
   export const subjects = [
     { slug: "big-data", notionSubjectId: "3d696afad3f680c89582dfda78773b8e", displayName: "Big Data" },
     { slug: "mi-materia-nueva", notionSubjectId: "ID_DE_LA_PAGINA", displayName: "Mi Materia Nueva" },
   ];
   ```
3. Corre `npm run sync` (o espera al próximo push/cron). `astro.config.mjs` lee ese mismo array, así que el sidebar se actualiza solo — no hay que tocar nada más.

## Estructura del contenido generado

```
src/content/docs/<slug-materia>/
├── 1er-parcial/
├── 2do-parcial/
└── 3er-parcial/
```

Los callouts de Notion se convierten en asides de Starlight según su ícono: ℹ️ → `:::note`, 🚀 → `:::tip`, ⚠️ → `:::caution`, 🚨/❗ → `:::danger`. Las imágenes se descargan a `public/notion-images/<slug-materia>/` porque las URLs de archivos de Notion expiran.

## Comandos

| Comando           | Qué hace                                                  |
| :----------------- | :---------------------------------------------------------- |
| `npm install`       | Instala dependencias                                        |
| `npm run sync`       | Descarga y convierte el contenido de Notion                 |
| `npm run dev`        | Levanta el sitio en `http://localhost:4321/javivetech-cursos/` |
| `npm run build`      | Genera el sitio de producción en `./dist/`                  |
| `npm run preview`    | Sirve localmente el build de producción                     |
