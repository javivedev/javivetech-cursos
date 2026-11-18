---
title: "Práctica: Git, GitHub y reproducibilidad de proyectos de datos"
sidebar:
  order: 4
---

**Asignatura:** Big Data


**Modalidad:** Trabajo en parejas con desarrollo individual


**Objetivo:** Utilizar Git y GitHub para desarrollar, documentar, compartir y reproducir un proyecto básico de análisis de datos en Python.


---


## **1. Objetivo de la práctica**


En esta actividad cada estudiante desarrollará individualmente un pequeño proyecto de análisis de datos utilizando Python y un dataset de Kaggle.


El propósito principal de la práctica no es realizar un análisis complejo, sino aprender a trabajar correctamente con:

- Git.
- GitHub.
- Repositorios.
- Commits.
- Entornos virtuales de Python.
- Dependencias mediante `requirements.txt`.
- Documentación mediante `README.md`.
- Clonación de proyectos.
- Reproducibilidad de proyectos de datos.

Al finalizar, otro estudiante deberá ser capaz de descargar su proyecto desde GitHub y ejecutarlo en un entorno nuevo sin recibir archivos adicionales.


---


# **2. Organización**


La actividad se realizará en **parejas**, pero el desarrollo del proyecto será **individual**.


Cada pareja tendrá:


**Estudiante A → Proyecto 1: Rendimiento académico**


**Estudiante B → Proyecto 2: Titanic**


Cada estudiante deberá crear y desarrollar su propio repositorio de GitHub.


Al finalizar el desarrollo, intercambiarán los enlaces de sus repositorios y cada estudiante deberá **clonar y reproducir el proyecto de su compañero**.


---


# **3. Proyecto 1 — Análisis del rendimiento académico**


### **Dataset**


**Students Performance in Exams — Kaggle**


https://www.kaggle.com/datasets/spscientist/students-performance-in-exams


Descarga el archivo correspondiente y utilízalo como fuente de datos del proyecto.


### **Situación**


Una institución educativa desea analizar el desempeño de sus estudiantes para identificar patrones relacionados con sus resultados académicos.


Tu objetivo será realizar un análisis exploratorio del dataset y presentar conclusiones obtenidas a partir de los datos.


### **Actividades mínimas**

1. Cargar el dataset utilizando Python.
2. Realizar una exploración inicial:
    - Número de registros.
    - Número de columnas.
    - Nombre de las variables.
    - Tipos de datos.
    - Valores faltantes.
    - Registros duplicados.
    - Estadísticas descriptivas.
3. Realizar la limpieza y preprocesamiento que consideres necesario.
4. Crear una nueva variable llamada:

```python
average_score
```


que represente el promedio de:

- Matemáticas.
- Lectura.
- Escritura.
1. Crear una clasificación del rendimiento académico utilizando el promedio obtenido. Deberás definir y explicar los criterios utilizados para las categorías.

Por ejemplo:


```text
Bajo
Medio
Alto
```

1. Realizar **mínimo 4 análisis** que respondan preguntas sobre los datos.

Algunas preguntas posibles son:

- ¿Cuál de las tres áreas tiene el promedio más alto?
- ¿Los estudiantes que realizaron el curso de preparación presentan mejores resultados?
- ¿Existen diferencias en el rendimiento según el nivel educativo de los padres?
- ¿Qué porcentaje de estudiantes alcanza determinado promedio?
- ¿Qué grupos presentan los promedios más altos y más bajos?

Puedes proponer otras preguntas.

1. Crear **mínimo 3 visualizaciones**.
2. Escribir conclusiones sobre los resultados obtenidos.

---


# **4. Proyecto 2 — Análisis de pasajeros del Titanic**


### **Dataset**


**Titanic — Kaggle**


https://www.kaggle.com/c/titanic/data


Para esta práctica utiliza principalmente:


```text
train.csv
```


### **IMPORTANTE**


**No se realizará ningún modelo de Machine Learning.**


Aunque el dataset Titanic normalmente se utiliza para problemas de clasificación, en esta actividad únicamente se realizará limpieza, preprocesamiento, análisis exploratorio y visualización.


### **Situación**


Se desea analizar la información disponible de los pasajeros del Titanic para identificar características asociadas con la supervivencia.


### **Actividades mínimas**

1. Cargar `train.csv` utilizando Python.
2. Realizar una exploración inicial:
    - Número de pasajeros.
    - Número de columnas.
    - Variables disponibles.
    - Tipos de datos.
    - Valores faltantes.
    - Registros duplicados.
    - Estadísticas descriptivas.
3. Analizar especialmente los valores faltantes existentes en variables como:

```text
Age
Cabin
Embarked
```


