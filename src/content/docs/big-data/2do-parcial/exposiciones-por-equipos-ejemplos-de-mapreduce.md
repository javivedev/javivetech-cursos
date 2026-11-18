---
title: "Exposiciones por equipos: Ejemplos de MapReduce"
sidebar:
  order: 2
---

:::note
**Objetivo:** cada equipo se convierte en "experto" de uno o varios ejemplos de MapReduce, lo explica al grupo y deja todo en un repositorio de Git para que **cualquier compañero pueda reproducirlo** paso a paso, igual que la práctica [Hadoop Standalone en contenedor Debian](https://app.notion.com/p/3fb96afad3f6804fa666e89ca73962d6).
:::



:::note
**Antes de empezar:** necesitan tener funcionando el contenedor con Hadoop 3.3.6 de la práctica [Hadoop Standalone en contenedor Debian](https://app.notion.com/p/3fb96afad3f6804fa666e89ca73962d6). Ahí también está la tabla con la descripción de todos los ejemplos.
:::



## Temas por equipo


Los ejemplos `grep`, `wordcount` y `sudoku` ya los trabajamos en la práctica; pueden usarlos como referencia para comparar.


| Equipo | Tema                       | Ejemplos                                       | Dificultad | Repositorio |   |
| ------ | -------------------------- | ---------------------------------------------- | ---------- | ----------- | - |
| 1      | Estadística de palabras I  | `wordmean`, `wordmedian`                       | 🟢 Fácil   |             |   |
| 2      | Estadística de palabras II | `wordstandarddeviation`, `multifilewc`         | 🟢 Fácil   |             |   |
| 3      | Agregación                 | `aggregatewordcount`, `aggregatewordhist`      | 🟡 Media   |             |   |
| 4      | Pi por Monte Carlo         | `pi`                                           | 🟢 Fácil   |             |   |
| 5      | Pi por fórmula BBP         | `bbp`, `distbbp`                               | 🟡 Media   |             |   |
| 6      | La suite TeraSort          | `teragen` → `terasort` → `teravalidate`        | 🟡 Media   |             |   |
| 7      | Generar y ordenar datos    | `randomtextwriter`, `randomwriter`, `sort`     | 🟡 Media   |             |   |
| 8      | Puzzles                    | `pentomino` (comparándolo con `sudoku`)        | 🟢 Fácil   |             |   |
| 9      | Retos avanzados            | `secondarysort`, `join` (`dbcount` como bonus) | 🔴 Difícil |             |   |


### 📐 ¿Cómo se forman los equipos según el número de alumnos?


    | Alumnos | Distribución                                    |
    | ------- | ----------------------------------------------- |
    | 25      | 7 equipos de 3 + 2 equipos de 2 (equipos 4 y 8) |
    | 26      | 8 equipos de 3 + 1 equipo de 2 (equipo 4)       |
    | 27      | 9 equipos de 3                                  |
    | 28      | 8 equipos de 3 + 1 equipo de 4 (equipo 6)       |
    | 29      | 7 equipos de 3 + 2 equipos de 4 (equipos 6 y 9) |


    Los equipos de 2 toman los temas más ligeros y los de 4 los más pesados, para que la carga sea pareja.


:::caution
- **Equipo 7:** `randomwriter` y `randomtextwriter` escriben **10 GB por defecto** y pueden llenar el disco del contenedor. Investiguen cómo limitar el tamaño con un parámetro `-D` antes de ejecutarlos.
- **Equipo 9:** `secondarysort` y `join` necesitan datos de entrada con un formato específico (parte del reto es descubrir cuál). `dbcount` requiere una base de datos, por eso es bonus.
:::



## Qué debe incluir la exposición (≈ 10 min)

1. **¿Qué hace?** Explica el ejemplo y da un caso real donde serviría.
2. **¿Cómo funciona?** Explica las fases **Map** y **Reduce** con un diagrama (qué entra, qué emite el map, qué junta el reduce).
3. **Demo en vivo** en el contenedor: comandos, datos de entrada y resultado.
4. **Mini ejercicio** para sus compañeros, con el mismo formato de los ejercicios de la práctica.

## ¿Cómo se trabaja con Docker en el proyecto? 🐳


En este proyecto van a trabajar en **dos lugares distintos**, y es importante no confundirlos:


```text
┌──────────────────────────────┐        docker cp        ┌──────────────────────────────┐
│  💻 TU COMPUTADORA            │  ─────────────────────▶  │  🐳 CONTENEDOR "hadoop"        │
│                              │  ◀─────────────────────  │                              │
│  • Carpeta del repositorio    │                         │  • Debian + Java + Hadoop    │
│  • Git, README, diapositivas  │                         │  • Aquí se EJECUTAN los      │
│  • Aquí se SUBE a GitHub      │                         │    ejemplos de MapReduce     │
└──────────────────────────────┘                         └──────────────────────────────┘
```

- **El contenedor** es donde está Hadoop: ahí corren los ejemplos.
- **Tu computadora** es donde está la carpeta del repositorio: ahí usan Git y suben todo a GitHub.
- Para pasar archivos de un lado a otro se usa el comando `docker cp`.

:::caution
**Todos los comandos de** **`docker`** **se escriben en la terminal de TU COMPUTADORA**, no dentro del contenedor. Si tu prompt dice `hadoop@hadoop` o `root@hadoop`, estás dentro del contenedor; abre otra terminal nueva para usar `docker`.
:::



### Flujo de trabajo recomendado

1. Entran al contenedor y ejecutan el ejemplo hasta que funcione.
2. Copian los resultados del contenedor a la carpeta del repositorio en su computadora.
3. Escriben el README con los comandos que usaron.
4. Suben todo a GitHub.

### 🧰 Comandos de Docker que van a necesitar


    Volver a entrar al contenedor


    Cuando cierras la terminal o apagas la computadora, el contenedor **se detiene, pero no se borra**: Hadoop y tus archivos siguen ahí. Para volver a entrar no uses `docker run` (eso intentaría crear uno nuevo), usa `docker start`:


    ```bash
    docker start -ai hadoop
    ```

    - `-a` → conecta tu terminal al contenedor.
    - `-i` → modo interactivo, para poder escribir comandos.

    Entrarás como `root`. Recuerda cambiar al usuario de Hadoop antes de trabajar:


    ```bash
    su - hadoop
    ```


    Ver si el contenedor existe y si está encendido


    ```bash
    docker ps -a
    ```


    En la columna `STATUS` verás `Up` (encendido) o `Exited` (apagado).


    Abrir una segunda terminal dentro del contenedor


    Útil para la demo: en una terminal corres el ejemplo y en otra revisas los resultados. El contenedor debe estar encendido. El `-u hadoop` hace que entres directo como el usuario `hadoop`:


    ```bash
    docker exec -it -u hadoop hadoop bash
    ```


    Copiar archivos de tu computadora al contenedor


    Por ejemplo, para pasar sus datos de entrada. El formato es `docker cp ORIGEN DESTINO`, y las rutas del contenedor se escriben como `hadoop:/ruta`:


    ```bash
    docker cp datos/. hadoop:/tmp/equipoN/
    ```


    Los archivos copiados así quedan a nombre de `root`. Para que el usuario `hadoop` pueda usarlos, cambia el dueño:


    ```bash
    docker exec -u root hadoop chown -R hadoop:hadoop /tmp/equipoN
    ```


    Copiar resultados del contenedor a tu computadora


    Por ejemplo, para guardar el resultado en la carpeta `resultados/` del repositorio:


    ```bash
    docker cp hadoop:/tmp/salida/part-r-00000 resultados/
    ```


    Si quieres copiar toda la carpeta de salida:


    ```bash
    docker cp hadoop:/tmp/salida resultados/
    ```


:::note
**Nunca ejecuten** **`docker rm hadoop`****.** Ese comando **borra el contenedor** con Hadoop, Java, la configuración y todos sus archivos, y tendrían que repetir toda la práctica de instalación. Por eso también conviene copiar a su computadora (y a GitHub) todo lo importante en cuanto les funcione.
:::



:::note
**Para que su repositorio sea reproducible:** su compañero tendrá el mismo contenedor de la práctica, pero **no tendrá sus archivos**. Por eso el README debe indicar:

1. Qué archivos de `datos/` hay que copiar al contenedor y con qué comando `docker cp`.
2. En qué carpeta del contenedor deben quedar.
3. Qué comandos ejecutar **dentro** del contenedor y cuáles **fuera**.

Un buen truco: en el README marquen cada bloque de código con 💻 (en tu computadora) o 🐳 (dentro del contenedor).
:::



## Entrega en Git 📦


Cada equipo crea **un repositorio público en GitHub** y pega el enlace en la columna "Repositorio" de la tabla. El repositorio debe permitir que **un compañero que no estuvo en la exposición** reproduzca todo solo leyendo el README.


Nombre del repositorio: `bda-equipo-N-tema` (por ejemplo `bda-equipo-4-pi`).


Estructura mínima:


```text
bda-equipo-N-tema/
├── README.md          ← la guía paso a paso (lo más importante)
├── datos/             ← archivos de entrada pequeños (o el comando para descargarlos)
├── scripts/
│   └── ejecutar.sh    ← todos los comandos en orden
├── resultados/        ← salida esperada (part-r-00000 o capturas de pantalla)
├── ejercicio/
│   ├── ejercicio.md   ← el mini ejercicio para compañeros
│   └── solucion.md    ← la solución
└── presentacion.pdf   ← las diapositivas
```


### 📝 ¿Qué debe tener el `README.md`?

    1. **Integrantes** del equipo.
    2. **Descripción** del ejemplo y caso de uso real.
    3. **Requisitos:** contenedor de la práctica con Hadoop 3.3.6 funcionando.
    4. **Paso a paso:** cada comando en su propio bloque de código, con una explicación de qué hace (igual que la práctica).
    5. **Resultado esperado:** qué debe ver el compañero si todo salió bien.
    6. **Explicación de Map y Reduce** del ejemplo (puede ir con imagen del diagrama).
    7. **Errores comunes** que les salieron a ustedes y cómo los resolvieron.

### 🧰 Comandos básicos de Git para subir el proyecto


    Crea el repositorio vacío en GitHub y luego, desde la carpeta del proyecto en tu computadora:


    Inicializa Git en la carpeta:


    ```bash
    git init
    ```


    Agrega todos los archivos:


    ```bash
    git add .
    ```


    Guarda los cambios con un mensaje:


    ```bash
    git commit -m "Primera versión de la práctica"
    ```


    Conecta tu carpeta con el repositorio de GitHub (cambia la URL por la tuya):


    ```bash
    git remote add origin https://github.com/USUARIO/bda-equipo-N-tema.git
    ```


    Sube los archivos:


    ```bash
    git push -u origin main
    ```


    Para que todos los integrantes puedan subir cambios, el dueño del repositorio debe agregarlos en **Settings → Collaborators**.


:::note
**No suban al repositorio:** el archivo `hadoop-3.3.6.tar.gz`, carpetas de salida grandes ni archivos de más de 50 MB (GitHub rechaza archivos de más de 100 MB). Si sus datos son grandes, suban solo una muestra pequeña o el comando para generarlos o descargarlos.
:::



## Prueba de reproducibilidad 🔁


Después de las exposiciones, **cada equipo reproduce el repositorio del equipo siguiente** (el 1 reproduce al 2, el 2 al 3… y el 9 al 1) usando solo su README. Si algo no funciona, abren un **Issue** en GitHub explicando el problema, y el equipo dueño tiene que corregirlo.


Así se comprueba que el repositorio de verdad se puede reproducir, que es la meta de toda la entrega.


## Rúbrica de evaluación


| Criterio                                                                   | Puntos  |
| -------------------------------------------------------------------------- | ------- |
| Explicación clara del ejemplo y su caso de uso                             | 15      |
| Explicación de las fases Map y Reduce (con diagrama)                       | 20      |
| Demo en vivo funcionando                                                   | 15      |
| Repositorio completo y reproducible (README, scripts, resultados)          | 25      |
| Mini ejercicio con solución                                                | 10      |
| Reproducción del repositorio de otro equipo (con Issues si hubo problemas) | 15      |
| **Total**                                                                  | **100** |
