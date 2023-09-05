import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPagina } from "../../styles/colorsApp";

// * Props
interface FormularioMapaProps {
  colors: ColorPagina;
}

// Todo --> Formulario mapa
const FormularioMapa: React.FC<FormularioMapaProps> = ({ colors }) => {
  // * Variables
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [longitud, setLongitud] = useState<string>("");
  const [latitud, setLatitud] = useState<string>("");

  return (
    <SafeAreaView>
      {/* Titulo */}
      <TextInput
        style={{
          ...styles.input,
          borderColor: colors.color_letra_paginas,
          color: colors.color_letra_paginas,
        }}
        placeholderTextColor={colors.color_letra_paginas}
        onChangeText={setTitulo}
        placeholder="Titulo"
        value={titulo}
        keyboardType="default"
      />
      {/* Descripcion */}
      <TextInput
        style={{
          ...styles.input,
          borderColor: colors.color_letra_paginas,
          color: colors.color_letra_paginas,
        }}
        placeholderTextColor={colors.color_letra_paginas}
        onChangeText={setDescripcion}
        value={descripcion}
        placeholder="Descripcion"
        keyboardType="default"
      />
      {/* Longitud */}
      <TextInput
        style={{
          ...styles.input,
          borderColor: colors.color_letra_paginas,
          color: colors.color_letra_paginas,
        }}
        placeholderTextColor={colors.color_letra_paginas}
        onChangeText={setLongitud}
        value={longitud}
        placeholder="Longitud"
        keyboardType="numbers-and-punctuation"
      />
      {/* Latitud */}
      <TextInput
        style={{
          ...styles.input,
          borderColor: colors.color_letra_paginas,
          color: colors.color_letra_paginas,
        }}
        placeholderTextColor={colors.color_letra_paginas}
        onChangeText={setLatitud}
        value={latitud}
        placeholder="Latitud"
        keyboardType="numbers-and-punctuation"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 7,
  },
});

export default FormularioMapa;
