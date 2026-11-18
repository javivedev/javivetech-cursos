---
title: "Proyecto y exposición — Unidad I: Fundamentos de Big Data"
sidebar:
  order: 2
---

**Materia:** Manejo Masivo de Datos / Big Data


**Cuatrimestre:** 4.º


**Unidad:** I. Fundamentos de Big Data


**Modalidad:** Equipos


**Actividad:** Exposición + práctica/proyecto + demostración


## 🎯 Objetivo de la actividad


Investigar, comprender y explicar uno de los temas fundamentales de Big Data mediante una **exposición técnica acompañada de una práctica o proyecto demostrativo**.


El objetivo no es únicamente presentar información. Cada equipo deberá demostrar el funcionamiento, aplicación o utilidad de su tema mediante un caso práctico utilizando datos, herramientas de software, código, diagramas o simulaciones.


---

1. **Big Data y las 5 V’s**
2. **Big Data vs. procesamiento tradicional de datos**
3. **Fuentes y tipos de datos en Big Data**
4. **Procesamiento Batch vs. Streaming**
5. **Arquitectura Lambda**
6. **Arquitectura Kappa**
7. **Arquitectura Lambda vs. Kappa**
8. **Analítica descriptiva: ¿qué ocurrió?**
9. **Analítica predictiva: ¿qué podría ocurrir?**
10. **Analítica prescriptiva: ¿qué debería hacerse?**

---


# Temas


## 1. Big Data y las 5 V's


### Exposición


Investigar y explicar:

- ¿Qué es Big Data?
- ¿Por qué surge la necesidad de Big Data?
- Volumen.
- Velocidad.
- Variedad.
- Veracidad.
- Valor.
- Ejemplos reales de cada característica.
- Casos donde varias V's aparecen simultáneamente.
- Diferencia entre simplemente tener muchos datos y tener un problema de Big Data.

### Proyecto / práctica


**Diagnóstico de un caso de Big Data.**


Seleccionar un caso real, por ejemplo:

- Netflix.
- Spotify.
- Amazon.
- Uber.
- Redes sociales.
- Sistema bancario.
- Sensores IoT.
- Comercio electrónico.

El equipo deberá identificar las **5 V's** dentro del caso seleccionado.


Además, deberá utilizar un conjunto de datos y desarrollar un pequeño programa en Python que obtenga información básica como:

- Cantidad de registros.
- Cantidad de columnas.
- Tamaño aproximado del dataset.
- Tipos de datos.
- Valores faltantes.
- Variables disponibles.

### Resultado esperado


Explicar por qué el caso seleccionado presenta características asociadas con Big Data y qué problemas existirían al manejar cantidades mucho mayores de información.


---


# 2. Big Data vs. procesamiento tradicional


### Exposición


Investigar y explicar:

- Procesamiento tradicional de datos.
- Procesamiento de grandes volúmenes de información.
- Escalabilidad vertical.
- Escalabilidad horizontal.
- Procesamiento centralizado.
- Procesamiento distribuido.
- Limitaciones de una sola computadora.
- Casos donde Big Data es necesario.
- Casos donde utilizar Big Data sería innecesario.

### Proyecto / práctica


**Experimento de crecimiento de datos.**


Crear o utilizar datasets de diferentes tamaños y desarrollar un programa en Python que realice una misma operación sobre ellos.


Ejemplos:

- 10,000 registros.
- 100,000 registros.
- 1,000,000 de registros.
- Más registros si el equipo utilizado lo permite.

Medir:

- Tiempo de lectura.
- Tiempo de procesamiento.
- Uso aproximado de memoria.
- Tiempo requerido para realizar una agregación.

### Resultado esperado


Construir una tabla o gráfica que muestre cómo cambia el desempeño conforme aumenta el volumen de información.


El equipo deberá explicar qué podría ocurrir si el dataset tuviera cientos de millones o miles de millones de registros.


---


# 3. Fuentes de datos en Big Data


### Exposición


Investigar:

- Datos estructurados.
- Datos semiestructurados.
- Datos no estructurados.
- Bases de datos.
- APIs.
- Logs.
- Sensores.
- IoT.
- Redes sociales.
- Transacciones.
- Archivos CSV.
- JSON.
- Imágenes, audio y video.

Explicar los retos asociados con almacenar y procesar diferentes tipos de información.


### Proyecto / práctica


**Integración de múltiples fuentes de datos.**


Obtener información proveniente de al menos **tres fuentes o formatos diferentes**.


Por ejemplo:

- CSV.
- JSON.
- API pública.

Desarrollar un programa en Python que:

1. Lea las diferentes fuentes.
2. Identifique su estructura.
3. Seleccione información relevante.
4. Transforme los datos.
5. Integre la información cuando sea posible.
6. Genere un pequeño resumen.

### Resultado esperado


Mostrar un flujo:


**Fuentes → Lectura → Transformación → Integración → Resultado**


---


# 4. Procesamiento Batch vs. Streaming


### Exposición


Investigar:

