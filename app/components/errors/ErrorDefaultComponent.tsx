import React from "react";
import { View, Text } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import ComponentQr from "../../components/oters/ComponentQr";

// TODO ---> PAGINA CAMARA
const ErrorDefaultComponent: React.FC = () => {
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
          Error 404
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
          La pagina a la que se intenta acceder no existe
        </Text>
      </View>
    </View>
  );
};

export default ErrorDefaultComponent;
