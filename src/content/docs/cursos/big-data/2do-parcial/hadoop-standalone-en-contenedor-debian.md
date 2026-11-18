---
title: "Hadoop Standalone en contenedor Debian"
sidebar:
  order: 4
---

## ¿Qué es Hadoop Standalone?


Hadoop Standalone, también conocido como modo local o modo embebido, es la forma más básica de ejecutar Hadoop. En este modo:

- Todas las operaciones de MapReduce se ejecutan dentro de un único proceso de Java Virtual Machine (JVM) en tu máquina local.
- No se inician ni se comunican daemons como NameNode, DataNode, ResourceManager o NodeManager.
- El sistema de archivos utilizado es el local del sistema operativo (por ejemplo, ext4 o NTFS), en lugar de HDFS.
- No existe replicación de datos ni tolerancia a fallos: si tu disco local falla, pierdes los datos.

## Información y descarga


[https://hadoop.apache.org/](https://hadoop.apache.org/)


![image](https://bda.josepgarcia.com/_astro/descargahadoop1.CPv_fvna_ZGHh4b.webp)


![image](https://bda.josepgarcia.com/_astro/descargahadoop2.8HhSP1mU_2bAg86.webp)


Vamos a utilizar la versión 3.3.6, nos quedamos con la URL des descarga del tar.gz [https://www.apache.org/dyn/closer.cgi/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz](https://www.apache.org/dyn/closer.cgi/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz)


[Tutorial de ejemplo, instalación en Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-hadoop-in-stand-alone-mode-on-ubuntu-20-04)


:::note
**Note**
En nuestro caso no vamos a utilizar una máquina virtual para ejecutar hadoop, vamos a hacerlo mediante contenedores docker, a partir de una imagen base de debian 12.
:::



:::caution
**Caution**
En esta primera parte no vamos a instalar un servidor Hadoop, vamos a descargarlo y ejecutarlo, pero no iniciarlo como servidor.
:::



## Creación del contenedor


Vamos a crear un contenedor basado en debian 12 y a instalar Java y otras herramientas. En este contenedor vamos a utilizar dos puertos que deben ser accesibles desde el exterior, por lo que debemos mapearlos. _Si creamos un contenedor sin mapear los puertos después no podemos hacerlo de una manera sencilla._

> @todo: Montar un volumen o activar ssh para pasar de manera sencilla hadoop.tar.gz

Terminal window


Puerto 9870 -> webdfs
Puerto 9000 -> hdfs


:::note
**¿Qué hace este comando?** Crea y arranca un contenedor nuevo a partir de la imagen `debian:12`.

- `-it` → modo interactivo: te deja escribir dentro del contenedor como si fuera una terminal normal.
- `--name hadoop` → le pone nombre al contenedor para poder volver a usarlo después (`docker start -ai hadoop`).
- `-p 9870:9870` y `-p 9000:9000` → conectan un puerto de tu computadora con el mismo puerto del contenedor (`tu_máquina:contenedor`).
- `--hostname hadoop` → nombre de la "máquina" dentro del contenedor.
- `bash` → el programa que se abre al entrar: una terminal.
:::



```bash
docker run -it --name hadoop -p 9870:9870 \
  -p 9000:9000 --hostname hadoop debian:12 bash
```


Dentro del contenedor:


:::note
Sabrás que ya estás dentro porque el prompt cambia a algo como `root@hadoop:/#`. Dentro del contenedor eres **root** (administrador), por eso no necesitas `sudo`.
`apt update` descarga la lista actualizada de paquetes disponibles (todavía no instala nada). El `-y` responde "sí" automáticamente a las preguntas.
:::



```bash
apt update -y
```


Ahora actualizamos los paquetes que ya vienen instalados a su versión más reciente:


```bash
apt upgrade -y
```


:::note
La imagen de Debian viene casi vacía, así que instalamos herramientas básicas:

- `openssh-server` → servidor SSH (lo usaremos en el cluster pseudodistribuido).
- `wget` y `curl` → descargar archivos desde internet.
- `sudo` → ejecutar comandos como administrador.
- `vim` y `nano` → editores de texto en terminal (si nunca has usado ninguno, usa `nano`).
- `net-tools` → comandos de red como `ifconfig` y `netstat`.
:::



```bash
apt install -y openssh-server wget sudo vim nano net-tools curl
```


@todo: Si no podemos abrir el puerto 9000, mapearlo


---


# Recordemos el uso del comando `apt`


Actualizar índice de paquetes (para ver si hay nuevas versiones)


```bash
sudo apt update
```


Instalar un paquete o programa


```bash
sudo apt install [package_name]
```


Borrar un paquete


```bash
apt remove [package_name]
```


Borrar un paquete y ficheros de configuración


```bash
apt purge [package_name]
```


Actualizar paquetes a la última versión


```bash
apt upgrade
```


Búsqueda de paquetes


```bash
apt search [text_to_search]
```


"Arreglar" paquetes rotos


```bash
apt -f install
```


Más info en:


[https://www.2daygeek.com/debian-ubuntu-apt-command-guide/](https://www.2daygeek.com/debian-ubuntu-apt-command-guide/)


---


# Instalamos java (OpenJDK)


Terminal window


:::note
Hadoop está escrito en **Java**, así que sin Java no funciona. Instalamos OpenJDK 17, la versión libre del kit de desarrollo de Java.
:::



```bash
apt install -y openjdk-17-jdk
```


Ejecutamos y nos quedamos con el path


:::note
Este comando muestra **dónde quedó instalado Java**. Copia esa ruta en un bloc de notas, la vas a necesitar más adelante para la variable `JAVA_HOME`.
Ojo: para `JAVA_HOME` se usa la ruta **sin** el final `/bin/java`, por ejemplo `/usr/lib/jvm/java-17-openjdk-amd64`.
La ruta termina en `amd64` si tu computadora es Intel/AMD, o en `arm64` si es una Mac con chip M1/M2/M3.
:::



```bash
update-alternatives --config java
```


En mi caso: `/usr/lib/jvm/java-17-openjdk-arm64/bin/java`
Tu path será diferente, mi procesador es arm64, por ejemplo: `/usr/lib/jvm/java-17-openjdk-amd64/bin/java`


![image](/notion-images/big-data/40796afa-d3f6-80b2-8596-d36ef697a324.png)


## Variable $PATH


:::note
**Note**
@todo: Tutorial uso variable path
:::



## Descargamos hadoop


El siguiente paso será descargar y descomprimir hadoop, para ello utilizaremos la carpeta `/opt` (que es una abreviatura de "optional") es proporcionar una ubicación estandarizada y separada para instalar paquetes grandes y complejos, o suites de software, de manera que:

- **No interfieran** con los archivos del sistema operativo que se encuentran en carpetas como `/usr`, `/bin`, `/lib`, etc.
- El software se mantenga **auto-contenido** y fácilmente desinstalable, ya que sus archivos binarios, librerías, documentación, y archivos de configuración a menudo residen completamente bajo el subdirectorio de la aplicación en `/opt`.

Terminal:


Nos movemos a la carpeta `/opt`, donde instalaremos Hadoop:


```bash
cd /opt
```


`wget` descarga el archivo comprimido de Hadoop (unos 700 MB) directo desde los servidores de Apache a la carpeta actual:


```bash
wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
```


Espera mientras se descarga se mirara algo asi:


![image](/notion-images/big-data/40796afa-d3f6-80ae-9dce-d84df4d20ac7.png)


:::note
`tar` descomprime el archivo `.tar.gz` (es como un .zip de Linux). Las letras significan:

- `z` → el archivo está comprimido con gzip (`.gz`).
- `x` → extraer.
- `v` → _verbose_: muestra en pantalla cada archivo que va sacando.
- `f` → el nombre del archivo viene a continuación.

Al terminar tendrás una carpeta nueva llamada `hadoop-3.3.6`.
:::



```bash
tar -zxvf hadoop-3.3.6.tar.gz
```


Se descomprime todo:


![image](/notion-images/big-data/40796afa-d3f6-8005-8e32-e20401b6907b.png)


Creamos un enlace simbólico 


:::note
Un **enlace simbólico** es como un "acceso directo" de Windows. Creamos `/opt/hadoop` que apunta a `/opt/hadoop-3.3.6`. Así siempre usamos la ruta corta `/opt/hadoop`, y si algún día cambiamos de versión solo hay que mover el enlace, no reconfigurar todo.
:::



```bash
ln -s hadoop-3.3.6 hadoop
```


Comprobamos que todo está en su lugar. Deberías ver algo como `hadoop -> hadoop-3.3.6`:


```bash
ls -la
```


## Configuración usuario para hadoop


Creamos un usuario hadoop y configuramos su entorno (path Java)


Terminal 


:::note
Es buena práctica **no ejecutar Hadoop como root**, así que creamos un usuario propio llamado `hadoop`. Te pedirá una contraseña (escríbela aunque no veas los caracteres en pantalla, es normal) y luego datos opcionales como nombre o teléfono: puedes dejarlos vacíos presionando Enter.
:::



```bash
adduser hadoop
```


`chown` cambia el **dueño** de los archivos. Hacemos que el usuario `hadoop` sea dueño de la carpeta de Hadoop; el `-R` aplica el cambio a todo lo que hay dentro (recursivo):


```bash
chown -R hadoop:hadoop /opt/hadoop-3.3.6 /opt/hadoop
```


Verifica que ahora el dueño de las carpetas aparece como `hadoop hadoop`:


```bash
ls -la
```


Cambiamos al usuario `hadoop`. El guion `-` hace que se cargue su entorno completo. El prompt cambiará a `hadoop@hadoop:~$`. **A partir de aquí todos los comandos se ejecutan como este usuario.**


```bash
su - hadoop
```


Edita el archivo `~/.bashrc` y añade al final, ten en cuenta que tu JAVA_HOME será otro


Terminal window


:::note
`~/.bashrc` es un archivo que se ejecuta cada vez que abres una terminal; ahí guardamos las variables de entorno para no escribirlas cada vez. Ábrelo con nano:
:::



```bash
nano ~/.bashrc
```


Baja hasta el final del archivo con las flechas y pega lo siguiente (recuerda cambiar `JAVA_HOME` por la ruta que copiaste antes). Para guardar presiona **Ctrl + O** y Enter, y para salir **Ctrl + X**.


```bash
# JAVA y Hadoop
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-arm64
export HADOOP_HOME=/opt/hadoop
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```


:::note
- `JAVA_HOME` → le dice a Hadoop dónde está instalado Java.
- `HADOOP_HOME` → carpeta donde está instalado Hadoop.
- `HADOOP_CONF_DIR` → carpeta con los archivos de configuración de Hadoop.
- `PATH` → lista de carpetas donde Linux busca los programas. Al agregar `bin` y `sbin` de Hadoop, podemos escribir `hadoop` desde cualquier carpeta en vez de la ruta completa `/opt/hadoop/bin/hadoop`.
:::



Recargamos el archivo:


Terminal 


`source` vuelve a leer el archivo para que los cambios se apliquen **en la terminal que ya tienes abierta**, sin tener que cerrarla:


```bash
source ~/.bashrc
```


Ahora comprobamos que Java y las variables quedaron bien. Si todo ha ido bien, cada comando devolverá un resultado parecido a este:


```bash
java -version
```


```text
openjdk version "17.0.16" 2025-07-15
OpenJDK Runtime Environment (build 17.0.16+8-Debian-1deb12u1)
OpenJDK 64-Bit Server VM (build 17.0.16+8-Debian-1deb12u1, mixed mode, sharing)
```


`echo` imprime el valor de una variable. Al final de la línea deben aparecer `/opt/hadoop/bin` y `/opt/hadoop/sbin`:


```bash
echo $PATH
```


```text
/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/opt/hadoop/bin:/opt/hadoop/sbin
```


```bash
echo $HADOOP_HOME
```


```text
/opt/hadoop
```


![image](/notion-images/big-data/40796afa-d3f6-80c7-a198-fbfeeac1ac75.png)


En este momento ya podremos ejecutar hadoop desde cualquier directorio:


Terminal 


Si este comando funciona significa que el `PATH` quedó bien configurado:


```bash
hadoop version
```


```text
Hadoop 3.3.6
Source code repository https://github.com/apache/hadoop.git -r 1be78238728da9266a4f88195058f08fd012bf9c
Compiled by ubuntu on 2023-06-18T08:22Z
Compiled on platform linux-x86_64
Compiled with protoc 3.7.1
From source with checksum 5652179ad55f76cb287d9c633bb53bbd
This command was run using /opt/hadoop-3.3.6/share/hadoop/common/hadoop-common-3.3.6.jar
```


![image](/notion-images/big-data/40796afa-d3f6-80bb-bba9-f08ae7ab5ffb.png)


Muestra la ayuda con todos los subcomandos disponibles de Hadoop:


```bash
hadoop -h
```


:::note
**Note**
Hadoop es un programa descargado y lo estamos ejecutando, pero no es un servicio, no está siempre en ejecución, lo ejecutamos al llamarlo y se cierra después.
:::



## Directorios dentro de Hadoop


```text
/opt/hadoop/bin -> "ejecutables"
  hadoop, hdfs, mapred, yar

/opt/hadoop/etc -> ficheros de configuracion xml

/opt/hadoop/lib -> librerías nativas

/opt/hadoop/sbin -> scripts, utilidades que me permiten entre otras cosas arrancar y parar hadoop

/opt/hadoop/share -> paquetes, ejemplos ...
```


## Comprobar el funcionamiento


Para comprobar que `mapreduce` funciona, vamos a ejecutar unos ejemplos que podemos encontrar dentro de share.


Terminal 


```bash
cd /opt/hadoop/share/hadoop/mapreduce
```


Podemos ver los ejemplos que se pueden ejecutar ejecutando sobre el paquete de ejemplos mapreduce


:::note
Un archivo `.jar` es un paquete de programas Java (por dentro es como un .zip). Con `jar tf` vemos lo que contiene sin descomprimirlo: `t` = listar contenido, `f` = el archivo viene a continuación. La lista es larga, no te preocupes si no la entiendes toda.
:::



```bash
jar tf hadoop-mapreduce-examples-3.3.6.jar
```


Nos sale un listado de todos los comandos u opciones de este paquete.


Vamos a ejecutar por ejemplo: `org/apache/hadoop/examples/Grep.class`


Preparamos los directorios donde estarán los datos de entrada (en /tmp) y copiamos datos de entrada "demo", por ejemplo ficheros de configuración de hadoop


Creamos la carpeta donde pondremos los datos de entrada:


```bash
mkdir /tmp/entrada
```


```bash
cd /tmp/entrada
```


Copiamos todos los archivos `.xml` de configuración de Hadoop a la carpeta actual. El `*` significa "todos los archivos que terminen en .xml" y el punto `.` significa "aquí, en la carpeta donde estoy":


```bash
cp /opt/hadoop/etc/hadoop/*.xml .
```


Vamos a buscar (tal y como hace grep), las palabras que contengan un determiando texto, en este caso palabras que contengan el texto kms


```bash
cd /opt/hadoop/share/hadoop/mapreduce/
```


Invocamos al paquete de ejemplos, comando grep


:::note
- `hadoop jar` → ejecuta un programa empaquetado en un .jar.
- `hadoop-mapreduce-examples-3.3.6.jar` → el paquete de ejemplos.
- `grep` → el ejemplo que queremos correr.
- `/tmp/entrada` → carpeta con los datos a procesar.
- `/tmp/salida/` → carpeta donde Hadoop guardará el resultado. **No debe existir antes**, Hadoop la crea (ver ERROR 1 al final).
- `'kms'` → el texto que buscamos.

Verás muchas líneas de log en pantalla: es normal, es Hadoop ejecutando las fases map y reduce.
:::



```bash
hadoop jar hadoop-mapreduce-examples-3.3.6.jar grep /tmp/entrada /tmp/salida/ 'kms'
```


Hace una serie de procesos mapper y reducer (lo veremos más adelante)


```bash
cd /tmp/salida/
```


```bash
ls
```


veras:


```text
part-r-00000  _SUCCESS
```


`_SUCCESS` -> ha sido satisfactorio. Es un archivo vacío que solo indica que el trabajo terminó bien.
`part-r-00000` -> contiene el resultado real. La `r` indica que lo generó la fase **reduce**, y `00000` es el número del reducer (aquí solo hubo uno).


¿Cuántas veces ha encontrado la palabra kms?


```bash
cat part-r-00000
```


resultado:


```text
9  kms
```


---


Se trata de un programa básico inicial para comprobar que funciona, podemos hacer lo mismo desde bash:


```bash
cd /tmp/entrada
```


:::note
`egrep kms *` busca "kms" en todos los archivos de la carpeta y el símbolo `|` (pipe) pasa ese resultado a `wc -l`, que cuenta las líneas. Así comparamos el resultado de Hadoop con una herramienta normal de Linux. El número puede no coincidir exactamente: `wc -l` cuenta **líneas** donde aparece la palabra, y Hadoop cuenta **cada aparición**.
:::



```bash
egrep kms * | wc -l
```


## Ejemplos de mapreduce


### ¿Qué es MapReduce?


**MapReduce** es la forma en que Hadoop procesa grandes cantidades de datos. La idea es sencilla: en lugar de que **una sola computadora** procese todo un archivo gigante, el trabajo se **divide en pedazos**, cada pedazo se procesa por separado (incluso en máquinas distintas) y al final se **juntan los resultados**.


:::note
Imagina contar millones de votos. Una sola persona tardaría meses. En cambio:

1. **Map:** en cada casilla, los funcionarios cuentan **solo sus boletas** y anotan: "Candidato A: 1, Candidato B: 1, Candidato A: 1…". Todas las casillas trabajan **al mismo tiempo**.
2. **Shuffle (agrupar):** las actas de todas las casillas se envían y se **agrupan por candidato**.
3. **Reduce:** se **suman** los votos de cada candidato y se obtiene el resultado final.

Nadie tuvo que contar todos los votos solo, y por eso el resultado sale en horas y no en meses. Eso es exactamente lo que hace Hadoop con los datos.
:::



### Las fases, paso a paso


Así se ve con el ejemplo clásico `wordcount`, que cuenta palabras:


```text
ENTRADA              MAP                      SHUFFLE                  REDUCE
(el texto)           (separa y marca)         (agrupa iguales)         (suma)

"hola mundo"   →     (hola, 1)                (adios, [1])         →   adios  1
                     (mundo, 1)          →    (hola,  [1, 1])      →   hola   2
"hola adios"   →     (hola, 1)                (mundo, [1])         →   mundo  1
                     (adios, 1)
```


| Fase               | ¿Qué hace?                                                                                                                   | ¿Quién la programa?     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **Map**            | Lee los datos en pedazos y convierte cada dato en un par **(clave, valor)**. Ejemplo: cada palabra se vuelve `(palabra, 1)`. | El programador          |
| **Shuffle & Sort** | Junta todos los pares que tienen **la misma clave** y los ordena.                                                            | Hadoop, automáticamente |
| **Reduce**         | Recibe cada clave con su lista de valores y los **combina** en un resultado. Ejemplo: suma los unos.                         | El programador          |


:::note
Por eso las carpetas de salida tienen archivos llamados `part-r-00000`: la `r` significa que el archivo lo escribió un **reducer**. Si hubiera 3 reducers trabajando, verías `part-r-00000`, `part-r-00001` y `part-r-00002`.
:::



### ¿Para qué sirve en la vida real?


MapReduce sirve para cualquier problema que se pueda **dividir en partes independientes y luego combinar**. Algunos ejemplos:

- **Buscadores:** contar cuántas páginas mencionan cada palabra para construir el índice de búsqueda (así nació MapReduce en Google).
- **Comercio electrónico:** calcular cuánto vendió cada producto a partir de millones de tickets.
- **Bancos:** revisar millones de transacciones para detectar movimientos sospechosos.
- **Redes sociales:** encontrar los hashtags más usados del día.
- **Servidores:** analizar archivos de log para saber qué errores ocurren más.

:::note
**¿Y en nuestro contenedor?** Como estamos en **modo Standalone**, todo corre en una sola máquina y un solo proceso Java, así que no notarás la velocidad. Pero **el programa es exactamente el mismo**: si mueves estos ejemplos a un cluster de 100 máquinas, Hadoop repartiría el trabajo sin que cambies una sola línea de código. Eso lo veremos en los siguientes temas.
:::



### Los ejemplos que trae Hadoop


Hadoop incluye un paquete con programas de ejemplo ya hechos, en el archivo `hadoop-mapreduce-examples-3.3.6.jar`. Sirven para **probar que Hadoop funciona** y para **aprender cómo se ve un trabajo MapReduce** sin tener que programar nada todavía.


Todos se ejecutan con la misma estructura (desde la carpeta `/opt/hadoop/share/hadoop/mapreduce`):


```bash
hadoop jar hadoop-mapreduce-examples-3.3.6.jar NOMBRE_DEL_EJEMPLO parámetros...
```


:::note
**Truco para investigar un ejemplo:** si ejecutas el paquete **sin indicar un ejemplo**, te muestra la lista de todos los disponibles:
:::



```bash
hadoop jar hadoop-mapreduce-examples-3.3.6.jar
```


Y si escribes el nombre de un ejemplo **sin parámetros**, normalmente te dice qué parámetros necesita. Por ejemplo:


```bash
hadoop jar hadoop-mapreduce-examples-3.3.6.jar pi
```


El fichero de ejemplos hadoop-mapreduce-examples contiene los siguientes:


| Categoría                      | Comando                 | Descripción                                                                                                                                           |
| ------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📝 **Texto y palabras**        | `wordcount`             | Cuenta las palabras de los archivos de entrada.<br>Parámetros: ruta del fichero a contar · directorio de salida donde se crean los ficheros de salida |
|                                | `aggregatewordcount`    | Cuenta las palabras de los archivos de entrada.                                                                                                       |
|                                | `aggregatewordhist`     | Calcula el histograma de las palabras de los archivos de entrada.                                                                                     |
|                                | `multifilewc`           | Cuenta las palabras de varios archivos.                                                                                                               |
|                                | `grep`                  | Cuenta las coincidencias de una expresión regular en la entrada.                                                                                      |
|                                | `wordmean`              | Calcula la longitud media de las palabras de los archivos de entrada.                                                                                 |
|                                | `wordmedian`            | Calcula la mediana de la longitud de las palabras de los archivos de entrada.                                                                         |
|                                | `wordstandarddeviation` | Calcula la desviación estándar de la longitud de las palabras de los archivos de entrada.                                                             |
| 🥧 **Cálculo de Pi**           | `pi`                    | Calcula Pi mediante un método cuasi Monte Carlo.                                                                                                      |
|                                | `bbp`                   | Usa una fórmula Bailey-Borwein-Plouffe para calcular los dígitos exactos de Pi.                                                                       |
|                                | `distbbp`               | Usa una fórmula de tipo BBP para calcular los bits exactos de Pi.                                                                                     |
| 📊 **Generación y ordenación** | `randomwriter`          | Escribe 10 GB de datos aleatorios por nodo.                                                                                                           |
|                                | `randomtextwriter`      | Escribe 10 GB de datos de texto aleatorio por nodo.                                                                                                   |
|                                | `sort`                  | Ordena los datos escritos por el escritor aleatorio.                                                                                                  |
|                                | `secondarysort`         | Define una ordenación secundaria para la fase de reducción.                                                                                           |
|                                | `teragen`               | Genera datos para la ordenación de terabytes (terasort).                                                                                              |
|                                | `terasort`              | Ejecuta la ordenación de terabytes (terasort).                                                                                                        |
|                                | `teravalidate`          | Comprueba los resultados de la ordenación de terabytes (terasort).                                                                                    |
| 🗄️ **Datos y uniones**        | `dbcount`               | Cuenta los registros de vistas de página almacenados en una base de datos.                                                                            |
|                                | `join`                  | Realiza una unión de conjuntos de datos ordenados con particiones equiparables.                                                                       |
| 🧩 **Puzzles**                 | `sudoku`                | Soluciona sudokus. El archivo de entrada representa el sudoku a resolver.                                                                             |
|                                | `pentomino`             | Coloca mosaicos para encontrar soluciones a problemas de pentominó.                                                                                   |


:::note
**Exposiciones por equipos:** cada equipo expondrá algunos de estos ejemplos. Los temas, la entrega en Git y la rúbrica están en [Exposiciones por equipos: Ejemplos de MapReduce](https://app.notion.com/p/40796afad3f680128663cdb350dc0fd1).
:::



## Ejercicios ✏️


## **1. Cuenta las veces que aparece la palabra "allowed" en los ficheros de configuración de hadoop.**


Los ficheros de configuración de hadoop son archivos XML, busca todos los archivos y copialos en una carpeta, por ejemplo: /tmp/ejercicio1


:::note
Es casi igual al ejemplo de `kms` que hiciste en **Comprobar el funcionamiento**. Solo cambian dos cosas: la **palabra** que buscas (`allowed`) y las **carpetas** de entrada y salida.


La idea es que practiques el flujo básico de cualquier trabajo de MapReduce:

1. **Preparar los datos** de entrada en una carpeta.
2. **Ejecutar** el programa indicando entrada, salida y qué buscar.
3. **Leer el resultado** que Hadoop deja en la carpeta de salida.
:::



### 🧭 Guía paso a paso (ábrela si te atoras)


    Paso 1. Crear la carpeta de entrada


    Hadoop trabaja leyendo **carpetas completas**, no archivos sueltos. Por eso primero creamos una carpeta donde pondremos los datos:


    ```bash
    mkdir /tmp/ejercicio1
    ```


    Paso 2. Copiar los archivos de configuración


    Los archivos de configuración de Hadoop son los `.xml` que están en `/opt/hadoop/etc/hadoop`. Los copiamos a nuestra carpeta. Recuerda: el `*` significa "todos los archivos que terminen en .xml".


    ```bash
    cp /opt/hadoop/etc/hadoop/*.xml /tmp/ejercicio1/
    ```


    Comprueba que se copiaron. Deberías ver varios archivos como `core-site.xml`, `hdfs-site.xml`, etc.:


    ```bash
    ls /tmp/ejercicio1
    ```


    Paso 3. Ir a la carpeta del paquete de ejemplos


    ```bash
    cd /opt/hadoop/share/hadoop/mapreduce
    ```


    Paso 4. Ejecutar el programa grep


    Usamos exactamente la misma estructura que en el ejemplo de `kms`:


    `hadoop jar` + `paquete` + `programa` + `carpeta de entrada` + `carpeta de salida` + `qué buscar`


    ```bash
    hadoop jar hadoop-mapreduce-examples-3.3.6.jar grep /tmp/ejercicio1 /tmp/salida1 'allowed'
    ```


    :::caution
    **Usa una carpeta de salida nueva** (`/tmp/salida1`). Si usas `/tmp/salida`, que ya existe por el ejemplo de `kms`, Hadoop marcará error. Hadoop **nunca sobrescribe** una carpeta de salida para no borrar resultados por accidente (ver ERROR 1 al final de la página).
    :::
    


    Paso 5. Leer el resultado


    Entra a la carpeta de salida y mira qué generó Hadoop:


    ```bash
    ls /tmp/salida1
    ```


    Deben aparecer `_SUCCESS` (el trabajo terminó bien) y `part-r-00000` (el resultado). Muéstralo con `cat`:


    ```bash
    cat /tmp/salida1/part-r-00000
    ```


    Verás un **número** seguido de la palabra `allowed`. Ese número es la respuesta del ejercicio: las veces que aparece la palabra.


    Paso 6. Comprobar sin Hadoop


    Un buen ingeniero siempre verifica sus resultados. Hagamos el mismo conteo con herramientas normales de Linux:


    ```bash
    grep -o allowed /tmp/ejercicio1/*.xml | wc -l
    ```

    - `grep -o allowed` → muestra cada aparición de la palabra en una línea distinta (la `-o` significa "solo la coincidencia").
    - `| wc -l` → cuenta cuántas líneas salieron.

    El número debería coincidir con el de Hadoop.


    Errores comunes

    - **`Output directory ... already exists`** → la carpeta de salida ya existe. Usa otro nombre o bórrala con `rm -r /tmp/salida1`.
    - **`Input path does not exist`** → la carpeta de entrada está mal escrita o vacía; revísala con `ls /tmp/ejercicio1`.
    - **`cat: ... No such file`** → el trabajo no terminó bien; revisa los mensajes de error que imprimió Hadoop.

### 🤔 Preguntas para reflexionar

    1. ¿Qué tuviste que cambiar respecto al ejemplo de `kms`? ¿Qué se quedó igual?
    2. ¿Por qué crees que Hadoop se niega a escribir en una carpeta de salida que ya existe?
    3. Prueba buscar `Allowed` (con mayúscula). ¿Obtienes el mismo resultado? ¿Por qué?
    4. Si en lugar de unos pocos archivos XML tuvieras 10,000 archivos de 1 GB cada uno, ¿qué ventaja tendría usar Hadoop en vez de `grep` normal?

---


## **2. Resuelve el siguiente sudoku:**


```text
8 5 ? 3 9 ? ? ? ?
? ? 2 ? ? ? ? ? ?
? ? 6 ? 1 ? ? ? 2
? ? 4 ? ? 3 ? 5 9
? ? 8 9 ? 1 4 ? ?
3 2 ? 4 ? ? 8 ? ?
9 ? ? ? 8 ? 5 ? ?
? ? ? ? ? ? 2 ? ?
? ? ? ? 4 5 ? 7 8
```


Pista: `jar tf hadoop-mapreduce-examples-3.3.6.jar | grep -i sudoku`


:::note
No tienes que resolver el sudoku tú. El paquete de ejemplos de Hadoop **ya trae un programa que resuelve sudokus**. Tu trabajo es:

1. Descubrir que ese programa existe.
2. Darle el tablero en el formato que él entiende.
3. Ejecutarlo y leer el resultado.

Esto es lo mismo que harás en el mundo real con Big Data: casi nunca programas todo desde cero, sino que **buscas la herramienta, preparas los datos de entrada y la ejecutas**.
:::



### 🧭 Guía paso a paso (ábrela si te atoras)


    Paso 1. Ubicarte en la carpeta correcta


    El programa vive dentro del archivo `hadoop-mapreduce-examples-3.3.6.jar`. Primero vamos a la carpeta donde está ese archivo:


    ```bash
    cd /opt/hadoop/share/hadoop/mapreduce
    ```


    Para confirmar que estás en el lugar correcto, lista los archivos. Debe aparecer `hadoop-mapreduce-examples-3.3.6.jar`:


    ```bash
    ls
    ```


    :::caution
    Si te sale `No such file or directory`, revisa que escribiste la ruta completa. La carpeta `mapreduce` **no** está en `/opt/hadoop`, está en `/opt/hadoop/share/hadoop/`. Si te pierdes, escribe `pwd` para saber en qué carpeta estás.
    :::
    


    Paso 2. Investigar: ¿existe un programa de sudoku?


    Vamos a buscar dentro del `.jar` cualquier cosa que se llame "sudoku". Este comando tiene dos partes unidas por `|` (pipe):

    - `jar tf ...` → lista **todo** lo que hay dentro del paquete (son cientos de líneas).
    - `grep -i sudoku` → de esa lista, muestra solo las líneas que digan "sudoku". La `-i` hace que no importen mayúsculas o minúsculas.

    ```bash
    jar tf hadoop-mapreduce-examples-3.3.6.jar | grep -i sudoku
    ```


    Deberías ver varias líneas como `org/apache/hadoop/examples/dancing/Sudoku.class`. **Eso confirma que el programa existe.** En la tabla de ejemplos de arriba puedes ver que se ejecuta con el nombre `sudoku`.


    Paso 3. Preparar los datos de entrada


    El programa necesita un archivo de texto con el tablero. Las reglas del formato son:

    - 9 filas, una por línea.
    - 9 valores por fila, separados por un espacio.
    - Las casillas vacías se escriben con `?` (no con 0 ni con espacios en blanco).

    Crea el archivo con nano:


    ```bash
    nano /tmp/sudoku.txt
    ```


    Copia el tablero del ejercicio y pégalo dentro de nano. Luego guarda con **Ctrl + O** y Enter, y sal con **Ctrl + X**.


    Para comprobar que el archivo quedó bien, muéstralo en pantalla con `cat`:


    ```bash
    cat /tmp/sudoku.txt
    ```


    Paso 4. Ejecutar el programa


    Usamos la misma estructura que en el ejemplo de `grep`, pero con otro programa:


    `hadoop jar` + `nombre del paquete` + `nombre del programa` + `datos de entrada`


    ```bash
    hadoop jar hadoop-mapreduce-examples-3.3.6.jar sudoku /tmp/sudoku.txt
    ```


    :::note
    - En `grep` le dimos una **carpeta** de entrada (`/tmp/entrada`). Aquí le damos **un solo archivo** (`/tmp/sudoku.txt`).
    - En `grep` el resultado se guardó en `/tmp/salida`. Aquí **no hay carpeta de salida**: la solución se imprime directamente en la terminal.
    
    Cada programa recibe los parámetros a su manera. Por eso siempre hay que investigar cómo se usa antes de ejecutarlo.
    :::
    


    Paso 5. Leer el resultado


    Si todo salió bien verás tres cosas:

    1. `Solving /tmp/sudoku.txt` → el programa encontró tu archivo.
    2. El tablero completo, con todos los `?` sustituidos por números.
    3. `Found 1 solutions` → cuántas soluciones posibles encontró.

    **Verifica tú mismo:** revisa que los números originales sigan en su lugar (por ejemplo, la primera fila debe empezar con `8 5`).


    Errores comunes

    - **Una fila con más o menos de 9 valores** → revisa que no se haya cortado o duplicado una línea al pegar.
    - **Usar** **`0`** **o dejar huecos en vez de** **`?`** → el programa no entiende las casillas vacías.
    - **`No such file`** → la ruta del archivo está mal escrita; compruébala con `cat /tmp/sudoku.txt`.

### 🤔 Preguntas para reflexionar

    1. ¿Qué diferencia hay entre cómo recibe los datos el programa `grep` y el programa `sudoku`?
    2. ¿Por qué crees que este ejemplo no genera una carpeta de salida con un archivo `part-r-00000`?
    3. Las clases del sudoku están en una carpeta llamada `dancing`. Investiga qué es el algoritmo **Dancing Links** de Donald Knuth. ¿Qué otro ejemplo de la tabla crees que usa el mismo algoritmo?
    4. Cambia un número del tablero original para que tenga un error (por ejemplo, dos `8` en la misma fila). ¿Qué responde el programa?

---


## **3. Cuenta las palabras del libro "Romeo y Julieta"**


[https://raw.githubusercontent.com/lynnlangit/learning-hadoop-and-spark/master/0b-Example-Datasets/shakespeare-davinci/romeo.txt](https://raw.githubusercontent.com/lynnlangit/learning-hadoop-and-spark/master/0b-Example-Datasets/shakespeare-davinci/romeo.txt)


Ejemplo:


[https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html#Source_Code](https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html#Source_Code)


:::note
Vas a usar el programa más famoso de Big Data: **WordCount** (contar palabras). Es el "Hola mundo" de MapReduce. Le das un texto y Hadoop te devuelve **cada palabra distinta y cuántas veces aparece**.


Esta vez los datos no están en tu máquina: primero tendrás que **descargarlos de internet**, que es justo lo que pasa en proyectos reales.


El enlace de "Ejemplo" de arriba lleva al tutorial oficial, donde puedes ver el **código Java** de WordCount y entender cómo funciona por dentro.
:::



### 🧭 Guía paso a paso (ábrela si te atoras)


    Paso 1. Crear la carpeta de entrada y entrar en ella


    ```bash
    mkdir /tmp/ejercicio3
    ```


    ```bash
    cd /tmp/ejercicio3
    ```


    Paso 2. Descargar el libro


    Con `wget` descargamos el texto de Romeo y Julieta a la carpeta actual:


    ```bash
    wget https://raw.githubusercontent.com/lynnlangit/learning-hadoop-and-spark/master/0b-Example-Datasets/shakespeare-davinci/romeo.txt
    ```


    Comprueba que se descargó y echa un vistazo a las primeras 10 líneas con `head`:


    ```bash
    ls
    ```


    ```bash
    head romeo.txt
    ```


    Paso 3. Ir a la carpeta del paquete de ejemplos


    ```bash
    cd /opt/hadoop/share/hadoop/mapreduce
    ```


    Paso 4. Ejecutar WordCount


    Revisa la tabla de ejemplos: `wordcount` necesita dos parámetros, la **carpeta de entrada** y la **carpeta de salida**. Esta vez no hay que decirle qué buscar, porque cuenta todas las palabras.


    ```bash
    hadoop jar hadoop-mapreduce-examples-3.3.6.jar wordcount /tmp/ejercicio3 /tmp/salida3
    ```


    :::note
    - **Fase Map:** Hadoop lee el texto línea por línea, lo parte en palabras y por cada una emite un par `(palabra, 1)`. Por ejemplo: `(Romeo, 1)`, `(love, 1)`, `(Romeo, 1)`…
    - **Fase Reduce:** junta todos los pares de la misma palabra y suma los unos: `(Romeo, 1) + (Romeo, 1)` → `(Romeo, 2)`.
    
    Esta misma idea (dividir el trabajo en pedazos y luego juntar resultados) es la que permite a Hadoop procesar terabytes repartidos en muchas máquinas.
    :::
    


    Paso 5. Ver el resultado


    ```bash
    ls /tmp/salida3
    ```


    El resultado es largo (una línea por cada palabra distinta), así que en vez de `cat` usamos `head` para ver solo las primeras 20 líneas:


    ```bash
    head -20 /tmp/salida3/part-r-00000
    ```


    Cada línea tiene el formato `palabra    número_de_veces`. Verás que las palabras salen **ordenadas alfabéticamente**: es parte de cómo trabaja la fase reduce.


    Paso 6. Sacar conclusiones del resultado


    **¿Cuáles son las 10 palabras más repetidas?** Ordenamos por la segunda columna (`-k2`), de forma numérica (`-n`) y de mayor a menor (`-r`), y mostramos las primeras 10:


    ```bash
    sort -k2 -nr /tmp/salida3/part-r-00000 | head -10
    ```


    **¿Cuántas palabras distintas hay?** Cada línea es una palabra distinta, así que contamos líneas:


    ```bash
    wc -l /tmp/salida3/part-r-00000
    ```


    **¿Cuántas palabras tiene el libro en total?** Sumamos todos los números de la segunda columna con `awk`:


    ```bash
    awk '{suma += $2} END {print suma}' /tmp/salida3/part-r-00000
    ```


    Paso 7. Comprobar sin Hadoop


    `wc -w` cuenta las palabras de un archivo. El número debería coincidir con el total del paso anterior:


    ```bash
    wc -w /tmp/ejercicio3/romeo.txt
    ```


    Errores comunes

    - **`Output directory ... already exists`** → usa otro nombre de salida o bórrala con `rm -r /tmp/salida3`.
    - **`wget: unable to resolve host`** → el contenedor no tiene internet; revisa tu conexión y vuelve a intentar.
    - **Le pasaste el archivo en vez de la carpeta** → a `wordcount` dale `/tmp/ejercicio3`, no `/tmp/ejercicio3/romeo.txt` (aunque también funciona, la buena práctica es usar carpetas).

### 🤔 Preguntas para reflexionar

    1. Busca en el resultado las palabras `Romeo` y `Romeo,` (con coma). ¿Aparecen como palabras distintas? ¿Por qué crees que pasa esto?
    2. ¿Qué cambios harías para que `love`, `Love` y `love!` se contaran como la misma palabra?
    3. Las palabras más repetidas probablemente son `the`, `and`, `I`… Investiga qué son las **stop words** y por qué se eliminan en análisis de texto.
    4. Explica con tus palabras qué hace la fase **Map** y qué hace la fase **Reduce** en este ejercicio.

---


## Entrega en Classroom 📤


:::note
**¿Qué se entrega?** Un solo archivo **PDF** con las capturas de pantalla de tu terminal como evidencia de cada parte de la práctica, más tus respuestas a las preguntas de reflexión.

**Nombre del archivo:** `Practica_Hadoop_Apellido_Nombre.pdf` (por ejemplo `Practica_Hadoop_Lopez_Ana.pdf`).


**Individual:** cada alumno entrega su propio PDF con capturas de **su** contenedor.
:::



:::note
**Importante: firma tus capturas.** Antes de tomar cada captura, ejecuta este comando en la terminal (con tu nombre). Así en cada imagen aparecerán tu nombre, la fecha y la hora. **Las capturas sin nombre no cuentan.**
:::



```bash
echo "Ana López - $(date)"
```


### Evidencias que debe tener el PDF


| # | Parte de la práctica          | ¿Qué debe verse en la captura?                                                                                     | Puntos  |
| - | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------- |
| 1 | Contenedor creado             | La salida de `docker ps -a` en tu computadora, donde aparezca el contenedor `hadoop`.                              | 5       |
| 2 | Java instalado                | La salida de `java -version` dentro del contenedor.                                                                | 5       |
| 3 | Variables de entorno          | La salida de `echo $PATH` y `echo $HADOOP_HOME` como usuario `hadoop` (el prompt debe decir `hadoop@hadoop`).      | 10      |
| 4 | Hadoop funcionando            | La salida de `hadoop version`.                                                                                     | 10      |
| 5 | Ejemplo grep (kms)            | El `ls` de `/tmp/salida` mostrando `_SUCCESS` y `part-r-00000`, y el `cat` con el resultado.                       | 10      |
| 6 | Ejercicio 1 (allowed)         | El resultado de Hadoop (`cat /tmp/salida1/part-r-00000`) y la comprobación con `grep -o allowed ... | wc -l`.      | 15      |
| 7 | Ejercicio 2 (sudoku)          | El `cat /tmp/sudoku.txt` con el tablero y la salida del programa con el tablero resuelto y `Found 1 solutions`.    | 15      |
| 8 | Ejercicio 3 (Romeo y Julieta) | Las 10 palabras más repetidas (`sort ... | head -10`), el total de palabras (`awk`) y la comprobación con `wc -w`. | 15      |
| 9 | Preguntas para reflexionar    | Tus respuestas, escritas con tus palabras, a las preguntas de los 3 ejercicios.                                    | 10      |
|   | **Total**                     |                                                                                                                    | **100** |


### 📄 Estructura sugerida del PDF

    1. **Portada:** nombre, matrícula, grupo, materia y fecha.
    2. **Evidencias 1 a 4 (instalación):** una captura por evidencia, cada una con un título y una línea explicando qué se ve.
    3. **Evidencia 5 (ejemplo grep).**
    4. **Evidencias 6, 7 y 8 (ejercicios):** para cada ejercicio, las capturas y una línea con el resultado obtenido (por ejemplo: _"La palabra allowed aparece N veces"_).
    5. **Preguntas para reflexionar:** las preguntas de cada ejercicio con su respuesta.
    6. **Conclusión:** un párrafo sobre qué aprendiste y qué se te dificultó.

:::note
- [ ] Están las 9 evidencias.
- [ ] En cada captura se ve tu nombre y la fecha.
- [ ] Las capturas se leen bien (no están borrosas ni cortadas).
- [ ] Respondiste todas las preguntas de reflexión.
- [ ] El archivo es PDF y tiene el nombre correcto.
:::



---


## Posibles Errores


**ERROR 1** Si el directorio /tmp/salida ya existe dará error, hay que borrarlo en cada ejecución o cambiarlo


**ERROR 2** `Cannot execute /home/debian/hadoop-3.2.3//libexec/hadoop-config.sh` En .bashrc hemos añadido una barra al final de HADOOP_HOME. Modificar archivo, guardar cambios y luego ejecutar: `source .bashrc` (para que los cambios se apliquen a la sesión)


**ERROR 3** `ERROR: JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64 does not exist` La variable de sesión JAVA_HOME no es correcta, revisa la carpeta de java
