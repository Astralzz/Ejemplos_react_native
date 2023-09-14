import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorPagina, OtrosColores } from "../../styles/colorsApp";
import ElementInput from "../../components/inputs/ElememtInput";
import * as ImagePicker from "expo-image-picker";
import { regexDatosQr } from "../../variables/exprecionesRegulares";
import ModalColorPicker from "../../components/modals/ModalColorPicker";
import { abrirSeleccionDeImagenes } from "../../functions/promesas";
import Icon from "react-native-vector-icons/Ionicons";
import ComponentModal from "../../components/modals/ComponentModal";
import { ComponentQrProps } from "../../components/oters/ComponentQr";

// * Props
interface FormularioQrProps {
  colors: ColorPagina;
  otrosColores: OtrosColores;
  crearQr: (data: ComponentQrProps) => void;
}

// Todo --> Formulario mapa
const FormularioQr: React.FC<FormularioQrProps> = ({
  colors,
  otrosColores,
  crearQr,
}) => {
  // * Titulo
  const [informacionQr, setInformacionQr] = useState<string>("");
  const [isInformacionValida, setInformacionValida] = useState<
    boolean | undefined
  >(undefined);

  // * Color deñ QR
  const [colorQr, setColorQr] = useState<string>("black");
  const [isModalColorQrPicker, setModalColorQrPicker] =
    useState<boolean>(false);

  // * Color de fondo QR
  const [colorFondoQr, setColorFondoQr] = useState<string>("white");
  const [isModalColorFondoQrPicker, setModalColorFondoQrPicker] =
    useState<boolean>(false);

  // * Imagen
  const [imgSeleccionada, setImgSeleccionada] =
    useState<ImagePicker.ImagePickerResult | null>(null);
  const [isModalImg, setModalImg] = useState<boolean>(false);

  // * Cuerpo de la img
  const CuerpoImagen: React.FC = () => {
    return (
      <View style={{}}>
        {/* // ? Existe */}
        {imgSeleccionada ? (
          <Image
            source={{ uri: imgSeleccionada.assets[0].uri }}
            style={{
              height: 400,
            }}
          />
        ) : (
          <></>
        )}
      </View>
    );
  };

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
        longitudMax={120}
        expresionRegular={regexDatosQr}
        valorPlaceholder="Contenido"
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
        noFilas={3}
        isTextArea
      />

      {/* Colores */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          margin: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Color del QR */}
        <Text
          style={{
            color: colors.color_letra_paginas,
            marginRight: 10,
          }}
        >
          Qr
        </Text>
        <Pressable
          onPress={() => setModalColorQrPicker(true)}
          style={{
            height: "100%",
            width: 60,
            backgroundColor: colorQr,
            marginRight: 40,
          }}
        ></Pressable>
        {/* {-----} */}
        {/* Color de fondo */}
        <Text
          style={{
            color: colors.color_letra_paginas,
            marginRight: 10,
          }}
        >
          Fondo
        </Text>
        <Pressable
          onPress={() => setModalColorFondoQrPicker(true)}
          style={{
            height: "100%",
            width: 60,
            backgroundColor: colorFondoQr,
          }}
        ></Pressable>
      </View>

      {/* Imagen */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Boton seleccionar img */}
        <Pressable
          onPress={async () => {
            // Obtenemos img
            const img: ImagePicker.ImagePickerResult | null =
              await abrirSeleccionDeImagenes();

            // ? No es null
            if (img) {
              setImgSeleccionada(img);
            }
          }}
          style={{
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: colors.color_letra_paginas,
            marginRight: 25,
          }}
        >
          <Text
            style={{
              color: colors.color_letra_paginas,
              margin: 10,
            }}
          >
            Seleccionar logo
          </Text>
        </Pressable>
        {/* Boton de ver */}
        <Pressable
          onPress={() => setModalImg(true)}
          style={{
            borderWidth: 0.5,
            borderColor: imgSeleccionada
              ? colors.color_letra_paginas
              : otrosColores.colorError,
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Icon
            name="eye-outline"
            size={30}
            color={
              imgSeleccionada
                ? colors.color_letra_paginas
                : otrosColores.colorError
            }
            style={{
              margin: 5,
            }}
          />
        </Pressable>
        {/* Boton de eliminar */}
        <Pressable
          disabled={!imgSeleccionada}
          onPress={() => setImgSeleccionada(null)}
          style={{
            borderWidth: 0.5,
            borderColor: imgSeleccionada
              ? colors.color_letra_paginas
              : otrosColores.colorError,
            alignItems: "center",
          }}
        >
          <Icon
            name="trash-outline"
            size={30}
            color={
              imgSeleccionada
                ? colors.color_letra_paginas
                : otrosColores.colorError
            }
            style={{
              margin: 5,
            }}
          />
        </Pressable>
      </View>

      {/* Boton de crear */}
      <Pressable
        disabled={!isDatosValidos()}
        onPress={() => {
          const t: number = 350;

          crearQr({
            datos: informacionQr,
            tamano: t,
            colorFondo: colorFondoQr,
            color: colorQr,
            logo:
              imgSeleccionada &&
              imgSeleccionada.assets &&
              imgSeleccionada.assets[0]
                ? {
                    img: imgSeleccionada.assets[0],
                    tamano: t / 4,
                  }
                : undefined,
          });
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
          Crear Qr
        </Text>
      </Pressable>

      {/* Modal color qr */}
      <ModalColorPicker
        titulo={"Color del qr"}
        visible={isModalColorQrPicker}
        cerrarModal={() => setModalColorQrPicker(false)}
        cambiarColor={(c) => setColorQr(c)}
      />

      {/* Modal color fondo qr */}
      <ModalColorPicker
        titulo={"Color del fondo qr"}
        visible={isModalColorFondoQrPicker}
        cerrarModal={() => setModalColorFondoQrPicker(false)}
        cambiarColor={(c) => setColorFondoQr(c)}
      />

      {/* Modal img */}
      <ComponentModal
        Cuerpo={CuerpoImagen}
        cerrarModal={() => setModalImg(false)}
        titulo="Logo Qr"
        visible={isModalImg}
      />
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
