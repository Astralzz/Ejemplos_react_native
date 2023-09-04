import { Alert } from "react-native";

export const alertaBool = async (
  titulo: string,
  mensaje: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(titulo, mensaje, [
      {
        text: "Cancelar",
        onPress: () => resolve(false),
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: () => resolve(true),
      },
    ]);
  });
};
