import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// * Estilo
const estilo = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    width: "auto",
    borderWidth: 1,
    borderRadius: 50,
    padding: 12,
  },
  buttonText: {
    fontSize: 32, // =>  a 1rem
  },
});

// * Props
interface BotonMenuProps {
  onPress: () => void;
  color: string;
  icono: string;
}

// Todo. ---> Boton del menu
const BotonTema: React.FC<BotonMenuProps> = ({ onPress, color, icono }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...estilo.button, borderColor: color }}>
        <Icon name={icono} style={{ ...estilo.buttonText, color: color }} />
      </View>
    </TouchableOpacity>
  );
};

export default BotonTema;
