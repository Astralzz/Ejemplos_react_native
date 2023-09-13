import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TriangleColorPicker } from "react-native-color-picker";
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { ScrollView } from "react-native-gesture-handler";
import { usarTema } from "../theme/TemaApp";
import Icon from "react-native-vector-icons/FontAwesome";
import { estilosModal } from "../../styles/global";

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

// * Convertir hexadecimal
function convertirHex(hsvColor: HsvColor | string): string {
  // ? Es de tipo string
  if (typeof hsvColor === "string") {
    return hsvColor;
  }

  const { h, s, v } = hsvColor;
  const rgbColor: RgbColor = convertirRGB(h, s, v);

  const r = Math.round(rgbColor.r * 255);
  const g = Math.round(rgbColor.g * 255);
  const b = Math.round(rgbColor.b * 255);

  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
}

// * Convertir RGB
function convertirRGB(h: number, s: number, v: number): RgbColor {
  let r: number, g: number, b: number;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }

  return { r, g, b };
}

// * Props
interface Props {
  titulo: string;
  visible: boolean;
  cerrarModal: () => void;
  cambiarColor: (c: string) => void;
}

// Todo -> Paleta de colores
const ModalColorPicker: React.FC<Props> = ({
  cerrarModal,
  titulo,
  visible,
  cambiarColor,
}) => {
  // * Color
  const [color, setColor] = useState<HsvColor>(null);

  // * Tema
  const { tema } = usarTema();
  const colorsModal = tema.colorsModal;
  const otros = tema.otros;

  // * Al cambiar
  useEffect(() => {
    setColor(null);
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={cerrarModal}
    >
      <View
        style={{
          ...estilo.contenedorCompleto,
          backgroundColor:
            colorsModal.color_fondo_exterior ?? "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Modal */}
        <View
          style={{
            ...estilo.contenedorModal,
            backgroundColor: colorsModal.color_cuerpo,
          }}
        >
          {/* Encabezado */}
          <View
            style={{
              ...estilo.encabezado,
              backgroundColor: colorsModal.color_encabezado,
            }}
          >
            {/* Titulo */}
            <Text
              style={{
                ...estilo.encabezadoTexto,
                color: colorsModal.color_letra,
              }}
            >
              {titulo}
            </Text>
            {/* Boton de cerrar */}
            <Pressable onPress={cerrarModal} style={estilo.cerrarBoton}>
              <Icon
                name="times"
                size={20}
                color={colorsModal.color_boton_cerrar}
              />
            </Pressable>
          </View>

          {/* // ? -------------------------------- */}

          {/* Cuerpo */}
          <View
            style={{
              ...estilo.cuerpoModal,
              backgroundColor: colorsModal.color_cuerpo,
            }}
          >
            <ScrollView>
              {/* Paleta de colores */}
              <SafeAreaView style={estilo.container}>
                {/* Paleta de color */}
                <View style={estilo.paleta}>
                  {/* Paleta */}
                  <TriangleColorPicker
                    color={color}
                    onColorChange={(color: HsvColor) => setColor(color)}
                    // onColorSelected={(color) => {}}
                    // onOldColorSelected={(color) => {}}
                    hideControls
                    style={{ flex: 1, height: 250 }}
                  />
                </View>

                {/* Cuadro de color */}
                {color && (
                  <Text
                    style={{
                      ...estilo.cuadroColor,
                      backgroundColor: convertirHex(color),
                    }}
                  ></Text>
                )}
              </SafeAreaView>
            </ScrollView>
          </View>

          {/* // ? -------------------------------- */}

          {/* Pie de pagina */}
          <Pressable
            onPress={() => {
              cambiarColor(convertirHex(color));
              cerrarModal();
            }}
            style={{
              ...estilo.aceptarBoton,
              backgroundColor: otros.colorExito,
            }}
          >
            <Text
              style={{
                ...estilo.aceptarBotonTexto,
                color: colorsModal.color_letra,
              }}
            >
              Aceptar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  ...estilosModal,
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paleta: {
    width: "95%",
    padding: "2.5%",
  },
  cuadroColor: {
    height: 32,
    width: "50%",
    fontSize: 22,
    fontWeight: "500",
    marginTop: 5,
    marginBottom: 15,
  },
});

export default ModalColorPicker;