- ¿Qué es procesamiento batch?
- ¿Qué es procesamiento streaming?
- Diferencias entre ambos.
- Latencia.
- Procesamiento periódico.
- Procesamiento en tiempo real.
- Ventajas y limitaciones.
- Casos de uso.

Ejemplos:

- Nómina.
- Reportes mensuales.
- Transacciones bancarias.
- Sensores.
- Monitoreo.
- Detección de fraude.
- Redes sociales.

### Proyecto / práctica


**Simulación Batch vs. Streaming con Python.**


Desarrollar dos programas o dos modalidades del mismo programa.


**Modo Batch**


Procesar un archivo completo y generar estadísticas al finalizar.


**Modo Streaming**


Simular la llegada de información registro por registro o en pequeños grupos y actualizar los resultados conforme llegan los datos.


### Resultado esperado


Demostrar visualmente la diferencia entre esperar a disponer de todos los datos y procesarlos conforme son generados.


---


# 5. Arquitectura Lambda


### Exposición


Investigar:

- ¿Qué es la arquitectura Lambda?
- ¿Qué problema busca resolver?
- Batch Layer.
- Speed Layer.
- Serving Layer.
- Flujo de información.
- Ventajas.
- Desventajas.
- Casos de uso.

El equipo deberá presentar un **diagrama de arquitectura**.


### Proyecto / práctica


**Simulación de una arquitectura Lambda.**


Construir una implementación simplificada utilizando Python.


Ejemplo:


**Batch Layer:** procesar todos los datos históricos almacenados.


**Speed Layer:** procesar nuevos registros conforme llegan.


**Serving Layer:** combinar o presentar los resultados de ambas capas.


Caso sugerido:


Sistema de ventas donde:

- Los datos históricos generan estadísticas generales.
- Las nuevas ventas actualizan indicadores recientes.
- Una salida muestra ambos resultados.

### Resultado esperado


Demostrar claramente la función de cada capa y cómo colaboran.


---


# 6. Arquitectura Kappa


### Exposición


Investigar:

- ¿Qué es la arquitectura Kappa?
- Procesamiento basado en eventos.
- Streams de datos.
- Flujo de información.
- Diferencias conceptuales respecto a Lambda.
- Ventajas.
- Limitaciones.
- Casos de uso.

Presentar un **diagrama completo de la arquitectura**.


### Proyecto / práctica


**Simulación de un flujo continuo de eventos.**


Crear un productor de datos en Python que genere eventos periódicamente.


Ejemplos:

- Temperatura de sensores.
- Ventas.
- Visitas a una página.
- Transacciones.
- Posiciones GPS simuladas.

Otro componente deberá recibir los eventos y actualizar estadísticas continuamente.


### Resultado esperado


Demostrar un sistema donde la información se procesa principalmente como un flujo de eventos.


---


# 7. Lambda vs. Kappa


### Exposición


Comparar:

- Arquitectura.
- Procesamiento.
- Batch.
- Streaming.
- Latencia.
- Complejidad.
- Mantenimiento.
- Escalabilidad.
- Casos de uso.

### Proyecto / práctica


**Diseño de arquitectura para diferentes organizaciones.**


Analizar al menos **tres escenarios**, por ejemplo:

- Banco.
- Plataforma de streaming.
- Hospital.
- Comercio electrónico.
- Industria con sensores IoT.
- Universidad.
- Empresa de transporte.

Para cada escenario deberán:

1. Identificar las fuentes de datos.
2. Determinar si requiere batch, streaming o ambos.
3. Elegir Lambda o Kappa.
4. Diseñar un diagrama de arquitectura.
5. Justificar técnicamente la elección.

### Resultado esperado


El equipo deberá defender sus decisiones frente al grupo.


---


# 8. Analítica descriptiva: ¿qué ocurrió?


### Exposición


Investigar:

- Analítica descriptiva.
- Datos históricos.
- Indicadores.
- Métricas.
- Agregaciones.
- Visualización.
- Dashboards.
- Casos de aplicación.

### Proyecto / práctica


**Análisis descriptivo de un dataset.**


Seleccionar un dataset y utilizar Python con herramientas como:

- Pandas.
- Matplotlib.

Realizar:

- Limpieza básica.
- Estadísticas descriptivas.
- Agrupaciones.
- Identificación de tendencias.
- Al menos tres visualizaciones.

### Resultado esperado


Responder mediante datos preguntas relacionadas con:


**¿Qué ocurrió?**


y


**¿Cómo se comportaron los datos?**


---


# 9. Analítica predictiva: ¿qué podría ocurrir?


### Exposición


Investigar:

- Analítica predictiva.
- Uso de datos históricos.
- Variables de entrada.
- Variable objetivo.
- Predicción.
- Clasificación.
- Regresión.
- Relación con Machine Learning.
- Casos de aplicación.

### Proyecto / práctica


**Modelo predictivo sencillo.**


Seleccionar un dataset y plantear una pregunta predictiva.


Ejemplos:

- Predecir precio de una vivienda.
- Predecir supervivencia de pasajeros.
- Predecir una categoría.
- Predecir ventas.

