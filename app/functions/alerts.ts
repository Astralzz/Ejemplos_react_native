import { Alert } from "react-native";

export const alertaBool = async (
  titulo: string,
  mensaje: string,
  textCancelar?: string,
  textConfirmar?: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(titulo, mensaje, [
      {
        text: textCancelar ?? "Cancelar",
        onPress: () => resolve(false),
        style: "cancel",
      },
      {
        text: textConfirmar ?? "Eliminar",
        onPress: () => resolve(true),
      },
    ]);
  });
};
