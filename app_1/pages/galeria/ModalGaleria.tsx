import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ModalGaleriaProps {
  visible: boolean;
  cerrarModal: () => void;
  listaImg: ImagePicker.ImagePickerResult[];
}

const ModalGaleria: React.FC<ModalGaleriaProps> = ({
  visible,
  cerrarModal,
  listaImg,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={cerrarModal}
    >
      <View style={estilo.etiloGlobal}>
        <View style={estilo.contenedorModal}>
          {/* Encabezado con color */}
          <View style={estilo.encabezado}>
            <Text style={estilo.encabezadoTexto}>Galeria de Imagenes</Text>
          </View>

          {/* Lista de Imagenes */}
          <ScrollView>
            <View style={estilo.contenedorImgs}>
              {listaImg.map((imagen, index) => (
                <Image
                  key={index}
                  source={{ uri: imagen.assets[0].uri }}
                  style={estilo.imagen}
                />
              ))}
            </View>
          </ScrollView>
          <Pressable
            style={[estilo.button, estilo.botonCerrar]}
            onPress={cerrarModal}
          >
            <Text style={estilo.estiloTexto}>Cerrar Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  etiloGlobal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  contenedorModal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  encabezado: {
    backgroundColor: "#2196F3", // Color de encabezado personalizado
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginBottom: 20,
  },
  encabezadoTexto: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  contenedorImgs: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  imagen: {
    width: "45%",
    height: 150,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  botonCerrar: {
    backgroundColor: "#2196F3",
  },
  estiloTexto: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalGaleria;
