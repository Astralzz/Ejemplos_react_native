# TUTORIAL DE REACT NATIVE / EXPO

![alt](https://th.bing.com/th/id/R.7c08d5b556a3838a504dc84a96eb88cc?rik=kB%2fcRCVKle7vMQ&pid=ImgRaw&r=0)

## 1. Programas a instalar

- node.js [(Pagina oficial)](https://nodejs.org/en)
- git [(Pagina oficial)](https://git-scm.com/downloads)
- vs code [(Pagina oficial)](https://code.visualstudio.com/download)
- Expo [(Pagina oficial)](https://expo.dev/)

## 2. Crear proyecto

### Crear nuevo proyecto

    npx create-expo-app --template

### añadir ts al proyecto

[Guía oficial](https://docs.expo.dev/guides/typescript/)

1. Crear un archivo tsconfig.json en la raíz del proyecto:

        tsconfig.json

2. Cambie el nombre de los archivos para convertirlos a TypeScript. Por ejemplo, cambiaría el nombre de App.js a App.tsx

        mv App.js App.tsx

## 3. Comandos importantes

### ejecutar proyecto

    npm start

## 4. Desplegar app

### Desplegar usando expo

1/ Instalar EAS

- Instalamos en consola

        npm install -g eas-cli

- Iniciar sesión

        eas login

- Poner email y pass

        √ Email or username ...
        √ Password ...

2/ Configurar proyecto

En consola

        eas build:configure

3/ Ejecutar en android/ios

- Android

        eas build --platform android

- Ios

        eas build --platform ios

- Ambas

        eas build --platform all

3/ Esperar y éxito

