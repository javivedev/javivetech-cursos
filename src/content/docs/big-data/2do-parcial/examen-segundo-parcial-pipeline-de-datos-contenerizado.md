---
title: "Examen Segundo Parcial — Pipeline de datos contenerizado"
sidebar:
  order: 1
---

**Materia:** Manejo Masivo de Datos (Big Data) · **Unidad:** Segundo Parcial
**Modalidad:** Práctica individual + teoría + defensa oral · **Duración sugerida:** 3 h presenciales (o entrega en 48 h + defensa)
**Fecha de aplicación:** _por definir_


---


# Instrucciones generales

- El examen es **individual**. Cada alumno trabaja con un dataset y una pregunta de negocio **distintos**, determinados por su matrícula.
- Todo el ambiente debe levantarse con un solo comando: `docker compose up --build`.
- Se entrega un **repositorio Git** (GitHub/) con la estructura indicada al final.
- Se permite consultar documentación oficial (Docker, Hadoop, Python). Durante la defensa oral se verificará que entiendes y puedes modificar tu propio código.

# Escenario


La cadena de tiendas **"DataMart"** genera millones de registros de ventas. El área de análisis necesita un ambiente **reproducible** que: (1) procese los archivos con **Hadoop MapReduce**, (2) guarde los resultados en una **base de datos** y (3) los exponga a través de una **API**.


Tu tarea es construir ese pipeline completo usando contenedores.


---


# Paso 0. Generar tu dataset


Ejecuta el siguiente script **en tu máquina** usando tu matrícula completa de **9 dígitos** como semilla (escríbela tal como aparece en tu credencial). Genera un CSV de aproximadamente 400 MB (5 millones de registros).


```python
# generar_dataset.py
# Uso: python3 generar_dataset.py   (te pedira tu matricula)
import sys, random, csv
from datetime import datetime, timedelta

if len(sys.argv) == 2:
    matricula = sys.argv[1].strip()
else:
    matricula = input("Ingresa tu matricula (9 digitos): ").strip()

while not (matricula.isdigit() and len(matricula) == 9):
    matricula = input("Matricula invalida. Debe tener exactamente 9 digitos: ").strip()

random.seed(matricula)
print(f"Generando dataset para {matricula}... (tarda unos minutos)")

N = 5_000_000
tiendas = [f"T{str(i).zfill(3)}" for i in range(1, random.randint(15, 40))]
categorias = ["Electronica", "Abarrotes", "Ropa", "Hogar", "Juguetes",
              "Farmacia", "Deportes", "Papeleria", "Mascotas", "Bebidas"]
productos = {c: [f"{c[:3].upper()}-{j:04d}" for j in range(1, random.randint(30, 80))]
             for c in categorias}
pagos = ["Efectivo", "Tarjeta", "Transferencia", "Vales"]
inicio = datetime(2025, 1, 1)

with open(f"ventas_{matricula}.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["id", "fecha_hora", "tienda", "categoria", "producto",
                "cantidad", "precio_unitario", "metodo_pago"])
    for i in range(1, N + 1):
        cat = random.choice(categorias)
        fecha = inicio + timedelta(seconds=random.randint(0, 365 * 24 * 3600))
        w.writerow([i, fecha.strftime("%Y-%m-%d %H:%M:%S"),
                    random.choice(tiendas), cat, random.choice(productos[cat]),
                    random.randint(1, 12), round(random.uniform(5, 2500), 2),
                    random.choice(pagos)])
print("Listo")
```


**Importante:** el CSV **NO** se sube al repositorio (agrégalo a `.gitignore`). Se monta en el contenedor como volumen.


# Tu pregunta de negocio


Se asigna según el **último dígito de tu matrícula**:

- **0 o 1:** Ingreso total (`cantidad × precio_unitario`) por **categoría y mes**.
- **2 o 3:** **Ticket promedio** (ingreso promedio por registro) por **tienda**.
- **4 o 5:** Unidades vendidas por **método de pago y día de la semana**.
- **6 o 7:** **Top 10 productos** por ingreso total en todo el año.
- **8 o 9:** Ingreso total por **hora del día** (0–23) y categoría.

---


# Parte A. Infraestructura con Docker (25 pts)


**A1. Dockerfile de Hadoop (10 pts)**

- Imagen base **Debian** (por ejemplo `debian:bookworm-slim`).
- Instalar Java (OpenJDK), Python 3 y Hadoop en modo **standalone**.
- Definir correctamente `JAVA_HOME`, `HADOOP_HOME` y `PATH`.
- Verificar con `hadoop version` dentro del contenedor.

**A2. docker-compose.yml (15 pts)** con tres servicios:

- `hadoop`: construido con tu Dockerfile; el dataset se monta como volumen de solo lectura en `/data/input`.
- `db`: PostgreSQL (o MySQL) con **volumen nombrado** para persistencia y variables de entorno en un archivo `.env`.
- `api`: tu CRUD en Python (Flask o FastAPI) adaptado a este dominio, que se conecta a `db` **por nombre de servicio**.
- Los tres servicios en una **red definida** en el compose. `api` debe usar `depends_on` hacia `db`.

# Parte B. SSH (10 pts)

- El contenedor `hadoop` debe tener **OpenSSH Server** instalado y corriendo.
- Configurar **acceso sin contraseña con llaves** (`ssh-keygen` + `authorized_keys`), tal como lo requiere Hadoop en modo pseudo-distribuido.
- Demostrar: `ssh localhost` dentro del contenedor **y** un acceso desde el contenedor `api` hacia `hadoop` por nombre de servicio (`ssh usuario@hadoop`).
- No dejes contraseñas en texto plano en el Dockerfile.