Deberás decidir cómo tratarlos y **explicar la decisión tomada**.

1. Realizar las transformaciones que consideres necesarias.
2. Crear **mínimo 2 variables nuevas**.

Por ejemplo:


```python
FamilySize = SibSp + Parch + 1
```


También puedes crear categorías de edad:


```text
Niño
Joven
Adulto
Adulto mayor
```


Los criterios exactos deberán ser definidos y documentados por el estudiante.

1. Realizar **mínimo 4 análisis**.

Algunas preguntas posibles son:

- ¿Qué porcentaje de pasajeros sobrevivió?
- ¿Cómo cambia la supervivencia entre hombres y mujeres?
- ¿Cómo cambia la supervivencia según la clase del pasajero?
- ¿Qué grupos de edad presentan mayor supervivencia?
- ¿Viajar solo o acompañado parece estar relacionado con la supervivencia?
- ¿Existe alguna relación entre la tarifa pagada y la supervivencia?

Puedes formular preguntas adicionales.

1. Crear **mínimo 3 visualizaciones**.
2. Escribir conclusiones sobre los resultados encontrados.

---


# **5. Creación del proyecto**


Antes de comenzar el análisis deberás crear una carpeta para tu proyecto.


La estructura mínima esperada es:


```text
nombre-proyecto/
│
├── data/
│   └── dataset.csv
│
├── src/
│   └── analysis.py
│
├── outputs/
│   └── resultados/
│
├── README.md
├── requirements.txt
└── .gitignore
```


Puedes modificar o ampliar esta estructura si lo consideras necesario.


---


# **6. Entorno virtual**


Cada proyecto deberá utilizar su propio entorno virtual.


Créalo con:


```bash
python -m venv .venv
```


### **Windows**


```bash
.venv\Scripts\activate
```


### **macOS/Linux**


```bash
source .venv/bin/activate
```


Instala las bibliotecas necesarias para realizar tu proyecto.


Por ejemplo:


```bash
pip install pandas matplotlib
```


Si necesitas otras bibliotecas puedes instalarlas.


---


# **7. Archivo requirements.txt**


Cuando tu proyecto tenga instaladas todas las dependencias necesarias, genera:


```bash
pip freeze > requirements.txt
```


El archivo deberá formar parte del repositorio.


Su propósito es permitir que otra persona pueda instalar las mismas dependencias mediante:


```bash
pip install -r requirements.txt
```


---


# **8. Archivo .gitignore**


**El entorno virtual NO debe subirse a GitHub.**


Crea un archivo:


```text
.gitignore
```


Incluye como mínimo:


```text
.venv/
__pycache__/
.ipynb_checkpoints/
.DS_Store
```


Puedes agregar otros archivos o directorios que no deban formar parte del repositorio.


---


# **9. Uso de Git**


Inicializa Git dentro del proyecto:


```bash
git init
```


Durante el desarrollo deberás realizar **mínimo 4 commits significativos**.


No se aceptarán commits realizados únicamente al finalizar el proyecto.


Los commits deberán representar avances reales.


Ejemplo:


```bash
git add .
git commit -m "Inicializa estructura y carga del dataset"
```


Posteriormente:


```bash
git add .
git commit -m "Agrega limpieza y preprocesamiento de datos"
```


Otro avance:


```bash
git add .
git commit -m "Agrega análisis exploratorio y nuevas variables"
```


Y finalmente:


```bash
git add .
git commit -m "Agrega visualizaciones, conclusiones y documentación"
```


### **No utilizar mensajes como:**


```text
commit 1
commit 2
cambios
actualización
prueba
final
final ahora sí
```


Los mensajes deben describir claramente el cambio realizado.


---


# **10. Repositorio de GitHub**


Crea un repositorio en GitHub para tu proyecto.


Después conecta tu proyecto local con el repositorio.


Ejemplo:


```bash
git remote add origin URL_DE_TU_REPOSITORIO
git branch -M main
git push -u origin main
```


Continúa realizando `push` conforme avances:


```bash
git push
```


Al finalizar, el historial de GitHub deberá mostrar claramente la evolución del proyecto.


---


# **11. README.md**


Tu repositorio deberá incluir obligatoriamente un archivo:


```text
README.md
```


El README deberá contener como mínimo:


### **Nombre del proyecto**


Explica brevemente de qué trata.


### **Dataset**


Indica:

- Nombre del dataset.
- Fuente.
- Descripción breve.

### **Objetivo**


Explica qué se pretende analizar.


### **Requisitos**


Indica que se requiere Python y las dependencias incluidas en `requirements.txt`.


### **Instalación**


Explica cómo clonar el repositorio:


```bash
git clone URL_DEL_REPOSITORIO
```


Entrar al proyecto:


```bash
cd nombre-del-repositorio
```


Crear el entorno:


```bash
python -m venv .venv
```


Activarlo e instalar dependencias:


```bash
pip install -r requirements.txt
```


### **Ejecución**


Indica exactamente cómo ejecutar tu proyecto.


Por ejemplo:


```bash
python src/analysis.py
```


### **Análisis realizados**


Describe brevemente los análisis realizados.


### **Resultados y conclusiones**


Resume los principales hallazgos.


---


# **12. Intercambio de repositorios**


Una vez terminado el proyecto comienza la segunda parte de la actividad.


Cada estudiante deberá enviar a su compañero **únicamente la URL de su repositorio de GitHub**.


### **No está permitido enviar:**

- Archivos `.py`.
- Notebooks.
- Carpetas comprimidas.
- Entornos virtuales.
- `requirements.txt` por separado.
- Dataset por WhatsApp, correo, USB, etc.
- ZIP del proyecto.

El objetivo es comprobar que GitHub contiene todo lo necesario para reproducir el proyecto.


---


# **13. Reproducir el proyecto del compañero**


Cada estudiante deberá clonar el repositorio de su compañero.


**No utilices la carpeta donde desarrollaste tu propio proyecto.**


Crea una ubicación nueva y ejecuta:


```bash
git clone URL_DEL_REPOSITORIO_DEL_COMPAÑERO
```


Entra al repositorio:


```bash
cd nombre-del-repositorio
```


Crea un entorno virtual completamente nuevo:


```bash
python -m venv .venv
```


Actívalo.


### **Windows**


```bash
.venv\Scripts\activate
```


### **macOS/Linux**


```bash
source .venv/bin/activate
```


Después instala **únicamente** las dependencias proporcionadas por el proyecto:


```bash
pip install -r requirements.txt
```


Finalmente ejecuta el proyecto siguiendo las instrucciones del `README.md`.


Por ejemplo:


```bash
python src/analysis.py
```


---


# **14. Regla de reproducibilidad**


El compañero deberá ser capaz de ejecutar el proyecto utilizando solamente:

1. La URL del repositorio.
2. Git.
3. Python.
4. Las instrucciones del `README.md`.
5. El archivo `requirements.txt`.

**Si el compañero no puede clonar el repositorio, crear un entorno limpio, instalar las dependencias y ejecutar correctamente el proyecto siguiendo únicamente el README, el proyecto no se considera completamente reproducible.**


Si aparece un error, ambos integrantes deberán identificar su causa y corregir el repositorio.


Las correcciones también deberán realizarse utilizando Git:


```bash
git add .
git commit -m "Corrige dependencias para reproducibilidad del proyecto"
git push
```


El compañero deberá posteriormente actualizar o volver a clonar el repositorio y comprobar la solución.


---


# **15. Evidencias a entregar**


Cada estudiante entregará:

1. **URL de su repositorio de GitHub.**
2. Evidencia del historial de commits.
3. Evidencia de que el proyecto propio funciona.
4. Nombre del compañero cuyo proyecto reprodujo.
5. URL del repositorio del compañero.
6. Evidencia de la clonación del repositorio.
7. Evidencia de creación y activación del nuevo entorno virtual.
8. Evidencia de ejecución de:

```bash
pip install -r requirements.txt
```

1. Evidencia de la ejecución correcta del proyecto del compañero.
2. Breve comentario indicando si el proyecto pudo reproducirse correctamente y, en caso contrario, qué problema encontraron y cómo lo solucionaron.

---


# **16. Criterios de evaluación**


| **Criterio**                                          | **Porcentaje** |
| ----------------------------------------------------- | -------------- |
| Limpieza y preprocesamiento de datos                  | 20%            |
| Análisis y conclusiones                               | 20%            |
| Visualizaciones                                       | 10%            |
| Organización del repositorio                          | 10%            |
| README y `requirements.txt`                           | 15%            |
| Uso correcto de Git y mínimo 4 commits significativos | 10%            |
| Reproducción exitosa por parte del compañero          | 15%            |
| **Total**                                             | **100%**       |


---


# **17. Consideraciones finales**


Esta práctica no consiste únicamente en conseguir que el código funcione en tu computadora.


En un proyecto de datos es importante que otra persona pueda obtener el código, instalar las dependencias necesarias, comprender cómo funciona y obtener los mismos resultados.


Por esta razón, durante esta actividad se evaluará tanto el análisis de datos como la **reproducibilidad del proyecto**.


### **Regla principal**


**“Funciona en mi computadora” no significa que un proyecto sea reproducible.**


Un proyecto se considera reproducible cuando otra persona puede clonarlo, preparar el entorno y ejecutarlo correctamente siguiendo únicamente su documentación.
