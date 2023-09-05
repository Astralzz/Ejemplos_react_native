import React, { Dispatch, SetStateAction, useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextStyle,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { usarTema } from "../theme/TemaApp";

// * Props
interface ElementInputProps {
  longitudMax: number;
  expresionRegular: RegExp;
  valorPlaceholder?: string;
  estiloExtra?: TextStyle;
  noFilas?: number;
  isTextArea?: boolean;
  tipoInput: KeyboardTypeOptions;
  valor: string;
  isValorValido: undefined | boolean;
  setValorValido: (valido: undefined | boolean) => void;
  setValor: (valor: string) => void;
  isBloquear?: boolean;
  colores: {
    colorLetra: string;
    colorPlaceholder?: string;
  };
}

// Todo ---> Elemento input
const ElementInput: React.FC<ElementInputProps> = (param) => {
  // * Tema
  const { tema } = usarTema();
  const ColorsOtros = tema.otros;

  //Validar con expresión regular
  const validarCadena = (nombre: string): boolean =>
    param.expresionRegular.test(nombre);

  //Validar
  const validar = (valorInput: string): void => {
    // Cambiamos
    param.setValor(valorInput);
    param.setValorValido(undefined);

    //Si el valor es nulo devolvemos
    if (valorInput === "") return;

    //Validamos nombre
    param.setValorValido(validarCadena(valorInput));
  };

  return (
    <TextInput
      style={{
        ...styles.input,
        ...param.estiloExtra,

        color: param.colores.colorLetra,
        borderBottomWidth: 0.5,
        borderBottomColor:
          param.isValorValido === undefined
            ? param.colores.colorLetra
            : param.isValorValido
            ? ColorsOtros.colorExito
            : ColorsOtros.colorError,
      }}
      editable={!param.isBloquear}
      multiline={param.isTextArea}
      maxLength={param.longitudMax}
      numberOfLines={param.noFilas ?? 1}
      placeholderTextColor={param.colores.colorPlaceholder}
      onChangeText={(t) => validar(t)}
      value={param.valor}
      placeholder={param.valorPlaceholder}
      keyboardType={param.tipoInput}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: "auto",
    margin: 10,
    padding: 7,
  },
});

export default ElementInput;