# Parte C. Procesamiento con MapReduce (20 pts)


**C1. Job con Hadoop Streaming (14 pts)**

- Escribir `mapper.py` y `reducer.py` en Python que respondan **tu pregunta de negocio**.
- El mapper debe ignorar el encabezado del CSV y manejar líneas mal formadas sin truncar el job.
- Ejecutarlo con Hadoop Streaming, por ejemplo:

```bash
hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-*.jar \
  -input /data/input/ventas_<matricula>.csv \
  -output /data/output/resultado \
  -mapper mapper.py -reducer reducer.py \
  -file mapper.py -file reducer.py
```


**C2. Comparativa de rendimiento (6 pts)**

- Resolver la **misma pregunta** con un script secuencial en Python (pandas o lectura línea a línea).
- Medir ambos tiempos (`time`) y verificar que **los resultados coincidan**.
- En el README, explicar en 1 párrafo por qué uno fue más rápido que el otro en este escenario.

# Parte D. Integración (15 pts)

- Script `cargar_resultados.py` que lea la salida del job (`part-00000`) e inserte los registros en una tabla de la base de datos.
- La API debe exponer:
    - `GET /resultados` → todos los registros.
    - `GET /resultados/<clave>` → filtro por la clave de tu pregunta (categoría, tienda, producto, etc.).
    - Al menos un endpoint de escritura del CRUD original (POST, PUT o DELETE) funcionando sobre la nueva tabla.
- Demostrar que tras `docker compose down` y `docker compose up` **los datos siguen ahí**.

---


# Parte E. Teoría (15 pts)


Responde de forma breve (3–5 líneas cada una):

1. **(3 pts)** Explica la diferencia entre los modos **standalone, pseudo-distribuido y totalmente distribuido** de Hadoop. ¿En cuál de ellos se usa HDFS?
2. **(3 pts)** ¿Por qué el dataset se monta como **volumen** y no se copia dentro de la imagen con `COPY`? Menciona al menos dos razones.
3. **(3 pts)** ¿Qué ocurre con los datos de la base de datos al ejecutar `docker compose down`? ¿Y con `docker compose down -v`?
4. **(3 pts)** ¿Por qué MapReduce **no siempre** es más rápido que un script secuencial con un archivo de 400 MB? ¿A partir de qué condiciones conviene?
5. **(3 pts)** Diferencia entre `CMD` y `ENTRYPOINT`, y entre `COPY` y `ADD`.

# Parte F. Defensa oral (15 pts)


Sesión individual de **5 a 7 minutos**. El docente pedirá **en vivo** uno o más de los siguientes cambios:

- Cambiar el puerto expuesto de la API y volver a levantar el servicio.
- Modificar el mapper/reducer para otra agregación (por ejemplo, de suma a promedio, o agregar un filtro por mes).
- Borrar el volumen de la base de datos, levantar de nuevo y recargar los resultados.
- Explicar línea por línea una sección del Dockerfile o del compose.

Se evalúa: que el cambio funcione (8 pts), claridad de la explicación (4 pts) y diagnóstico ante errores (3 pts).


---


# Estructura de entrega


```javascript
examen-p2-<matricula>/
├── README.md              # cómo levantar, evidencias y comparativa
├── .gitignore             # incluye *.csv
├── .env.example
├── docker-compose.yml
├── hadoop/
│   └── Dockerfile
├── mapreduce/
│   ├── mapper.py
│   ├── reducer.py
│   └── secuencial.py
├── api/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app.py
├── scripts/
│   └── cargar_resultados.py
└── evidencias/            # capturas o logs
```


El **README** debe incluir: matrícula y pregunta asignada, pasos para reproducir, tiempos medidos, capturas de `hadoop version`, `ssh` sin contraseña, salida del job y respuesta de la API.


---


# Rúbrica resumida (100 pts)

- **A1 Dockerfile Hadoop (10):** Excelente = construye sin errores, variables correctas y `hadoop version` funciona · Suficiente = construye con ajustes manuales · Insuficiente = no construye.
- **A2 Compose (15):** Excelente = tres servicios, red, volumen nombrado, `.env` y `depends_on` · Suficiente = levanta pero falta persistencia o red · Insuficiente = no levanta.
- **B SSH (10):** Excelente = llaves sin contraseña, `ssh localhost` y entre contenedores · Suficiente = solo uno de los dos accesos · Insuficiente = requiere contraseña o no funciona.
- **C1 MapReduce (14):** Excelente = resultado correcto para su pregunta y maneja encabezado/errores · Suficiente = corre con resultado parcialmente correcto · Insuficiente = no corre o responde otra pregunta.
- **C2 Comparativa (6):** Excelente = tiempos medidos, resultados coinciden y explicación fundamentada · Suficiente = tiempos sin explicación · Insuficiente = no se realizó.
- **D Integración (15):** Excelente = carga, endpoints GET y escritura, persistencia demostrada · Suficiente = carga y GET funcionan · Insuficiente = sin integración.
- **E Teoría (15):** 3 pts por pregunta.
- **F Defensa oral (15):** según desglose de la Parte F.

**Penalizaciones:** CSV subido al repositorio (−5) · credenciales en texto plano en el repo (−5) · no reproducible con `docker compose up --build` (−10).


---
