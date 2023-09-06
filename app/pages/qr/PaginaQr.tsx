import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import ComponentQr from "../../components/oters/ComponentQr";
import FormularioQr from "./FormularioQr";
import ComponentModal from "../../components/modals/ComponentModal";

// TODO ---> PAGINA QR
const PaginaQr: React.FC = () => {
  // * Tema
  const { tema } = usarTema();

  // * Variables
  const [isModal, setModal] = useState<boolean>(false);

  // * Acciones modal
  const cerrarModal = (): void => setModal(false);
  const abrirModal = (): void => setModal(true);

  // * Formularios
  const FormularioCrearQr: React.FC = () => (
    <FormularioQr
      colors={tema.colorsPagina}
      otrosColores={tema.otros}
      cerrarModal={cerrarModal}
    />
  );

  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        { backgroundColor: tema.colorsPagina.color_fondo_pagina },
      ]}
    >
      {/* Boton y texto */}
      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={abrirModal}
          style={{
            ...estilo.styleBoton,
            borderColor: tema.colorsPagina.color_letra_paginas,
          }}
        >
          <Text
            style={{
              ...estilo.textBoton,
              color: tema.colorsPagina.color_letra_paginas,
            }}
          >
            Crear QR
          </Text>
        </Pressable>
      </View>

      {/* Modal qr */}
      <ComponentModal
        titulo={"Crear nuevo Qr"}
        Cuerpo={FormularioCrearQr}
        visible={isModal}
        cerrarModal={cerrarModal}
        isOcultarPie
      />
    </View>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  styleBoton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 0.5,
  },
  textBoton: {
    fontSize: 18,
    fontWeight: "normal",
  },
});

export default PaginaQr;
