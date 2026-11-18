---
title: "Spark Standalone"
sidebar:
  order: 1
---

# Apache Spark - Fundamentos y Entornos

> 🚀 **Presentación:** [Spark](https://bda.josepgarcia.com/presentaciones/modulo2_spark.pdf)

Apache Spark es un motor de procesamiento de datos distribuido diseñado para **velocidad**, **facilidad de uso** y **análisis sofisticado**. A diferencia de Hadoop MapReduce que escribe resultados intermedios en disco, Spark mantiene los datos en memoria (RAM), lo que lo hace hasta **100x más rápido** para ciertos workloads.


**¿Por qué aprender Spark?**

- **Velocidad**: Procesamiento en memoria (in-memory computing)
- **Versatilidad**: Batch processing, streaming, ML, grafos, SQL
- **Escalabilidad**: Desde tu laptop hasta miles de nodos
- **Industria**: Usado por Netflix, Uber, Airbnb, Amazon, etc.

:::note
Spark no reemplaza a Hadoop, sino que lo complementa. Spark puede correr sobre YARN (el gestor de recursos de Hadoop) y leer/escribir en HDFS. En este módulo aprenderás a usar Spark tanto en modo standalone como integrado con Hadoop.
:::



## 1. Arquitectura de Spark


Antes de empezar a programar, es crucial entender cómo funciona Spark internamente.


### Componentes Principales


![image](/notion-images/big-data/41c96afa-d3f6-80b5-b768-ff3fc96f17ab.png)

1. **Driver**: Tu programa Python/Scala que contiene la lógica de negocio
2. **Cluster Manager**: Asigna recursos (CPU, RAM) a tu aplicación
3. **Executors**: Procesos JVM que ejecutan tu código en paralelo
4. **Comunicación**: El Driver envía tareas, los Executors las ejecutan y reportan resultados

:::tip
**Diferencia clave con Hadoop MapReduce:**

- MapReduce: Escribe resultados intermedios en disco (lento)
- Spark: Mantiene datos en RAM entre operaciones (rápido)
:::



### Modos de Ejecución


| **Modo**       | **Descripción**                | **Cuándo usar**                     |
| -------------- | ------------------------------ | ----------------------------------- |
| **Local**      | Todo corre en una sola máquina | Desarrollo, pruebas, aprendizaje    |
| **Standalone** | Cluster Spark sin dependencias | Clusters dedicados a Spark          |
| **YARN**       | Integrado con Hadoop           | Cuando ya tienes Hadoop instalado   |
| **Kubernetes** | Contenedores orquestados       | Entornos cloud-native               |
| **Mesos**      | Gestor de recursos genérico    | Clusters compartidos con otras apps |


---


## 2. Entornos de Desarrollo


### Opción 1: BDA Lab (Recomendado para el curso)


Entorno completo con Hadoop, HDFS y Spark integrados.


```bash
# Clonar el repositorio del laboratorio
git clone https://github.com/josepgarcia/BigDataAplicadoLab-2526

cd BigDataAplicadoLab-2526/modulo2

# Dar permisos de ejecución al menú
chmod u+x menu.sh

# Ejecutar el menú interactivo
./menu.sh
```


**Ventajas:**

- ✅ Hadoop + HDFS + Spark preconfigurados
- ✅ Jupyter Notebook integrado
- ✅ Datasets de ejemplo incluidos
- ✅ Spark UI accesible en `http://localhost:4040`

### Opción 2: Docker con Jupyter (Rápido para empezar)


Sin integración con Hadoop/HDFS, ideal para aprender Spark rápidamente.


```bash
# Crear carpeta de trabajo
mkdir spark-local
cd spark-local

# Ejecutar contenedor con Jupyter + PySpark
docker run -it -p 8888:8888 -p 4040:4040 \
  -v $(pwd):/home/jovyan/work/projects/ \
  jupyter/pyspark-notebook

# Acceder a Jupyter: http://localhost:8888
# Spark UI: http://localhost:4040 (cuando ejecutes código Spark)
```


**Ventajas:**

- ✅ Instalación en 1 comando
- ✅ Jupyter Notebook listo para usar
- ✅ No requiere configuración

**Desventajas:**

- ❌ Sin HDFS (solo archivos locales)
- ❌ Sin integración con Hadoop

### Opción 3: Instalación Local (Python + PySpark)


Para quienes prefieren trabajar sin Docker.


```bash
# Opción 1: Con pip
pip install pyspark

# Opción 2: Con Conda (recomendado)
conda install -c conda-forge pyspark

# Verificar instalación
python -c "import pyspark; print(pyspark.__version__)"
```


**Requisitos previos:**

- Python 3.8+
- Java 8 o 11 (Spark corre sobre la JVM)

```bash
# Verificar Java
java -version

# Si no tienes Java, instalar:
# macOS: brew install openjdk@11
# Ubuntu: sudo apt install openjdk-11-jdk
```


:::caution
**Problema común:** Si obtienes el error `JAVA_HOME is not set`, debes configurar la variable de entorno:


```bash
# macOS/Linux (añadir a ~/.bashrc o ~/.zshrc)
export JAVA_HOME=$(/usr/libexec/java_home)  # macOS
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64  # Ubuntu

# Verificar
echo $JAVA_HOME
```
:::



---


## 3. SparkSession vs SparkContext


Para trabajar con Spark, necesitas un **punto de entrada**. Históricamente ha habido confusión porque Spark ha evolucionado:


### Evolución Histórica


### Comparación Detallada


| **Aspecto**         | **SparkContext (****`sc`****)** | **SparkSession (****`spark`****)**      |
| ------------------- | ------------------------------- | --------------------------------------- |
| **Versión**         | Spark 1.x (legacy)              | Spark 2.0+ (actual)                     |
| **Propósito**       | Crear RDDs                      | API unificada (RDDs + DataFrames + SQL) |
| **Uso recomendado** | ❌ Solo código legacy            | ✅ **Usar siempre**                      |
| **Acceso a RDDs**   | Directo                         | A través de `spark.sparkContext`        |
| **SQL**             | Requiere SQLContext separado    | Integrado                               |
| **Hive**            | Requiere HiveContext separado   | Integrado                               |


:::note
- Usa **SparkSession** (`spark`) para todo
- Si necesitas funciones de bajo nivel (como `parallelize`), accede al contexto: `sc = spark.sparkContext`
:::



### Crear una SparkSession


Versión Básica


```python
from pyspark.sql import SparkSession

# Crear sesión (usa configuración por defecto)
spark = SparkSession.builder.getOrCreate()

# Verificar que funciona
spark
```


**Salida esperada:**


```text
SparkSession - in-memory
    SparkContext
    Version: v3.5.0
    Master: local[*]
    AppName: pyspark-shell
```


**Explicación:**

- `local[*]`: Modo local usando todos los cores disponibles
- `pyspark-shell`: Nombre por defecto de la aplicación

Versión con Configuración Personalizada


```python
spark = (SparkSession.builder
    .appName("MiAnalisisDatos")  # Nombre que aparece en Spark UI
    .config("spark.executor.memory", "2g")  # RAM por executor
    .config("spark.driver.memory", "1g")  # RAM para el driver
    .config("spark.sql.shuffle.partitions", "10")  # Particiones para shuffle
    .getOrCreate())
```


**Parámetros importantes:**


| **Configuración**              | **Descripción**                      | **Valor recomendado**                                    |
| ------------------------------ | ------------------------------------ | -------------------------------------------------------- |
| `spark.executor.memory`        | RAM por executor                     | 2-4g para desarrollo, más en producción                  |
| `spark.driver.memory`          | RAM para el driver                   | 1-2g normalmente                                         |
| `spark.sql.shuffle.partitions` | Particiones para operaciones shuffle | 10-20 para datos pequeños, 200 (default) para producción |
| `spark.executor.cores`         | CPUs por executor                    | 2-4 cores                                                |


:::tip
**Optimización para desarrollo local:**
Para datasets pequeños (1GB), reduce `spark.sql.shuffle.partitions` a 4-10. El valor por defecto (200) es excesivo y ralentiza el procesamiento.


```python
spark.conf.set("spark.sql.shuffle.partitions", "10")
```
:::



---


## 4. Primer Programa: "Hola Spark"


Vamos a verificar que todo funciona con un ejemplo simple: sumar los números del 0 al 100.


### Código Completo


```python
from pyspark.sql import SparkSession

# 1. Crear SparkSession
spark = SparkSession.builder.appName("HolaSpark").getOrCreate()

# 2. Obtener el SparkContext (para funciones de bajo nivel)
sc = spark.sparkContext

# 3. Crear un RDD (Resilient Distributed Dataset)
# parallelize() distribuye los datos en particiones
numeros = sc.parallelize(range(101))

# 4. Realizar una acción: sumar todos los números
total = numeros.sum()
print(f"La suma de 0 a 100 es: {total}")
# Salida: La suma de 0 a 100 es: 5050

# 5. Verificar cuántas particiones se crearon
print(f"Número de particiones: {numeros.getNumPartitions()}")
```


### ¿Qué está pasando internamente?


**Pasos del procesamiento:**

1. **Particionamiento**: Spark divide los 101 números en 4 particiones (por defecto en local)
2. **Distribución**: Cada partición se envía a un executor (proceso de ejecución)
3. **Procesamiento paralelo**: Cada executor suma sus números localmente
4. **Reducción**: El driver combina los resultados parciales

:::note
**Concepto clave: Lazy Evaluation**
En Spark, las transformaciones (como `map`, `filter`) NO se ejecutan inmediatamente. Solo se ejecutan cuando llamas a una **acción** (como `sum()`, `collect()`, `count()`).


```python
# Esto NO se ejecuta todavía (es una transformación)
numeros_dobles = numeros.map(lambda x: x * 2)

# AHORA se ejecuta todo (es una acción)
resultado = numeros_dobles.collect()
```
:::



---


## 5. Spark UI - Monitorización


Cada vez que ejecutas código Spark, se levanta automáticamente una interfaz web de monitorización.


**Acceso:** `http://localhost:4040`


### Pestañas Principales


| **Pestaña**     | **Qué muestra**        | **Para qué sirve**               |
| --------------- | ---------------------- | -------------------------------- |
| **Jobs**        | Trabajos ejecutados    | Ver cuánto tardó cada job        |
| **Stages**      | Etapas de cada job     | Identificar cuellos de botella   |
| **Storage**     | Datos cacheados        | Verificar qué está en memoria    |
| **Environment** | Configuración          | Ver parámetros de Spark          |
| **Executors**   | Estado de executors    | Monitorizar uso de CPU/RAM       |
| **SQL**         | Queries SQL ejecutadas | Ver plan de ejecución optimizado |


:::tip
**Debugging con Spark UI:**
Si tu código es lento:

1. Ve a la pestaña **Stages**
2. Identifica el stage que tarda más
3. Haz clic para ver las tareas individuales
4. Busca tareas que tardan mucho más que otras (data skew)
:::



### Ejemplo de Análisis


```python
# Crear un RDD grande
rdd_grande = sc.parallelize(range(1000000), 10)

# Transformación + Acción
resultado = rdd_grande.filter(lambda x: x % 2 == 0).count()

# Ahora ve a http://localhost:4040
# Verás:
# - 1 Job (count)
# - 1 Stage (filter + count)
# - 10 Tasks (una por partición)
```


---


## 6. Lectura de Datos desde Archivos


### Lectura de CSV con RDDs


Problema: Rutas de Archivos Locales


Cuando trabajas en local, Spark necesita saber que el archivo está en tu sistema de archivos (no en HDFS).


```python
import os
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext

# ❌ INCORRECTO: Spark buscará en HDFS
rdd = sc.textFile("./DATOS/archivo.csv")

# ✅ CORRECTO: Especificar que es un archivo local
path_relativo = "./DATOS/archivo.csv"
path_absoluto = os.path.abspath(path_relativo)
path_final = "file://" + path_absoluto

print(f"Leyendo desde: {path_final}")
rdd = sc.textFile(path_final)
```


:::caution
**Error común: FileNotFoundException**
Si obtienes este error, verifica:

1. ¿El archivo existe? `ls -la ./DATOS/`
2. ¿La ruta es correcta? Usa rutas absolutas
3. ¿Añadiste el prefijo `file://`?
:::



### Ejemplo Completo: Análisis de Ventas


Vamos a trabajar con el dataset `pdi_sales_small.csv` que contiene ventas internacionales.


Paso 1: Descargar el Dataset


```bash
# Crear carpeta y descargar datos
!mkdir -p DATOS
!wget "https://github.com/josepgarcia/datos/raw/refs/heads/main/pdi_sales_small.csv" -P ./DATOS

# Ver las primeras líneas
!head ./DATOS/pdi_sales_small.csv
```


**Estructura del archivo:**


```text
ProductID;Date;Zip;Units;Revenue;Country
725;1/15/1999;41540;1;115.5;Germany
787;6/6/2002;41540;1;314.9;Germany
...
```


Paso 2: Cargar y Procesar


```python
import os
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("AnalisisVentas").getOrCreate()
sc = spark.sparkContext

# Construir ruta absoluta
path_relativo = "./DATOS/pdi_sales_small.csv"
path_absoluto = os.path.abspath(path_relativo)
path_final = "file://" + path_absoluto

print(f"Leyendo desde: {path_final}")

# Leer archivo (cada línea es un string)
rdd = sc.textFile(path_final)

# Ver las primeras 3 líneas
print(rdd.take(3))
# Salida:
# ['ProductID;Date;Zip;Units;Revenue;Country',
#  '725;1/15/1999;41540          ;1;115.5;Germany',
#  '787;6/6/2002;41540          ;1;314.9;Germany']
```


Paso 3: Extraer País y Unidades


```python
# Extraer (País, Unidades) de cada línea
# Formato: ProductID;Date;Zip;Units;Revenue;Country
#          0         1    2   3     4       5

paises_unidades = rdd.map(lambda linea: (
    linea.split(";")[-1].strip(),  # País (última columna)
    linea.split(";")[3]             # Unidades (columna 3)
))

paises_unidades.take(5)
# Salida:
# [('Country', 'Units'),
#  ('Germany', '1'),
#  ('Germany', '1'),
#  ...]
```


:::caution
**Problema de eficiencia:**
Estamos haciendo `split(";")` DOS VECES por cada línea. Con millones de líneas, esto es muy ineficiente.
**Solución:** Hacer split una sola vez.
:::



Paso 4: Optimización - Split Una Sola Vez


```python
# ✅ MEJOR: Función que hace split una sola vez
def parsear_linea(linea):
    columnas = linea.split(";")
    pais = columnas[-1].strip()
    unidades = columnas[3]
    return (pais, unidades)

paises_unidades = rdd.map(parsear_linea)
paises_unidades.take(5)
```


Paso 5: Eliminar Encabezado


```python
# Obtener la primera línea (encabezado)
header = paises_unidades.first()
print(f"Encabezado: {header}")

# Filtrar todas las líneas que NO sean el encabezado
paises_unidades_sin_header = paises_unidades.filter(lambda linea: linea != header)

paises_unidades_sin_header.take(5)
# Salida:
# [('Germany', '1'),
#  ('Germany', '1'),
#  ('Germany', '1'),
#  ...]
```


Paso 6: Convertir a Enteros y Sumar por País


```python
# Convertir unidades a enteros
paises_unidades_int = paises_unidades_sin_header.map(
    lambda x: (x[0], int(x[1]))
)

# Sumar unidades por país usando reduceByKey
paises_total_unidades = paises_unidades_int.reduceByKey(lambda a, b: a + b)

# Obtener resultados
resultados = paises_total_unidades.collect()

# Mostrar top 10 países por unidades vendidas
top10 = sorted(resultados, key=lambda x: x[1], reverse=True)[:10]
for pais, unidades in top10:
    print(f"{pais}: {unidades:,} unidades")
```


**Salida esperada:**


```text
Germany: 15,234 unidades
USA: 12,891 unidades
France: 9,456 unidades
...
```


:::tip
**Mejora adicional: Usar DataFrames**
Para análisis de datos estructurados (CSV, JSON, Parquet), los **DataFrames** son mucho más eficientes que los RDDs. Verás esto en detalle en los siguientes temas del módulo.


```python
# Versión con DataFrame (más simple y rápido)
df = spark.read.csv(path_final, header=True, sep=";", inferSchema=True)
df.groupBy("Country").sum("Units").show()
```
:::



---


## 7. Conexión con HDFS


Cuando trabajas con el entorno BDA Lab (Hadoop + Spark), puedes leer/escribir directamente en HDFS.


### Diferencia de Rutas


```python
# ❌ Archivo LOCAL (tu máquina)
rdd_local = sc.textFile("file:///ruta/absoluta/archivo.csv")

# ✅ Archivo en HDFS (sistema distribuido)
rdd_hdfs = sc.textFile("/user/hadoop/datos/archivo.csv")
# O explícitamente:
rdd_hdfs = sc.textFile("hdfs://localhost:9000/user/hadoop/datos/archivo.csv")
```


### Ejemplo Completo con HDFS


```python
# 1. Subir archivo a HDFS (desde terminal)
# hdfs dfs -put ./DATOS/pdi_sales_small.csv /user/hadoop/datos/

# 2. Leer desde HDFS en Spark
rdd = sc.textFile("/user/hadoop/datos/pdi_sales_small.csv")

# 3. Procesar (igual que antes)
paises_unidades = rdd.map(lambda linea: (
    linea.split(";")[-1].strip(),
    linea.split(";")[3]
))

# 4. Guardar resultados en HDFS
paises_unidades.saveAsTextFile("/user/hadoop/resultados/ventas_por_pais")

# 5. Ver resultados (desde terminal)
# hdfs dfs -cat /user/hadoop/resultados/ventas_por_pais/part-00000
```


:::note
**Ventaja de HDFS:**
Los datos están distribuidos y replicados en múltiples nodos. Si un nodo falla, Spark puede leer los datos desde otra réplica automáticamente.
:::



---


## 8. Finalizar Sesión


Al terminar de trabajar, libera los recursos:


```python
# Detener SparkSession (libera memoria y CPU)
spark.stop()
```


:::caution
**Importante en Jupyter Notebook:**
Si no detienes la sesión, el puerto 4040 quedará ocupado y no podrás iniciar otra sesión. Si esto pasa:


```python
# Forzar detención de todas las sesiones
from pyspark.sql import SparkSession
SparkSession.builder.getOrCreate().stop()
```
:::



---


## Errores Comunes y Soluciones


### Error 1: `JAVA_HOME is not set`


**Problema:** Spark requiere Java pero no encuentra la instalación.


**Solución:**


```bash
# macOS
export JAVA_HOME=$(/usr/libexec/java_home)

# Linux
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Verificar
echo $JAVA_HOME
java -version
```


### Error 2: `FileNotFoundException`


**Problema:** Spark no encuentra el archivo.


**Solución:**


```python
# ✅ Usar ruta absoluta con prefijo file://
import os
path = "file://" + os.path.abspath("./DATOS/archivo.csv")
rdd = sc.textFile(path)
```


### Error 3: `Port 4040 is already in use`


**Problema:** Ya hay una sesión Spark corriendo.


**Solución:**


```python
# Detener sesión anterior
spark.stop()

# O cambiar puerto en la configuración
spark = SparkSession.builder \
    .config("spark.ui.port", "4041") \
    .getOrCreate()
```


### Error 4: `Py4JJavaError` al hacer `collect()`


**Problema:** Intentas traer demasiados datos al driver.


**Solución:**


```python
# ❌ MALO: collect() en dataset grande
resultado = rdd_gigante.collect()  # OutOfMemoryError!

# ✅ BUENO: Usar take() para muestra
muestra = rdd_gigante.take(100)

# ✅ BUENO: Guardar a disco
rdd_gigante.saveAsTextFile("/ruta/resultados")
```


---


## Ejercicios Prácticos


### Ejercicio 1: Configurar SparkSession Personalizada


Crea una SparkSession con configuración específica para un análisis de datos.


**Tareas:**

1. Crea una SparkSession con el nombre "MiPrimerAnalisis"
2. Configura 1GB de memoria para el executor
3. Configura 8 particiones para shuffle
4. Verifica que la sesión se creó correctamente mostrando su información

**Resultado esperado:**

- SparkSession creada con el nombre especificado
- Configuración aplicada correctamente
- Información de la sesión mostrada

### Ejercicio 2: Operaciones Básicas con RDDs


Crea un RDD y realiza operaciones básicas.


**Datos de entrada:**


```python
numeros = list(range(1, 21))  # [1, 2, 3, ..., 20]
```


**Tareas:**

1. Crea un RDD a partir de la lista de números
2. Cuenta cuántos elementos tiene el RDD
3. Muestra los primeros 5 elementos
4. Calcula la suma de todos los números
5. Encuentra el número máximo y mínimo

**Resultado esperado:**

- Total de elementos: 20
- Primeros 5: [1, 2, 3, 4, 5]
- Suma: 210
- Máximo: 20, Mínimo: 1

### Ejercicio 3: Transformaciones map y filter


Aplica transformaciones a un RDD de números.


**Datos de entrada:**


```python
numeros = sc.parallelize(range(1, 51))  # 1 a 50
```


**Tareas:**

1. Multiplica cada número por 3
2. Filtra solo los números mayores a 50
3. Cuenta cuántos números cumplen la condición
4. Muestra los primeros 10 resultados

**Resultado esperado:**

- Números después de multiplicar por 3: [3, 6, 9, …, 150]
- Números mayores a 50: [51, 54, 57, …, 150]
- Total de números mayores a 50: 34
- Primeros 10: [51, 54, 57, 60, 63, 66, 69, 72, 75, 78]

### Ejercicio 4: Trabajar con Pares Clave-Valor


Crea un RDD de pares (clave, valor) y realiza agregaciones.


**Datos de entrada:**


```python
ventas = [
    ("Laptop", 1200),
    ("Mouse", 25),
    ("Laptop", 1100),
    ("Teclado", 75),
    ("Mouse", 30),
    ("Laptop", 1300)
]
```


**Tareas:**

1. Crea un RDD a partir de la lista de ventas
2. Calcula el total de ventas por producto usando `reduceByKey`
3. Cuenta cuántas ventas hay de cada producto
4. Encuentra el producto con mayor total de ventas

**Resultado esperado:**

- Total por producto: Laptop: 3600, Mouse: 55, Teclado: 75
- Número de ventas: Laptop: 3, Mouse: 2, Teclado: 1
- Producto con mayor total: Laptop (3600)

### Ejercicio 5: Lectura y Procesamiento de Archivo CSV


Lee un archivo CSV y procesa sus datos.


**Dataset:** `persons.csv` de [https://github.com/josepgarcia/datos](https://github.com/josepgarcia/datos)


**Estructura del archivo:**


```text
name,age,city
Ana,28,Madrid
Juan,35,Barcelona
María,42,Valencia
```


**Tareas:**

1. Descarga el archivo `persons.csv`
2. Cárgalo usando `sc.textFile()` con la ruta correcta
3. Elimina el encabezado
4. Extrae solo los nombres y edades
5. Filtra personas mayores de 30 años
6. Cuenta cuántas personas cumplen la condición

**Resultado esperado:**

- Archivo cargado correctamente
- Encabezado eliminado
- Personas mayores de 30: Juan (35), María (42)
- Total: 2 personas

### Ejercicio 6: Optimización - Evitar Múltiples split()


Optimiza el siguiente código que hace split múltiples veces.


**Código ineficiente:**


```python
rdd = sc.textFile("file:///ruta/datos.csv")

# ❌ INEFICIENTE: split() se ejecuta 3 veces por línea
nombres = rdd.map(lambda x: x.split(",")[0])
edades = rdd.map(lambda x: x.split(",")[1])
ciudades = rdd.map(lambda x: x.split(",")[2])
```


**Tareas:**

1. Identifica el problema de eficiencia
2. Reescribe el código para hacer split() una sola vez
3. Extrae nombre, edad y ciudad en una sola pasada
4. Explica por qué tu solución es más eficiente

**Resultado esperado:**

- Código optimizado que hace split() una sola vez
- Explicación clara de la mejora de rendimiento

### Ejercicio 7: Debugging - Encuentra y Corrige Errores


El siguiente código tiene errores. Encuéntralos y corrígelos.


**Código con errores:**


```python
from pyspark.sql import SparkSession

# Error 1: Falta configuración
spark = SparkSession.builder.getOrCreate()

# Error 2: Ruta incorrecta para archivo local
rdd = sc.textFile("./datos.csv")

# Error 3: Uso de collect() en dataset grande
datos = rdd.collect()
for linea in datos:
    print(linea)

# Error 4: No se cierra la sesión
```


**Tareas:**

1. Identifica los 4 errores
2. Explica por qué cada uno es un error
3. Proporciona el código corregido

**Resultado esperado:**

- Error 1: Falta obtener SparkContext
- Error 2: Falta prefijo `file://` y ruta absoluta
- Error 3: `collect()` es peligroso, usar `take()` o `foreach()`
- Error 4: Falta `spark.stop()`

---


## Proyecto: Análisis de Logs de Servidor Web


### Objetivo


Analizar logs de un servidor web para extraer estadísticas de acceso, identificar páginas más visitadas, detectar errores y analizar patrones de tráfico. Este proyecto integra todos los conceptos vistos: SparkSession, RDDs, transformaciones, acciones y lectura de archivos.


### Dataset


Para este proyecto utilizaremos el dataset `stocks.txt` disponible en: [https://github.com/josepgarcia/datos](https://github.com/josepgarcia/datos)


**Descripción del dataset:**

- Archivo de texto con datos de acciones bursátiles
- Formato: `Símbolo,Fecha,Precio,Volumen`
- Tamaño aproximado: ~1000 registros
- Ejemplo de línea: `AAPL,2020-01-02,300.35,50000000`

**Descarga:**


```bash
# Descargar el dataset
!mkdir -p DATOS
!wget "https://github.com/josepgarcia/datos/raw/refs/heads/main/stocks.txt" -P ./DATOS
!head ./DATOS/stocks.txt
```


### Paso 1: Configuración Inicial y Carga de Datos


**Objetivo:** Configurar Spark y cargar el archivo de logs correctamente.


**Instrucciones:**

1. Crea una SparkSession con el nombre "AnalisisStocks"
2. Configura 512MB de memoria para el executor
3. Obtén el SparkContext
4. Construye la ruta absoluta del archivo con el prefijo `file://`
5. Carga el archivo usando `sc.textFile()`
6. Verifica la carga mostrando las primeras 5 líneas

**Código guía:**


```python
from pyspark.sql import SparkSession
import os

# TODO: Crear SparkSession con configuración
spark = SparkSession.builder \
    .appName("...") \
    .config("spark.executor.memory", "...") \
    .getOrCreate()

# TODO: Obtener SparkContext
sc = ...

# TODO: Construir ruta absoluta
path_relativo = "./DATOS/stocks.txt"
path_absoluto = ...
path_final = ...

# TODO: Cargar archivo
rdd = ...

# TODO: Verificar carga
print(rdd.take(5))
```


**Pista:** Usa `os.path.abspath()` para obtener la ruta absoluta


### Paso 2: Limpieza y Parseo de Datos


**Objetivo:** Limpiar los datos y convertirlos a un formato estructurado.


**Instrucciones:**

1. Crea una función `parsear_linea(linea)` que:
    - Divida la línea por comas
    - Extraiga: símbolo, fecha, precio (float), volumen (int)
    - Devuelva una tupla: `(símbolo, fecha, precio, volumen)`
2. Aplica la función a todo el RDD
3. Filtra líneas que no se puedan parsear (manejo de errores)
4. Cuenta cuántas líneas válidas tienes

**Código guía:**


```python
def parsear_linea(linea):
    try:
        # TODO: Dividir por comas
        partes = ...

        # TODO: Extraer campos
        simbolo = ...
        fecha = ...
        precio = float(...)
        volumen = int(...)

        return (simbolo, fecha, precio, volumen)
    except:
        return None

# TODO: Aplicar función y filtrar nulos
rdd_parseado = rdd.map(parsear_linea).filter(lambda x: x is not None)

# TODO: Contar líneas válidas
print(f"Líneas válidas: {rdd_parseado.count()}")
```


**Pista:** Usa `try-except` para manejar errores de conversión


### Paso 3: Análisis por Símbolo - Estadísticas Básicas


**Objetivo:** Calcular estadísticas de precio por cada símbolo de acción.


**Instrucciones:**

1. Crea pares `(símbolo, precio)` desde el RDD parseado
2. Calcula para cada símbolo:
    - Precio máximo
    - Precio mínimo
    - Precio promedio (necesitarás `aggregateByKey`)
3. Muestra los resultados ordenados por símbolo

**Código guía:**


```python
# TODO: Crear pares (símbolo, precio)
simbolo_precio = rdd_parseado.map(lambda x: (..., ...))

# TODO: Calcular máximo por símbolo
precio_max = simbolo_precio.reduceByKey(...)

# TODO: Calcular mínimo por símbolo
precio_min = simbolo_precio.reduceByKey(...)

# TODO: Calcular promedio (suma, contador)
# aggregateByKey(valor_inicial, seqFunc, combFunc)
precio_promedio = simbolo_precio.aggregateByKey(
    (0.0, 0),  # (suma, contador)
    lambda acc, valor: ...,  # Combinar valor con acumulador
    lambda acc1, acc2: ...   # Combinar dos acumuladores
).mapValues(lambda x: x[0] / x[1])

# TODO: Mostrar resultados
print("Precio máximo por símbolo:")
for simbolo, precio in sorted(precio_max.collect()):
    print(f"{simbolo}: ${precio:.2f}")
```


**Pista:** Para el promedio, acumula `(suma_precios, cantidad_registros)` y luego divide


### Paso 4: Análisis de Volumen - Top Días de Mayor Actividad


**Objetivo:** Identificar los días con mayor volumen de transacciones.


**Instrucciones:**

1. Crea pares `(fecha, volumen)` desde el RDD parseado
2. Suma el volumen total por fecha usando `reduceByKey`
3. Ordena por volumen descendente
4. Muestra los top 10 días con mayor volumen

**Código guía:**


```python
# TODO: Crear pares (fecha, volumen)
fecha_volumen = rdd_parseado.map(lambda x: (..., ...))

# TODO: Sumar volumen por fecha
volumen_por_fecha = fecha_volumen.reduceByKey(...)

# TODO: Ordenar por volumen descendente
# Pista: sortBy(lambda x: x[1], ascending=False)
top_fechas = volumen_por_fecha.sortBy(..., ascending=False)

# TODO: Mostrar top 10
print("Top 10 días con mayor volumen:")
for fecha, volumen in top_fechas.take(10):
    print(f"{fecha}: {volumen:,} acciones")
```


**Pista:** Usa `sortBy()` para ordenar por el segundo elemento de la tupla (volumen)


### Paso 5: Análisis Avanzado - Volatilidad por Símbolo


**Objetivo:** Calcular la volatilidad (diferencia entre máximo y mínimo) de cada símbolo.


**Instrucciones:**

1. Para cada símbolo, calcula el precio máximo y mínimo
2. Calcula la volatilidad: `(precio_max - precio_min) / precio_min * 100`
3. Identifica los 5 símbolos más volátiles
4. Identifica los 5 símbolos más estables (menor volatilidad)

**Código guía:**


```python
# TODO: Calcular max y min por símbolo en una sola pasada
# Usa aggregateByKey con valor inicial (precio_max, precio_min)
stats_por_simbolo = simbolo_precio.aggregateByKey(
    (float('-inf'), float('inf')),  # (max, min)
    lambda acc, precio: ...,  # Actualizar max y min
    lambda acc1, acc2: ...    # Combinar dos acumuladores
)

# TODO: Calcular volatilidad
volatilidad = stats_por_simbolo.mapValues(
    lambda x: ((x[0] - x[1]) / x[1]) * 100
)

# TODO: Ordenar por volatilidad
mas_volatiles = volatilidad.sortBy(lambda x: x[1], ascending=False).take(5)
mas_estables = volatilidad.sortBy(lambda x: x[1], ascending=True).take(5)

# TODO: Mostrar resultados
print("Símbolos más volátiles:")
for simbolo, vol in mas_volatiles:
    print(f"{simbolo}: {vol:.2f}%")
```


**Pista:** Para actualizar max y min: `(max(acc[0], precio), min(acc[1], precio))`


### Paso 6: Guardar Resultados y Análisis Final


**Objetivo:** Guardar los resultados del análisis y generar un resumen ejecutivo.


**Instrucciones:**

1. Guarda los resultados de volumen por fecha en un archivo de texto
2. Guarda las estadísticas por símbolo en otro archivo
3. Crea un resumen ejecutivo con:
    - Total de registros procesados
    - Número de símbolos únicos
    - Símbolo con mayor precio promedio
    - Día con mayor volumen total
    - Símbolo más volátil
4. Cierra la sesión de Spark correctamente

**Código guía:**


```python
# TODO: Guardar resultados
# Para archivos locales, usa file:// en la ruta
output_path_volumen = "file://" + os.path.abspath("./RESULTADOS/volumen_por_fecha")
volumen_por_fecha.saveAsTextFile(output_path_volumen)

output_path_stats = "file://" + os.path.abspath("./RESULTADOS/stats_por_simbolo")
stats_por_simbolo.saveAsTextFile(output_path_stats)

# TODO: Calcular métricas para resumen
total_registros = rdd_parseado.count()
simbolos_unicos = rdd_parseado.map(lambda x: x[0]).distinct().count()
simbolo_mayor_precio = precio_promedio.sortBy(lambda x: x[1], ascending=False).first()
dia_mayor_volumen = volumen_por_fecha.sortBy(lambda x: x[1], ascending=False).first()
simbolo_mas_volatil = volatilidad.sortBy(lambda x: x[1], ascending=False).first()

# TODO: Mostrar resumen ejecutivo
print("\n" + "="*60)
print("RESUMEN EJECUTIVO - ANÁLISIS DE STOCKS")
print("="*60)
print(f"\nTotal de registros procesados: {total_registros:,}")
print(f"Número de símbolos únicos: {simbolos_unicos}")
print(f"\nSímbolo con mayor precio promedio: {simbolo_mayor_precio[0]} (${simbolo_mayor_precio[1]:.2f})")
print(f"Día con mayor volumen: {dia_mayor_volumen[0]} ({dia_mayor_volumen[1]:,} acciones)")
print(f"Símbolo más volátil: {simbolo_mas_volatil[0]} ({simbolo_mas_volatil[1]:.2f}%)")

# TODO: Cerrar sesión
spark.stop()
print("\n✅ Análisis completado. Sesión cerrada.")
```


**Pista:** Crea la carpeta RESULTADOS antes de guardar: `!mkdir -p RESULTADOS`


### Preguntas de Reflexión

1. **Eficiencia:** ¿Por qué es importante hacer `split()` una sola vez por línea? ¿Cuánto tiempo ahorrarías con 1 millón de líneas?
2. **Particionamiento:** ¿Cuántas particiones tiene tu RDD? ¿Cómo afecta esto al rendimiento? ¿Qué pasaría si tuvieras solo 1 partición?
3. **Lazy Evaluation:** ¿En qué momento se ejecutaron realmente las transformaciones? ¿Qué ventajas tiene este modelo?
4. **Memoria:** ¿Qué pasaría si intentaras hacer `collect()` en un RDD de 10GB? ¿Cómo evitarías este problema?
5. **Optimización:** Si tuvieras que procesar 100x más datos, ¿qué cambiarías en tu código? ¿Usarías más particiones? ¿Cachearías algún RDD?
6. **HDFS vs Local:** ¿Cuáles son las ventajas de usar HDFS en lugar de archivos locales para este análisis?
