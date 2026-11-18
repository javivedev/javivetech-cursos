---
title: "Examen práctico — Manejo Masivo de Datos"
sidebar:
  order: 1
---

## Primer parcial: análisis de sensores industriales


**Nombre:** ____________________________________


**Grupo:** __________________ **Fecha:** __________________


**Modalidad:** Individual, en computadora


**Duración:** 120 minutos


**Valor:** 40 puntos, equivalentes al 40% del parcial.


### Situación


Una empresa utiliza sensores para monitorear máquinas en cuatro plantas industriales. Cada sensor registra su temperatura y vibración una vez por minuto.


La empresa te proporciona el archivo **`sensores_industriales.csv`**, que contiene 100,000 mediciones simuladas. Tu trabajo consiste en analizarlo con Python, documentar los resultados y publicar un proyecto reproducible en GitHub.


La empresa planea ampliar el sistema a miles de sensores, recibir mediciones cada segundo e incorporar fotografías y reportes de mantenimiento.


[sensores_industriales.csv](https://prod-files-secure.s3.us-west-2.amazonaws.com/110376f1-b956-4041-87bf-b7f4cb623c40/8f3522e2-2dd0-4c6f-ab9d-49f3a33f65c0/sensores_industriales.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLY6KKS5%2F20261118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20261118T010812Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCICLenA5khbOuv%2BpSOEI6qWIA0EY%2Be9DCgOwcCkqcBICqAiEAxyhFg1llWVjMMdA12lpF92NSCbe4s1aeqihfdcpiUNkqiAQI8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCuv649VdloDiIM00CrcAzkYvQPh7vY0SWZjwG54gksPlnbucB93jhpnQ13vP68eurgfac0owtdENNwzwEiGNNFZMrGE1u3%2Fvfuf4iAKYNgNgribHVkswkT8s%2BbSEhP0V%2FwVH%2FGbbYzf6RN1VeJCF4nqesOAloijNCm2GZjR84moFQgQkjcGr%2Be7ok8j52Y8FNOyenSXom5bJ%2B6GJc4uHqCuk6yo599D%2FRczV7o%2BvoUKqvb6hHeOuYDtUBodu2VRinisaseMaJCDusnOuw9iFtRb6Ty1hVZH4SERYnbtBZved7jUJaJ8lKvMb7Vv8ZxMbzceHNaHLDKHNxMozbdwbU8WoDDrGop9KuI%2FdXoJNFlUHgrP0SdbyD75mtMfkAmoiFywJuObstuf5T8XvboA%2FrUbXTrRhSN3BmaZefpG5E9fPjgUfFrps7H7aiGd%2Fils4XJRYkepA2I52Jz9O8eVxN0tDgPCrShwMVmgmopMf7mPokti8Spia2AAfBLMGhAx9YFnR%2BcVqZ8sEstr4hdgvEI6pgp8gQzBxR8ZUDQOwg8hCQo0Y9nyTK629vu1leDorhmFSqgmfeCuZKTrC23%2Bguih%2FX2ap0YkvbFs2bbqcVYIJwwJRQ3sWgILz07SWTzM2b7qKQTaG83PYw7AMKO389cGOqUBtUUdRjZMFsYmPpRLGpJod0oWP9m6SImFHKVKNBtpDnS73Fsmx8wcta31xbtrfYPUotO19A8Y3eWgOzqLuDI%2BvNEP%2FbfoZlh9B36h%2Fnjkopb%2BU7%2BsZYvfLGK4JR6Ua3vwToU8hmqpBbkUkqYCt7NbFBQ2or0C6mt8n97swbg4lOn5vQ6i5J8jLjY5QUhhPAlUxI3nxvEDA36Jxsr5AUUcWjCgrtJZ&X-Amz-Signature=b6676718ba33919422da6ff135e51c6ad0fae9976c2424aab03fcb76b3375e6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### Descripción del archivo


| Columna          | Significado                         |
| ---------------- | ----------------------------------- |
| `id_registro`    | Identificador de la medición        |
| `fecha_hora`     | Fecha y hora de la lectura          |
| `id_sensor`      | Identificador del sensor            |
| `planta`         | Planta donde está instalado         |
| `temperatura_c`  | Temperatura en grados Celsius       |
| `vibracion_mm_s` | Vibración en milímetros por segundo |


Para este ejercicio, considera una **alerta de temperatura cuando la lectura sea mayor que 85 °C**. Este umbral es una regla didáctica del examen.


## Parte I. Proyecto y análisis práctico — 20 puntos


### 1. Configuración del proyecto — 4 puntos

- Crea un repositorio en GitHub y clónalo en tu computadora.
- Crea y activa un entorno virtual llamado `.venv`.
- Instala las bibliotecas necesarias.
- Coloca el CSV en una carpeta llamada `data`.
- Configura `.gitignore` para excluir `.venv/` y `__pycache__/`.

### 2. Análisis del CSV — 8 puntos


Crea un programa llamado `analisis.py` que lea el archivo y realice estas operaciones:


| Resultado solicitado                                                                                   | Puntos |
| ------------------------------------------------------------------------------------------------------ | ------ |
| Mostrar la cantidad de registros y de sensores distintos                                               | 1      |
| Calcular la temperatura promedio de cada planta                                                        | 2      |
| Encontrar la temperatura máxima e identificar el sensor y la fecha correspondientes                    | 1      |
| Contar las lecturas con temperatura mayor que 85 °C                                                    | 1      |
| Identificar la planta con más alertas de temperatura                                                   | 1      |
| Exportar todas las lecturas con alerta a `resultados/alertas.csv`, conservando las columnas originales | 2      |


Si hay empates, muestra todos los resultados empatados.


El programa debe calcular los resultados a partir del CSV y utilizar rutas relativas. No se aceptan resultados escritos directamente en el código.


### 3. Git y documentación — 5 puntos


Realiza al menos **cuatro commits significativos** durante el desarrollo y envíalos a GitHub.


Incluye:

- `requirements.txt` con las dependencias y sus versiones.
- `README.md` con el objetivo, la descripción de los datos y los comandos para instalar y ejecutar el proyecto.
- Una indicación de que los datos son simulados.

Si utilizas exclusivamente la biblioteca estándar de Python, explica en el README que no necesitas dependencias externas.


### 4. Reproducibilidad — 3 puntos


Clona tu repositorio en otra carpeta, crea un entorno virtual nuevo y ejecuta el programa siguiendo únicamente las instrucciones del README.


Guarda una captura de la ejecución desde esta segunda copia.


## Parte II. Aplicación al caso de Big Data — 20 puntos


Escribe tus respuestas en `informe.md`. Utiliza los resultados de tu análisis cuando corresponda.


### 5. Las 5 V aplicadas al proyecto — 5 puntos


Completa una tabla con una fila para cada V: **volumen, velocidad, variedad, veracidad y valor**.


Para cada una:

- Explica cómo se relaciona con el sistema de sensores.
- Propón un ejemplo concreto.
- Indica si el ejemplo aparece en el CSV actual o corresponde a la futura ampliación del sistema.

No atribuyas al archivo características que no contiene.


### 6. Tipos de datos y procesamiento tradicional — 3 puntos


Clasifica estos elementos como estructurados, semiestructurados o no estructurados:

- El CSV de sensores.
- Un mensaje JSON enviado por un sensor.
- Una fotografía de una máquina.
- El texto libre de un reporte de mantenimiento.

Explica también por qué **100,000 registros no convierten automáticamente al archivo en Big Data** y qué limitaciones podrían aparecer al aumentar la escala.


### 7. Batch y Streaming — 4 puntos


Tu programa analiza un archivo que ya está guardado.

- Identifica el tipo de procesamiento que realizaste y justifica.
- Explica qué enfoque utilizarías para emitir una alerta pocos segundos después de recibir una lectura mayor que 85 °C.
- Indica qué enfoque utilizarías para generar un resumen al terminar el día.

Relaciona tus decisiones con el tiempo en que se necesita cada resultado.


### 8. Lambda y Kappa — 4 puntos


Elige una arquitectura para cada escenario y justifica:


**Escenario A:** la empresa quiere combinar una ruta que recalcule el historial por lotes con otra que procese las mediciones recientes rápidamente.


**Escenario B:** la empresa quiere una sola lógica de procesamiento de eventos y conservar las mediciones para volver a procesarlas cuando sea necesario.


Representa cada propuesta con un diagrama sencillo de cajas y flechas. No necesitas implementar estas arquitecturas.


### 9. Analítica descriptiva, predictiva y prescriptiva — 4 puntos


A partir del caso:

- **Descriptiva:** escribe dos hallazgos reales de tu análisis e incluye sus valores.
- **Predictiva:** formula una pregunta sobre lo que podría ocurrir con las máquinas e indica qué datos adicionales necesitarías para investigarla.
- **Prescriptiva:** propone una acción que la empresa podría tomar ante un riesgo previsto y explica qué información revisaría antes de decidir.

Una lectura por encima del umbral indica una alerta del ejercicio; por sí sola no demuestra que una máquina vaya a fallar.


## Entrega


Entrega la URL del repositorio y asegúrate de que el docente tenga acceso.


Debe contener:

- El CSV original en `data/`.
- `analisis.py`.
- `resultados/alertas.csv`.
- `informe.md`.
- `README.md`.
- `requirements.txt`.
- `.gitignore`.
- La captura de reproducibilidad en `evidencias/`.

**Distribución:** proyecto y análisis, 20 puntos; aplicación de fundamentos de Big Data, 20 puntos. **Total: 40 puntos.**
