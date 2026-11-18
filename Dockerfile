# Imagen pensada para Dokploy (build por Dockerfile): en cada build descarga
# el contenido de Notion (npm run sync) y luego compila el sitio estático.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
# npm ci no sirve aquí: sharp tiene dependencias opcionales distintas por
# plataforma y el lockfile generado en macOS no trae las variantes de Linux.
RUN npm install

COPY . .

# Variables necesarias en build-time (configúralas en Dokploy, no las commitees).
ARG NOTION_TOKEN
ARG SITE_URL
ARG BASE_PATH=/
ENV NOTION_TOKEN=$NOTION_TOKEN
ENV SITE_URL=$SITE_URL
ENV BASE_PATH=$BASE_PATH

RUN npm run sync && npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
