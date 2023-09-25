import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPagina, OtrosColores } from "../../styles/colorsApp";
import ElementInput from "../../components/inputs/ElememtInput";
import {
  regexMatricula,
  regexNombre,
  regexTelefono,
} from "../../variables/exprecionesRegulares";
import Usuario from "../../models/usuarios/Usuario";

// * Props
interface FormularioQrProps {
  colors: ColorPagina;
  otrosColores: OtrosColores;
  crearUsuario: (usuario: Usuario) => void;
}

// Todo --> Formulario mapa
const FormularioUsuario: React.FC<FormularioQrProps> = ({
  colors,
  otrosColores,
  crearUsuario,
}) => {
  // * Nombre
  const [nombre, setNombre] = useState<string | null>(null);
  const [isNombreValido, setNombreValido] = useState<boolean | undefined>(
    undefined
  );

  // * Matricula
  const [matricula, setMatricula] = useState<string | null>(null);
  const [isMatriculaValida, setMatriculaValida] = useState<boolean | undefined>(
    undefined
  );

  // * Color de fondo QR
  const [telefono, setTelefono] = useState<string | null>(null);
  const [isTelefonoValido, setTelefonoValido] = useState<boolean | undefined>(
    undefined
  );

  // * Validar datos
  const isDatosValidos = (): boolean => {
    const listaVal: boolean[] = [
      isNombreValido,
      isMatriculaValida,
      isTelefonoValido || telefono === null || telefono === "",
    ];

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
      {/* Nombre */}
      <ElementInput
        longitudMax={120}
        expresionRegular={regexNombre}
        valorPlaceholder="Nombre"
        tipoInput={"default"}
        valor={nombre}
        isValorValido={isNombreValido}
        setValorValido={(valido: boolean | undefined) =>
          setNombreValido(valido)
        }
        setValor={(valor: string) => setNombre(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />

      {/* Matricula */}
      <ElementInput
        longitudMax={8}
        expresionRegular={regexMatricula}
        valorPlaceholder="Matricula"
        tipoInput={"numeric"}
        valor={matricula}
        isValorValido={isMatriculaValida}
        setValorValido={(valido: boolean | undefined) =>
          setMatriculaValida(valido)
        }
        setValor={(valor: string) => setMatricula(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />

      {/* Telefono */}
      <ElementInput
        longitudMax={10}
        expresionRegular={regexTelefono}
        valorPlaceholder="Telefono"
        tipoInput={"phone-pad"}
        valor={telefono}
        isValorValido={isTelefonoValido}
        setValorValido={(valido: boolean | undefined) =>
          setTelefonoValido(valido)
        }
        setValor={(valor: string) => setTelefono(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />

      {/* Boton de crear */}
      <Pressable
        disabled={!isDatosValidos()}
        onPress={() => {
          const usuario: Usuario = {
            nombre: nombre,
            matricula: matricula,
            telefono: isTelefonoValido ? telefono : null,
          };

          crearUsuario(usuario);
        }}
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
          Crear usuario
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

export default FormularioUsuario;
