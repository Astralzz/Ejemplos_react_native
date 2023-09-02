import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import BotonTema from "../../components/botones/BotonTema";
import { coloresClaros } from "../../styles/colorsApp";

// * Tema
type TipoTema = "sunny-outline" | "moon-outline";

// TODO ---> PAGINA CAMARA
const PaginaTema: React.FC = () => {
  // * Tema
  const { tema, alternar: toggleTheme } = usarTema();
  // * Icono
  const [icono, setIcono] = useState<TipoTema>(
    tema === coloresClaros ? "sunny-outline" : "moon-outline"
  );

  // * Al cambiar
  useEffect(() => {
    setIcono(tema === coloresClaros ? "sunny-outline" : "moon-outline");
  }, [tema]);

  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        { backgroundColor: tema.colorsPagina.color_fondo_pagina },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: tema.colorsPagina.color_letra_paginas,
            padding: 25,
            fontSize: 25,
          }}
        >
          {`Tema ${icono === "moon-outline" ? "oscuro" : "claro"}`}
        </Text>
        <BotonTema
          onPress={toggleTheme}
          icono={icono}
          color={tema.colorsPagina.color_letra_paginas}
        />
      </View>
    </View>
  );
};

export default PaginaTema;
