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


[sensores_industriales.csv](https://prod-files-secure.s3.us-west-2.amazonaws.com/110376f1-b956-4041-87bf-b7f4cb623c40/8f3522e2-2dd0-4c6f-ab9d-49f3a33f65c0/sensores_industriales.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5SVQWX5%2F20261118%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20261118T020820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECkaCXVzLXdlc3QtMiJIMEYCIQDLfT0%2FAJzKtjCiHNS4xOKkbPd4M9LbnEhHWvJD1m6EdAIhALvy0hXTFifeGhQIElf6vXk3iTG5nzgskxQVWd4FwTcnKogECPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz3z4VqVwxkQaqAhZoq3ANpvrSC60G6T%2Bvba%2BoDrjAdxL9dZWNQe%2FHJalLeONPewpwuc%2BI9jhCddYcxORMD9XUR4rXB8YUmMc0XF9H1KTRQmOSJUt1wgm%2Bk%2BE%2Fvcx2WxXsZtT%2FiP86Atvh1Z2gysfMVJszB9NjA6AZaafHuaV4BD9%2FNfUeE9t7I4jDg9OkTWKLtAs8jmyM5Tc3uLFcapeZVNbAoqRKUW94Qw7NSpGcFNdrJ0d86qGsPcpdc70BZ2ywtK2alAol4Y9R8M%2Bds5jEEd6ukd44Ig6qNkOMOmUwpgGYwktfNE2GwHxZiYX9hkS9MxjIXc9peuefdCnPm09wvghrVG3QL610XOafgW5TxHsg02V1Hwm7%2BNidNh1MM1Bh8jQYtN0911%2B5E7VVfSaK0C93AOux6sUeRiwZPCWhIFRfAoQpy%2FrgLay4gG85YYgdlP1RSbuCYJujm0UCrKzw9c9dvjbFJGdqKF6Z8g3JS%2FPB7%2Bx4RcPK%2FT4X93M8wQB4RFNlZapq27gXF9Jg2rYx98ob0KK9m7OsA%2BHDvJugWJValjiH%2BDWnUuAVCsao%2FZ5z8Bbgr1zHbKCUaYWVnNchxdVQOawkUpqOuz2yD6OVjxskx7V3zeUI8JAEzDspj%2Fu%2FgKoLn2VVcbeMorzDU%2BPPXBjqkAQcfVjXn7hmujSpoDUzOqBPfiVJON%2Fmxx%2Fo38XDnIyWrGLBVpo1TWw12WLcCoUoPInkSPX9ZXGWMxI1%2FuJN9am0sFOo8zlZuQ3Orsz%2BSj4QtFNwXYBm5pH7YrzKBuDUr4GOf67PFAywQIFETf9eTYQ4msOT7eB1LxKlph4VhDSK500cu6xtNUkT7knCMK7WzJSZc00VQSgbHQU1eevxZjB%2FfBPOk&X-Amz-Signature=b872fd0a4a39b1a1422ea9737d2310f1ec73fd95f6b2aab31f07ad67780424e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
