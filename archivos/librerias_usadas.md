# Librerías usadas en el proyecto

## Drawer Navigator

### Menu de navegación en el lateral de la pantalla que se puede abrir y cerrar mediante gestos

Antes de instalar necesita:

- [Getting started](https://reactnavigation.org/docs/getting-started/)
- [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

Lea detalladamente estas ultimas librerías ya que necesitan aun mas.

[Link oficial](https://reactnavigation.org/docs/drawer-navigator/)

    npm install @react-navigation/drawer

Con expo

    npx expo install react-native-gesture-handler react-native-reanimated

Ejemplo en ts

tsx 1:

```tsx

import { createDrawerNavigator } from "@react-navigation/drawer";

// * Variables
const Menu = createDrawerNavigator();

// * Paginas del menu
const paginasMenu: Pagina[] = [
  {
    nombre: "Resumen",
    textoMenu: "Resumen general",
    nombreIcono: "home-sharp",
    componente: ComponentePrueba,
  },
  {
    ...
  .}
];

<Menu.Navigator
  initialRouteName="Inicio"
  drawerContent={(props) => (
    <MenuPrincipal paginas={paginasMenu} drawer={props} />
  )}
>
  {paginasMenu.map((pagina, i) => {
    // Componente
    const Pagina: React.ComponentType<any> = pagina.componente;

    return (
      <Menu.Screen
        key={i}
        name={pagina.nombre}
        options={{
          headerTintColor: tema.colorsEncabezado.color_letra_encabezado,
          headerStyle: {
            backgroundColor: tema.colorsEncabezado.color_fondo_encabezado,
          },
        }}
      >
        {/* Pagina */}
        {() =>
          paramTitulo.includes(pagina.nombre) ? (
            <Pagina
              titulo={pagina.titulo ?? pagina.nombre}
              colors={tema.colorsPagina}
            />
          ) : (
            <Pagina />
          )
        }
      </Menu.Screen>
    );
  })}
</Menu.Navigator>
```

tsx 2:

```tsx
interface MenuCompletoProps {
  drawer: DrawerContentComponentProps;
  paginas: Pagina[];
}

// * Menu completo
const MenuPrincipal: React.FC<MenuCompletoProps> = ({ drawer, paginas }) => {
  // * Variables
  const { tema } = usarTema();
  const colorsMenu: ColorsMenu = tema.colorsMenu;

  // * Estilo
  const estiloMenu: StyleProp<ViewStyle> = {
    ...MenuStyles.cuerpo,
    backgroundColor: colorsMenu.color_menu_principal,
  };

  return (
    <DrawerContentScrollView style={estiloMenu}>
      {/* ENCABEZADO */}
      <EncabezadoMenu
        titulo={"EDAIN JESUS"}
        subtitulo={"daiinxd13@gmail.com"}
        tema={colorsMenu}
      />

      {/* CUERPO */}
      <CuerpoMenu
        paginas={paginas}
        navegador={drawer.navigation}
        tema={colorsMenu}
      />
    </DrawerContentScrollView>
  );
};
```

tsx 3:

```tsx
// * Props
interface CuerpoProps {
  paginas: Pagina[];
  navegador: DrawerNavigationHelpers;
  tema: ColorsMenu;
}

// Todo ---> Menu lateral
const CuerpoMenu: React.FC<CuerpoProps> = ({ paginas, navegador, tema }) => {
  return (
    <View style={Estilo.global}>
      {paginas.map((pagina, i) => {
        return (
          <ItemMenu
            key={i}
            etiqueta={pagina.textoMenu ?? pagina.nombre}
            icono={pagina.nombreIcono}
            accion={() => navegador.navigate(pagina.nombre)}
            tema={tema}
          />
        );
      })}
    </View>
  );
};
```

---

## Expo image picker

### Librería para seleccionar imágenes de la galería y la Camara

[Link oficial](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

    npx expo install expo-image-picker

Ejemplo en ts

```ts
// * Abrir selector de imágenes
const abrirSeleccionDeImagenes = async (): Promise<void> => {
  // Pedimos permiso para acceder a los archivos
  const isPermisos: ImagePicker.MediaLibraryPermissionResponse =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  // ? No se dio el permiso
  if (!isPermisos.granted) {
    Alert.alert(
      "Error",
      "Los permisos para acceder a los archivos son requeridos"
    );
    return;
  }

  // Mostramos el launcher para acceder a la galería y obtenemos la img
  const imgResult: ImagePicker.ImagePickerResult =
    await ImagePicker.launchImageLibraryAsync();

  // ? El usuario cancelo la selección
  if (imgResult.canceled) {
    Alert.alert("Error", "Debes de seleccionar una imagen");
    return;
  }

  // Asignamos valor
  setImgSeleccionada(imgResult);
};
```

Requiere cambios en:

- app.json

```json

app.json ...

 "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "¿Me permites acceder a tu galería? plisse 🤚🏻😊",
          "cameraPermission": "¿Me permites acceder a tu cámara? plisse 🤚🏻😊"
        }
      ]
    ],

...

```

---

## Expo-sharing

### Librería para compartir datos en dispositivos móviles

[Link oficial](https://docs.expo.dev/versions/latest/sdk/sharing/)

    npx expo install expo-sharing

Ejemplo: en ts

```ts
// * Compartir imagen
const compartirImagen = async (): Promise<void> => {
  // Si es compatible
  const isCompatible: boolean = await Sharing.isAvailableAsync();

  // ? No es compatible
  if (!isCompatible) {
    Alert.alert(
      "Error",
      "La opción de compartir no está disponible en este dispositivo"
    );
    return;
  }

  // la img es nula
  if (!imgSeleccionada) {
    Alert.alert("Error", "Aun no as seleccionado una imagen");
    return;
  }

  // Compartimos
  await Sharing.shareAsync(imgSeleccionada.assets[0].uri);
};
```

---

## MapView

### Una biblioteca que proporciona un componente que usa mapas de Google en Android y Apple Maps o Google Maps en iOS

[Link oficial](https://docs.expo.dev/versions/latest/sdk/map-view/)

    npx expo install react-native-maps

Ejemplo: en ts

```ts
import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import Marcador from "../../models/Marcador";

// * Props
interface ComponentMapsProps {
  listaMarcadores?: Marcador[];
  marcadorUbicacion?: Marcador;
}

// Todo, Mapa Global
const ComponentMaps: React.FC<ComponentMapsProps> = ({
  listaMarcadores,
  marcadorUbicacion,
}) => {
  // * Destino
  const [destino, setDestino] = useState<Marcador | undefined>(undefined);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomControlEnabled={true}
        showsCompass={true}
        region={
          marcadorUbicacion
            ? {
                latitude: marcadorUbicacion.latitud,
                longitude: marcadorUbicacion.longitud,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }
      >
        {marcadorUbicacion && destino && (
          <Polyline
            coordinates={[
              {
                latitude: marcadorUbicacion.latitud,
                longitude: marcadorUbicacion.longitud,
              },
              {
                latitude: destino.latitud,
                longitude: destino.longitud,
              },
            ]}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}

        {/* Marcador Ubicacion */}
        {marcadorUbicacion && (
          <Marker
            onPress={() => alert(`Latitud: ${marcadorUbicacion.latitud}`)}
            coordinate={{
              latitude: marcadorUbicacion.latitud,
              longitude: marcadorUbicacion.longitud,
            }}
            title={marcadorUbicacion.titulo}
            description={marcadorUbicacion.descripcion ?? ""}
          >
            {marcadorUbicacion.imagenUrl && (
              <Image
                source={marcadorUbicacion.imagenUrl}
                style={{ width: 30, height: 30 }}
              />
            )}
          </Marker>
        )}

        {/* Lista de marcadores */}
        {listaMarcadores &&
          listaMarcadores.length > 0 &&
          listaMarcadores.map((marcador, i) => (
            <Marker
              key={i}
              onPress={() => setDestino(marcador)}
              coordinate={{
                latitude: marcador.latitud,
                longitude: marcador.longitud,
              }}
              title={marcador.titulo}
              description={marcador.descripcion ?? ""}
            >
              {marcador.imagenUrl && (
                <Image
                  source={marcador.imagenUrl}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </Marker>
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 1,
    width: "80%",
    height: "50%",
    // flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default ComponentMaps;
```

Requiere cambios en:

- app.json

```json

app.json ...

{
  "expo": {

    .....

    "plugins": [
      .....
    ],
    "ios": {
     .....
    },
    "android": {
      "adaptiveIcon": {
        ........
      },
      ......
      "config": {
        "googleMaps": {
          "apiKey": "XXXXXXXXXXXXXXXXXX"
        }
      }
    },
    "web": {
      .......
    },

    ......

  }
}


```

---

## Expo BarCodeScanner

### Una biblioteca que permite escanear una variedad de códigos de barras compatibles

Está disponible tanto como una biblioteca independiente como como una extensión para la cámara de exposición

[Link oficial](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/)

    npx expo install expo-barcode-scanner

Ejemplo: en ts

```ts
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Pressable } from "react-native";
import {
  BarCodeScannedCallback,
  BarCodeScanner,
  BarCodeScannerResult,
} from "expo-barcode-scanner";
import { ColorPagina, OtrosColores } from "../../styles/colorsApp";
import Icon from "react-native-vector-icons/Ionicons";

// * Props
interface EscanerQRProps {
  colors: ColorPagina;
  otrosColores: OtrosColores;
}

// Todo -> Componente para escanear códigos QR
const EscanerQR: React.FC<EscanerQRProps> = ({ colors, otrosColores }) => {
  // * Variables
  const [isTienePermiso, setTienePermiso] = useState<boolean | null>(null);
  const [isEscaneado, setEscaneado] = useState<boolean>(false);
  const [dataEscaner, setDataEscaner] = useState<{
    tipo: string;
    data: string;
  } | null>(null);

  // * Al iniciar
  useEffect(() => {
    // Obtener permisos
    const obtenerPermisosBarCodeScanner = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setTienePermiso(status === "granted");
      } catch (error: unknown) {
        Alert.alert("Error 🔴", `Error al escanear ${String(error)} 🥹`);
      }
    };

    // Obtenemos
    obtenerPermisosBarCodeScanner();
  }, []);

  // * Manejador de escáner
  const manejarEscaneoCodigo = (
    resultadoEscaner: BarCodeScannerResult
  ): BarCodeScannedCallback => {
    try {
      // Escaneado
      setEscaneado(true);

      // Datos escaneados
      setDataEscaner({
        tipo: resultadoEscaner.type,
        data: resultadoEscaner.data,
      });

      return;
    } catch (error: unknown) {
      setEscaneado(false);
      setDataEscaner(null);
      Alert.alert("Error 🔴", `Error al escanear ${String(error)} 🥹`);
    }
  };

  // ? Es nulo
  if (isTienePermiso === null) {
    return (
      <Text style={{ color: colors.color_letra_paginas }}>
        Solicitando permiso de la cámara...
      </Text>
    );
  }
  // ? No tiene permiso
  if (isTienePermiso === false) {
    return (
      <Text style={{ color: colors.color_letra_paginas }}>
        No hay acceso a la cámara.
      </Text>
    );
  }

  return (
    <View style={styles.contenedor}>
      {/* Esta escaneado */}
      {isEscaneado ? (
        // Vista
        <View>
          {/* // ?Tiene datos */}
          {dataEscaner && (
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Tipo de dato */}
              <Text
                style={{ marginBottom: 20, color: colors.color_letra_paginas }}
              >
                Tipo de escáner: {` ${dataEscaner.tipo}`}
              </Text>
              {/* Contenido del qr */}
              <Text
                style={{
                  marginBottom: 40,
                  color: colors.color_letra_paginas,
                }}
              >{`Contenido: ${dataEscaner.data}`}</Text>
            </View>
          )}

          {/* Boton de escanear de nuevo */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() => {
                setEscaneado(false);
                setDataEscaner(null);
              }}
            >
              <Icon
                name="reload-sharp"
                size={40}
                color={colors.color_letra_paginas}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        // Escaner qr
        <BarCodeScanner
          onBarCodeScanned={isEscaneado ? undefined : manejarEscaneoCodigo}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

// * Estilos
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    width: "auto",
    height: 400,
  },
});

export default EscanerQR;
```

---

## Qrcode-svg

### Un generador de código QR para React Native basado en React-Native-SVG y JavaScript-QrCode

[Link oficial](https://www.npmjs.com/package/react-native-qrcode-svg)

    npm i react-native-qrcode-svg

Ejemplo: en ts

```ts
import React from "react";
import { View } from "react-native";
import { Alert, ImageSourcePropType } from "react-native";
import QRCode from "react-native-qrcode-svg";

// * Tipo logo qr
export interface StyleLogoQr {
  img: ImageSourcePropType;
  tamano?: number;
  colorFondo?: string;
  radioBorde?: number;
  margen?: number;
}

// * Props
export interface ComponentQrProps {
  datos: string;
  tamano: number;
  tamBorde?: number;
  color?: string;
  colorFondo?: string;
  siDaError?: () => void;
  logo?: StyleLogoQr;
}

// Todo ---> Componente QR
const ComponentQr: React.FC<ComponentQrProps> = ({
  datos,
  tamano,
  tamBorde = 5,
  color = "black",
  colorFondo = "white",
  siDaError,
  logo,
}) => {
  // * Error
  const alDarError = () => {
    if (siDaError) {
      siDaError();
    } else {
      Alert.alert("Error inesperado 🥹", "El QR no se generó correctamente");
    }
  };

  // pre props
  const commonQRProps = {
    onError: alDarError,
    value: datos,
    size: tamano,
    color,
    backgroundColor: colorFondo,
  };

  // ? Con logo
  if (logo) {
    return (
      <View
        style={{
          borderWidth: tamBorde,
          borderColor: logo.colorFondo ?? "white",
        }}
      >
        <QRCode
          {...commonQRProps}
          logo={logo.img}
          logoSize={logo.tamano}
          logoBackgroundColor={logo.colorFondo}
          logoMargin={logo.margen}
          logoBorderRadius={logo.radioBorde}
        />
      </View>
    );
  }

  return <QRCode {...commonQRProps} />;
};

export default ComponentQr;
```

---

## 2

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---

## 3

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---

## 4

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---

## 5

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---

## 6

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---

## 7

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---

## 8

[Link oficial](https://)

    npx ....

Ejemplo: en ts

```ts

```

```json

```

---
