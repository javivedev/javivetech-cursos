---
title: "SSH"
sidebar:
  order: 3
---

## Clase: SSH en un contenedor


**Duración:** 60 minutos · **Nivel:** Principiante


### Objetivo


Crear un contenedor Linux con un servidor SSH, conectarse desde la computadora con el comando `ssh` y practicar comandos básicos. El contenedor solo será accesible desde la propia computadora.


## ¿Qué es SSH?


**SSH (Secure Shell)** es un protocolo de comunicación que permite **conectarse y administrar una computadora o servidor de manera remota y segura**, utilizando una conexión cifrada.


En otras palabras, SSH te permite controlar una computadora desde otra, aunque estén en lugares diferentes, mediante una terminal.


## **1. ¿Cómo funciona SSH?**


Imagina que tienes dos computadoras:

- **Cliente:** tu MacBook, desde donde quieres conectarte.
- **Servidor:** una computadora con Linux ubicada en otra red o en un centro de datos.

La comunicación funciona así:


```docker
       CLIENTE SSH
       💻 MacOS/ Linux / Windows
           |
           | Conexión cifrada
           | Puerto TCP 22
           |
           ▼
       SERVIDOR SSH
       🖥️ Ubuntu Linux
           |
           ▼
    Ejecutar comandos
    Administrar archivos
    Instalar programas
    Configurar servicios
```


### Materiales

- Docker Desktop (Windows/macOS) o Docker Engine (Linux).
- Una terminal: Terminal, PowerShell o Windows Terminal.

### Crear el contenedor Ubuntu


Abre una terminal y crea el contenedor. El puerto SSH queda publicado solo en la computadora local:


```bash
docker run -d --name ubuntu-ssh -p 127.0.0.1:22:22 ubuntu:24.04 sleep infinity
```


Entra al contenedor como administrador e instala el servidor SSH:


```bash
docker exec -it ubuntu-ssh bash
```


instala ssh:


```bash
apt update && apt install -y openssh-server
```


Activa la autenticación por contraseña para este ejercicio e inicia el servidor SSH:


```bash
service ssh start
service ssh status
```


Crea un usuario para conectarte y asígnale una contraseña. Usa una contraseña de práctica, no una que utilices en otros servicios:


```bash
useradd -m -s /bin/bash alumno
passwd alumno
```


Desde otra terminal de tu computadora, conéctate y escribe la contraseña de `alumno` cuando se solicite:


```bash
ssh alumno@127.0.0.1
```


Al terminar, escribe `exit` para cerrar la sesión SSH y elimina el contenedor:


```bash
docker rm -f ubuntu-ssh
```


eliminar ssh-key


```docker
ssh-keygen -R 127.0.0.1
```


---


### Práctica: SSH desde una máquina virtual o con un compañero


También pueden repetir la práctica usando una máquina virtual de Linux en VirtualBox o VMware, o conectándose a un servidor/VPS propio. Conéctense únicamente a equipos propios o para los que tengan autorización explícita.


Opción A: máquina virtual

1. Instala Ubuntu u otra distribución de Linux en VirtualBox o VMware.
2. Configura la red de la máquina virtual para que tu computadora pueda alcanzarla: usa **Adaptador puente (Bridged)** para que tenga presencia en la red local. En modo **NAT**, normalmente tendrás que configurar el reenvío del puerto 22; **Solo-anfitrión (Host-only)** permite conectar desde la computadora anfitriona, pero no necesariamente desde la de un compañero.
3. Dentro de la máquina virtual, instala e inicia el servidor SSH:

```bash
sudo apt update
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
```

1. Averigua la dirección IP de la máquina virtual con `ip addr` o `hostname -I`. Desde la computadora cliente, prueba la conexión:

```bash
ssh usuario@DIRECCION_IP
```


Reemplaza `usuario` por una cuenta existente en la máquina virtual y `DIRECCION_IP` por su dirección IP.


Opción B: conexión con un compañero


Una persona puede ofrecer su máquina virtual como servidor y compartir con el grupo su dirección IP y el nombre de una cuenta creada para la práctica. La otra persona se conecta con `ssh usuario@DIRECCION_IP`. Ambos equipos deben tener conectividad entre sí y el firewall debe permitir SSH (puerto 22). No compartan contraseñas personales; creen una cuenta temporal y elimínenla al terminar.


Opción C: servidor o VPS propio


Si ya tienes un servidor o VPS, usa la dirección IP o el dominio y el usuario que te proporcionó tu proveedor. Por ejemplo:


```bash
ssh usuario@IP_O_DOMINIO
```


En un VPS, comprueba en el panel del proveedor que el acceso SSH esté permitido. Limita el acceso a tu propia IP cuando sea posible, usa claves SSH si el servidor ya está configurado para ello y no publiques claves privadas ni contraseñas. No desactives las protecciones de seguridad del servidor para hacer esta práctica.


Al finalizar, escribe `exit` para cerrar la sesión y apaga la máquina virtual o elimina la cuenta temporal si corresponde.<p />
