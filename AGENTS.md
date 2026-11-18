# Cómo correr este proyecto en local

**Una sola forma de verlo, siempre — con Docker:**

```bash
docker compose up --build
```

Luego ábrelo en: **http://localhost:8080/**

Eso es todo. No hace falta nada más (no `npm install`, no `npm run dev`, no pasar `BASE_PATH` a mano). El contenedor hace `npm run sync` + `npm run build` adentro con tu `NOTION_TOKEN` del `.env`, y sirve el resultado con nginx en el puerto 8080 — es exactamente lo mismo que correrá en el VPS con Dokploy, solo que en tu máquina.

## Comandos del día a día

| Quiero...                                   | Comando                        |
| -------------------------------------------- | ------------------------------- |
| Ver el sitio (con lo último de Notion)       | `docker compose up --build`     |
| Apagarlo                                     | `docker compose down`           |
| Ver los logs sin reconstruir                 | `docker compose up`             |

## Por qué NO usar `npm run dev` / `npm run preview` para ver el sitio

Ese flujo usa el `base path` de GitHub Pages por default (`/javivetech-cursos`), así que las URLs no coinciden con las de Docker/producción y terminas con 404 falsos. Para agentes e IAs trabajando en este repo: **siempre verifica cambios visuales con Docker** (`docker compose up --build` + `http://localhost:8080/`), no con `npm run dev`.

`npm run sync` / `npm run build` directos (sin Docker) solo tienen sentido si estás editando el script de sincronización mismo y quieres iterar rápido sin esperar el build de la imagen — no para "ver el sitio".
