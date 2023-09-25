import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Usuario from "../../models/usuarios/Usuario";
import BotonIcono from "../../components/botones/BotonIcono";
import * as Clipboard from "expo-clipboard";

// * Props
interface TarjetaUsuarioProps {
  usuario: Usuario;
  colorLetra: string;
}

// Todo --> Tarjeta
const TarjetaUsuario: React.FC<TarjetaUsuarioProps> = ({
  usuario,
  colorLetra,
}) => {
  // * Copiar
  const copiarAlPortaPapeles = async (): Promise<void> => {
    // ? Existe
    if (usuario.matricula) {
      // Copiamos
      await Clipboard.setStringAsync(usuario.matricula);
      Alert.alert("Exito ✅", "El texto se copio correctamente 😊");
      return;
    }

    // ! Error
    Alert.alert("Erro 🔴", "No se encontró la matricula del alumno 🥹");
  };

  return (
    <View style={estilo.caja}>
      {/* Cuerpo de tarjeta */}
      <View style={{ ...estilo.cuerpo, borderColor: colorLetra }}>
        {/* Nombre */}
        {usuario.nombre && (
          <Text
            style={{
              ...estilo.texto_encabezado,
              marginRight: 9,
              fontSize: 17,
              color: colorLetra,
            }}
          >
            {usuario.nombre}
          </Text>
        )}

        {/* Telefono */}
        {usuario.telefono && (
          <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
            {`Telefono: ${usuario.telefono}`}
          </Text>
        )}

        {/* Pie de tarjeta */}
        <View
          style={{
            ...estilo.caja_pie,
            backgroundColor: "rgba(252,203,0, 0.3)",
          }}
        >
          {/* Matricula */}
          <Text
            style={{
              ...estilo.texto_encabezado,
              color: colorLetra,
              fontSize: 17,
            }}
          >
            {`${usuario.matricula || "N/A"}`}
          </Text>

          {/* Boton de copiado */}
          {usuario.matricula && (
            <BotonIcono
              onPress={copiarAlPortaPapeles}
              icono={"copy"}
              color={colorLetra}
              estiloExtra={{ borderWidth: 0 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

// * Tarjeta
const estilo = StyleSheet.create({
  caja: {
    margin: 5,
  },
  cuerpo: {
    borderWidth: 0.5,
  },
  encabezado: {
    height: 250,
    borderRadius: 10,
  },
  texto_encabezado: {
    margin: 5,
  },
  caja_boton: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  caja_pie: {
    marginTop: 9,
    bottom: 0,
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TarjetaUsuario;
