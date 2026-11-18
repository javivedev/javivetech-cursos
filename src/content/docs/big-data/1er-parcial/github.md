---
title: "GITHUB"
sidebar:
  order: 5
---

Durante el curso utilizaremos **GitHub** para almacenar proyectos, llevar el control de versiones del código y entregar algunas de las prácticas realizadas en clase.


## **1. Crear una cuenta**


Ingresa a **GitHub**:


👉 https://github.com/


Selecciona **Sign up** y realiza el proceso de registro.


### **Recomendaciones**

- Utiliza un correo electrónico al que tengas acceso.
- Elige un **nombre de usuario profesional** y fácil de identificar.
- Evita nombres de usuario ofensivos o poco apropiados para un entorno académico/profesional.
- Guarda tus datos de acceso.
- Verifica tu correo electrónico para activar correctamente la cuenta.

💡 **¿Ya tienes una cuenta de GitHub?**


No necesitas crear otra. Puedes utilizar tu cuenta actual.


## **2. Verificar tu perfil**


Una vez creada tu cuenta:

1. Inicia sesión en GitHub.
2. Entra a tu perfil.
3. Copia la URL de tu perfil.

Ejemplo:


`https://github.com/tu-usuario`


## **3. Evidencia**


Entrega en **Google Classroom**:


✅ Enlace de tu perfil de GitHub.


Ejemplo: `https://github.com/tu-usuario`


⚠️ **No entregues tu contraseña.** Únicamente se solicita el enlace público de tu perfil.


## **3. Configurar Git en tu computadora**


Para trabajar con GitHub desde la línea de comandos, primero debes instalar **Git** y configurar tu identidad.


### **🪟 Windows**

1. Descarga e instala Git desde:

👉 https://git-scm.com/downloads/win

1. Durante la instalación puedes conservar las opciones predeterminadas.
2. Abre **PowerShell**, **Windows Terminal** o **Git Bash**.
3. Comprueba que Git esté instalado:

```bash
git --version
```


---


### **🍎 macOS**


Abre **Terminal** y ejecuta:


```bash
git --version
```


Si Git no está instalado, macOS te solicitará instalar las herramientas de línea de comandos de Xcode.


También puedes instalarlas manualmente con:


```bash
xcode-select --install
```


Después vuelve a comprobar:


```bash
git --version
```


---


### **🐧 Ubuntu / Debian**


Abre una terminal y ejecuta:


```bash
sudo apt update
sudo apt install git -y
```


Comprueba la instalación:


```bash
git --version
```


---


### **🐧 Fedora**


```bash
sudo dnf install git
```


Comprueba la instalación:


```bash
git --version
```


---


## **4. Configurar tu identidad en Git**


Git necesita saber quién realiza los cambios en los proyectos.


Configura tu nombre:


```bash
git config --global user.name "Tu Nombre"
```


Configura el correo electrónico asociado a tu cuenta de GitHub:


```bash
git config --global user.email "tu-correo@ejemplo.com"
```


Ejemplo:


```bash
git config --global user.name "Juan Pérez"
git config --global user.email "juan@email.com"
```


Comprueba la configuración:


```bash
git config --global --list
```


Deberás observar, entre otros datos:


```text
user.name=Juan Pérez
user.email=juan@email.com
```


⚠️ Utiliza preferentemente el mismo correo electrónico que tienes registrado en GitHub.


---


## **5. Vincular tu computadora con GitHub** 


```bash
gh auth login
```


![image](/javivetech-cursos/notion-images/big-data/3d696afa-d3f6-802e-9fd9-f5e776304722.png)


## **🖥️ Opción 2 — GitHub Desktop (Recomendada)**


La forma más sencilla de vincular tu computadora con tu cuenta de GitHub es mediante **GitHub Desktop**.


### **1. Descargar GitHub Desktop**


Ingresa al sitio oficial:


👉 https://desktop.github.com/


Descarga e instala la versión correspondiente a tu sistema operativo.


💡 **Nota:** GitHub Desktop está disponible oficialmente para **Windows y macOS**. En Linux utilizaremos Git desde terminal.


---


### **2. Iniciar sesión**


Abre **GitHub Desktop** y selecciona:


**Sign in to GitHub.com**


Se abrirá tu navegador.

1. Inicia sesión con la cuenta de GitHub que creaste.
2. Autoriza a GitHub Desktop cuando se solicite.
3. Regresa a GitHub Desktop.

---


### **3. Configurar tu identidad**


GitHub Desktop puede solicitarte confirmar el **nombre y correo electrónico** que se utilizarán en tus commits.


Utiliza:

- **Name:** tu nombre.
- **Email:** preferentemente el correo asociado a tu cuenta de GitHub.

Puedes revisar esta configuración posteriormente en:


**GitHub Desktop → Settings/Preferences → Git**


---


### **4. Comprobar la vinculación**


En GitHub Desktop verifica que aparezca tu cuenta de GitHub en:


**Settings/Preferences → Accounts**


Si aparece tu usuario, la vinculación se realizó correctamente.


✅ **Listo. Tu computadora ya puede trabajar con tus repositorios de GitHub mediante GitHub Desktop.**


---


### **📸 Evidencia**


Entrega una captura de **GitHub Desktop** donde se observe que tu cuenta está correctamente vinculada.


⚠️ No compartas tu contraseña, tokens de acceso ni ningún otro dato sensible en la captura.
