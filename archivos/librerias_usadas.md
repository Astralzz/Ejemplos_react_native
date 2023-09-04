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
