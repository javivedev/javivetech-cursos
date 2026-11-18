---
title: "Docker Python"
sidebar:
  order: 3
---

Dockerfile 


```c#
FROM python:3.12-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Instala las dependencias primero para aprovechar la cache de capas de Docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia los archivos de la aplicación al contenedor
COPY . /app

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
```



`docker build -t docker-python .`

`docker run --rm -p 5001:5001 --env-file .env docker-python`


docker-compose.yml


```c#
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: db
    volumes:
      - ./database_students.sql:/docker-entrypoint-initdb.d/database_students.sql
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  pythonapp:
    build: .
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "5001:5001"
    volumes:
      - .:/app
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: db

volumes:
  postgres_data:
```


Primera vez que construyes el contenedor:


```docker
docker-compose up --build
```


Siguientes veces:


```docker
docker-compose up
```


Parar los servicios:


```docker
docker-compose stop
```
