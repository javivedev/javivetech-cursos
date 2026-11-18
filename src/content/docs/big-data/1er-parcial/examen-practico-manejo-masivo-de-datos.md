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


[sensores_industriales.csv](https://prod-files-secure.s3.us-west-2.amazonaws.com/110376f1-b956-4041-87bf-b7f4cb623c40/8f3522e2-2dd0-4c6f-ab9d-49f3a33f65c0/sensores_industriales.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKJVOOPY%2F20261118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20261118T013803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIFDos5ApvZWCWQ0AOG1rCl1Lle3x8GHEK2GK8g5Azve4AiBdFZiHtRehYTnejZd%2BjTvkzg%2FzT0qyVjSxSodtg9pcUCqIBAjy%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZEqwS9iyM5TiH4dlKtwDuvzVsFxynHi8nXz1v2hHXjW3diWZm%2F8nMxXRgIwtalo4CVWG83BgWUj088aHOK%2BGwK1%2FtN6Ro8DiescmlcyDAKDnmEEjOJ3Htn1UsbQjZWdTd8wElXbn4sX6rB0iv1mQbPrpSSciM%2Bb0zpuj3pSs1irgMHbNhNeRKlbKfwmcMWk6OQPoZa%2FDrSBqKP09YRG2IFprBv%2FpbMzX8MbBNbeRww4YVCrN29uB4cKXFNByafnBRq4a5nO5wgcDSCWZSmSe6BfS%2BCqM5evw96dFYSL4BM0SugGk5q0672GZEsZsDm2KzWgDkk%2FkZuqPhjhaTxxBD%2FNdFi5YFmY0kJC6GMT7R0GqnpW%2BlLdxdDoLgxkmHByz2WOZVHQgCWLD0d4RV8Jfpfyk7ukq5vv2Q3a29LRPXzXooUPs7pG0pMIlUQqO%2B2Raz2ayel00zskXQDgOZawsZgRglQPucSIwisPVGcL7eqpBN86ry1URwyJ5f3AL7qT88GnxHzwoL5bTZpebgvb9OZAsI%2B5o%2F1MwVbokML%2FQ8%2BQEOsb2weOWwx2meh334ergY%2B3uoqalxcAIOEpez8nVq%2B%2FJT7Fa5Ids48eMMQ14WwS%2BO9H0R2%2FeEstXh8tN8kCP6ENIiwpvtrXF9Gswxvrz1wY6pgGnqqDVihGjqDOmbgPUNMs5w8iPOLpL4%2Bc4eyHajO2YZfMaGBKbzvzBrBcCxoOPs0l2XSWh%2FbsxCI8VKCI1t14rcQBJ0PZikHdiHm%2B1XcuQw3wLEVfCnfFpbwDvwIQ%2BnsjzcbCgtzpXTucYb5uVfrJY%2B2QJCQf4LSymahFx3F32IUg7WROhVeNFRH7JjHCWRfKHrqtJqCuu3a0o0pVcv6mDHAytlFO7&X-Amz-Signature=ba72df207793994a22273c11ab16516ae17860743a57fba2cf4f78d14149cf90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
