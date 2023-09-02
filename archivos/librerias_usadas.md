# Librerías usadas en el proyecto

## Expo image picker

### Librería para seleccionar imágenes de la galería

[Link oficial](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

    npx expo install expo-image-picker

### Ejemplo de expo image picker

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
