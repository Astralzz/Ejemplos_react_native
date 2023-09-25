import React, { useState } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPagina, OtrosColores } from "../../styles/colorsApp";
import ElementInput from "../../components/inputs/ElememtInput";
import {
  regexCodeadas,
  regexDescripcionCorta,
  regexTitulo,
} from "../../variables/exprecionesRegulares";
import Marcador from "../../models/Marcador";

// * Props
interface FormularioMapaProps {
  colors: ColorPagina;
  otrosColores: OtrosColores;
  agregarMarcador: (marcador: Marcador) => void;
  cerrarModal: () => void;
}

// Todo --> Formulario mapa
const FormularioMapa: React.FC<FormularioMapaProps> = ({
  colors,
  otrosColores,
  agregarMarcador,
  cerrarModal,
}) => {
  // * Titulo
  const [titulo, setTitulo] = useState<string>("");
  const [isTituloValido, setTituloValido] = useState<boolean | undefined>(
    undefined
  );

  // * Descripcion
  const [descripcion, setDescripcion] = useState<string>("");
  const [isDescripcionValida, setDescripcionValida] = useState<
    boolean | undefined
  >(undefined);

  // * Longitud
  const [longitud, setLongitud] = useState<string>("");
  const [isLongitudValida, setLongitudValida] = useState<boolean | undefined>(
    undefined
  );

  // * Latitud
  const [latitud, setLatitud] = useState<string>("");
  const [isLatitudValida, setLatitudValida] = useState<boolean | undefined>(
    undefined
  );

  // * Validar datos
  const isDatosValidos = (): boolean => {
    const listaVal: boolean[] = [
      isTituloValido,
      isDescripcionValida === undefined || isDescripcionValida,
      isLatitudValida && !isNaN(Number(latitud)),
      isLongitudValida && !isNaN(Number(longitud)),
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

  // * Crear marcador
  const crearMarcador = (): void => {
    // Agregamos
    agregarMarcador({
      titulo: titulo,
      descripcion: descripcion,
      latitud: Number(latitud),
      longitud: Number(longitud),
    });
    // Cerramos
    cerrarModal();
  };

  return (
    <SafeAreaView>
      {/* Titulo */}
      <ElementInput
        longitudMax={25}
        expresionRegular={regexTitulo}
        valorPlaceholder="Titulo"
        tipoInput={"default"}
        valor={titulo}
        isValorValido={isTituloValido}
        setValorValido={(valido: boolean | undefined) =>
          setTituloValido(valido)
        }
        setValor={(valor: string) => setTitulo(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />
      {/* Descripcion */}
      <ElementInput
        longitudMax={120}
        expresionRegular={regexDescripcionCorta}
        valorPlaceholder="Descripcion"
        tipoInput={"default"}
        valor={descripcion}
        isValorValido={isDescripcionValida}
        setValorValido={(valido: boolean | undefined) =>
          setDescripcionValida(valido)
        }
        setValor={(valor: string) => setDescripcion(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
        isTextArea
        noFilas={4}
      />
      {/* Latitud */}
      <ElementInput
        longitudMax={25}
        expresionRegular={regexCodeadas}
        valorPlaceholder="Latitud"
        tipoInput={"numbers-and-punctuation"}
        valor={latitud}
        isValorValido={isLatitudValida}
        setValorValido={(valido: boolean | undefined) =>
          setLatitudValida(valido)
        }
        setValor={(valor: string) => setLatitud(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />
      {/* Longitud */}
      <ElementInput
        longitudMax={25}
        expresionRegular={regexCodeadas}
        valorPlaceholder="Longitud"
        tipoInput={"numbers-and-punctuation"}
        valor={longitud}
        isValorValido={isLongitudValida}
        setValorValido={(valido: boolean | undefined) =>
          setLongitudValida(valido)
        }
        setValor={(valor: string) => setLongitud(valor)}
        colores={{
          colorLetra: colors.color_letra_paginas,
          colorPlaceholder: colors.color_letra_paginas,
        }}
      />

      <Pressable
        disabled={!isDatosValidos()}
        onPress={crearMarcador}
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
          Aceptar
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

export default FormularioMapa;
