import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlexStyle,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  AlertButton,
  TouchableOpacity,
} from "react-native";
import AppStyles from "./styles/appStyles";
import imgSh from "./assets/imgs/shall.jpg";

// TODO, APP
const App: React.FC = () => {
  // Contador
  const [cont, setCont] = useState<number>(0);
  const [isContadorAutomatico, setContadorAutomatico] =
    useState<boolean>(false);

  // limpiar
  const limpiar = (): void => {
    if (cont < 1) {
      Alert.alert("Error", "El contador ya esta vació");
      return;
    }

    // boton
    const botonesAlerta: AlertButton[] = [
      {
        text: "Si",
        onPress: () => {
          setCont(0);
        },
      },
      {
        text: "no",
        onPress: () => {
          Alert.alert("Ok", "Operación cancelada");
        },
      },
    ];

    // Pone,os alerta
    Alert.alert("Hola", "¿Quieres limpiar el contador?", botonesAlerta);
  };

  //Contador
  const contadorAutomatico = (): void => {
    // Esta activo
    if (isContadorAutomatico) {
      Alert.alert("Error", "El contador ya esta activo");
      return;
    }

    setContadorAutomatico(true);

    setInterval(() => {
      if (isContadorAutomatico) {
        setCont(cont + 1);
      }
    }, 500);
  };

  return (
    <View style={AppStyles.contenedor}>
      {/* Imagen y su estilo */}
      <Image style={AppStyles.imagen} source={imgSh}></Image>
      {/* Textos y sus estilos */}
      <Text style={AppStyles.texto}>Hola mundo</Text>
      <Text style={AppStyles.texto}>contador: {cont}</Text>
      {/* Botones simples y sin mucha personalización (sin style)*/}
      <Button title="aumentar" onPress={() => setCont(cont + 1)} />
      <Button color={"red"} title="limpiar" onPress={() => limpiar()} />
      {/* Botones con mucho estilo (con style)*/}
      <TouchableOpacity
        onPress={() => contadorAutomatico()}
        style={AppStyles.botones}
      >
        <Text style={{ color: "white" }}>Contador automático</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setContadorAutomatico(false)}
        style={AppStyles.botones}
      >
        <Text style={{ color: "white" }}>Pausar contador</Text>
      </TouchableOpacity>
    </View>
  );
};

// View / div
// Text / p
export default App;
