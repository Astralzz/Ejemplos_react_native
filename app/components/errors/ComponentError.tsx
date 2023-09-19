import React from "react";
import { View, Text } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";

// * Props
interface ComponentErrorProps {
  titulo: string;
  mensaje: string;
  accion?: () => void;
  accionAsync?: () => Promise<void>;
}

// TODO ---> PAGINA CAMARA
const ComponentError: React.FC<ComponentErrorProps> = ({
  mensaje,
  titulo,
  accion,
  accionAsync,
}) => {
  // * Tema
  const { tema } = usarTema();

  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        {
          backgroundColor: tema.colorsPagina.color_fondo_pagina,
        },
      ]}
    >
      {/* Boton y texto */}
      <View style={{ alignItems: "center" }}>
        {/* Titulo */}
        <Text
          style={{
            fontSize: 32,
            color: tema.otros.colorError,
            fontWeight: "bold",
          }}
        >
          {titulo}
        </Text>
        {/* Mensaje */}
        <Text
          style={{
            fontSize: 16,
            color: tema.colorsPagina.color_letra_paginas,
            textAlign: "center",
            padding: 10,
            marginLeft: 12,
            marginRight: 12,
          }}
        >
          {mensaje}
        </Text>
      </View>
    </View>
  );
};

export default ComponentError;
