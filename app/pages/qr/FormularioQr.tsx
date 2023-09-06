import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPagina, OtrosColores } from "../../styles/colorsApp";
import ElementInput from "../../components/inputs/ElememtInput";
import {
  regexCodeadas,
  regexDescripcionCorta,
  regexNumerosDecimales,
  regexTitulo,
} from "../../variables/exprecionesRegulares";
import Marcador from "../../models/Marcador";

// * Props
interface FormularioQrProps {
  colors: ColorPagina;
  cerrarModal: () => void;
  otrosColores: OtrosColores;
}

// Todo --> Formulario mapa
const FormularioQr: React.FC<FormularioQrProps> = ({
  colors,
  cerrarModal,
  otrosColores,
}) => {
  // * Variables
  const [isAgregarImg, setAgregarImg] = useState<boolean>(false);

  // * Titulo
  const [informacionQr, setInformacionQr] = useState<string>("");
  const [isInformacionValida, setInformacionValida] = useState<
    boolean | undefined
  >(undefined);

  // * Validar datos
  const isDatosValidos = (): boolean => {
    const listaVal: boolean[] = [isInformacionValida];

    // * Recorremos
    for (let i = 0; i < listaVal.length; i++) {
      // ? Invalido
      if (!listaVal[i]) {
        return false;
      }
    }

    return true;
  };

  return (
    <SafeAreaView>
      {/* Titulo */}
      <ElementInput
        longitudMax={25}
        expresionRegular={regexTitulo}
        valorPlaceholder="Titulo"
        tipoInput={"default"}
        valor={informacionQr}
        isValorValido={isInformacionValida}
        setValorValido={(valido: boolean | undefined) =>
          setInformacionValida(valido)
        }
        setValor={(valor: string) => setInformacionQr(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />

      <Pressable
        disabled={!isDatosValidos()}
        onPress={() => {}}
        style={{
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 16,
          backgroundColor: isDatosValidos()
            ? otrosColores.colorExito
            : otrosColores.colorError,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.color_letra_paginas,
          }}
        >
          Crear Qr
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    // padding: 7,
  },
});

export default FormularioQr;