Utilizar Python y una biblioteca como `scikit-learn` para entrenar un modelo sencillo.


No se evaluará todavía la complejidad matemática del algoritmo; se evaluará principalmente que comprendan:


**Datos históricos → Variables → Modelo → Predicción**


### Resultado esperado


Mostrar algunas predicciones y explicar qué información utilizó el modelo para generarlas.


---


# 10. Analítica prescriptiva: ¿qué debería hacerse?


### Exposición


Investigar:

- Analítica prescriptiva.
- Diferencias entre analítica descriptiva, predictiva y prescriptiva.
- Reglas de decisión.
- Recomendaciones.
- Optimización.
- Apoyo a la toma de decisiones.
- Casos empresariales.

### Proyecto / práctica


**Sistema sencillo de recomendaciones o decisiones.**


Seleccionar un problema donde, después de analizar información, el sistema recomiende una acción.


Ejemplos:

- Reposición de inventario.
- Asignación de recursos.
- Recomendación de productos.
- Selección de rutas.
- Priorización de clientes.
- Decisiones basadas en demanda.

El sistema deberá recibir datos, analizarlos y generar una recomendación justificable.


### Resultado esperado


Mostrar el flujo:


**Datos → Análisis → Resultado → Recomendación → Acción**


---


# Requisitos generales de la exposición


Todos los equipos deberán realizar una exposición que incluya:

1. Introducción al tema.
2. Conceptos fundamentales.
3. Funcionamiento.
4. Diagrama, arquitectura o representación gráfica.
5. Ejemplos.
6. Caso real de aplicación.
7. Ventajas y limitaciones.
8. Explicación del proyecto desarrollado.
9. Demostración funcionando.
10. Conclusiones.

**Importante:** no se permitirá realizar una exposición basada únicamente en leer diapositivas.


Cada integrante deberá participar tanto en la explicación como en el desarrollo o demostración del proyecto.


---


# Requisitos del proyecto


El proyecto deberá contener como mínimo:

- Código fuente.
- Dataset utilizado o instrucciones para obtenerlo.
- `README.md`.
- `requirements.txt`.
- Instrucciones de instalación.
- Instrucciones de ejecución.
- Evidencias de funcionamiento.
- Explicación de los resultados.

El proyecto deberá poder ejecutarse en otro equipo siguiendo únicamente las instrucciones del repositorio.


---


# Repositorio GitHub


Cada equipo deberá crear un repositorio con una estructura similar a:


```text
proyecto-big-data/
│
├── README.md
├── requirements.txt
├── src/
│   └── main.py
│
├── data/
│   └── README.md
│
├── docs/
│   ├── arquitectura.png
│   └── evidencias/
└──
```


Si el dataset es demasiado grande para GitHub, **no deberá subirse directamente al repositorio**. En su lugar, deberán incluir las instrucciones y el enlace o procedimiento necesario para obtenerlo.


---


# Presentación de la práctica


Durante la exposición deberán ejecutar el proyecto.


La demostración deberá seguir este orden:


**1. Problema → 2. Datos → 3. Arquitectura/solución → 4. Código → 5. Ejecución → 6. Resultados → 7. Interpretación**


No será suficiente mostrar capturas de pantalla de un programa que supuestamente funciona.


---


# Entregables


Cada equipo deberá entregar:

- Presentación utilizada.
- Enlace al repositorio GitHub.
- Código fuente.
- `README.md`.
- `requirements.txt`.
- Dataset o instrucciones para obtenerlo.
- Diagramas correspondientes.
- Conclusiones individuales de los integrantes.

---


# Criterios de evaluación


| Criterio                                      | Porcentaje |
| --------------------------------------------- | ---------- |
| Dominio y explicación del tema                | 20 %       |
| Calidad técnica de la investigación           | 15 %       |
| Proyecto/práctica funcionando                 | 25 %       |
| Relación entre teoría y práctica              | 15 %       |
| Repositorio, documentación y reproducibilidad | 10 %       |
| Demostración y explicación técnica            | 10 %       |
| Participación del equipo                      | 5 %        |
| **Total**                                     | **100 %**  |


## Consideraciones importantes


La complejidad técnica de los proyectos **no será idéntica entre los temas**. La evaluación considerará principalmente que la práctica permita demostrar correctamente el concepto asignado.


No se busca construir todavía una infraestructura de Big Data de producción. Las prácticas son **modelos simplificados** que permiten comprender los principios antes de trabajar posteriormente con tecnologías especializadas.


El equipo deberá ser capaz de explicar su código. Utilizar código, bibliotecas, herramientas de IA o recursos externos sin poder explicar su funcionamiento afectará la evaluación.


## Preguntas al finalizar


Después de cada exposición, el docente podrá realizar preguntas a cualquier integrante relacionadas con:

- Conceptos presentados.
- Código desarrollado.
- Dataset.
- Arquitectura.
- Decisiones tomadas.
- Resultados obtenidos.

La respuesta deberá ser individual para comprobar la comprensión del tema.
