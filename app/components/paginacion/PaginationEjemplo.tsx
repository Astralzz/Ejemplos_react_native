import React, { useState, useRef } from "react";
import { StyleProp, View, ViewStyle, Text, Button } from "react-native";
import GlobalStyles from "../../styles/global";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Estilos
const estiloContenedor: StyleProp<ViewStyle> = GlobalStyles.contenedor_centrado;
const Ruta = createNativeStackNavigator();

// * Lista de parámetros de rutas
type ParametrosRutas = {
  Inicio: undefined;
  Pag_id: {
    itemId: number;
    otherParam?: string;
  };
};

// Todo ---> PAGINA DE INICIO

type PaginaInicioProps = {
  navigation: NativeStackNavigationProp<ParametrosRutas, "Inicio">;
};

const PaginaInicio: React.FC<PaginaInicioProps> = ({ navigation }) => {
  return (
    <View style={estiloContenedor}>
      <Text>Inicio</Text>
      <Button
        title="Ir a la paginas por id"
        onPress={() => {
          /* 1. Navegue a la ruta Detalles con parámetros */
          navigation.navigate("Pag_id", {
            itemId: Math.floor(Math.random() * 100),
            otherParam: "Esto solo se vera una ves",
          });
        }}
      />
    </View>
  );
};

// Todo ---> PAGINAS POR ID

type PaginaPorIDProps = {
  route: RouteProp<ParametrosRutas, "Pag_id">;
  navigation: NativeStackNavigationProp<ParametrosRutas, "Pag_id">;
};

const PaginaPorID: React.FC<PaginaPorIDProps> = ({ route, navigation }) => {
  /* 2. Obtener el parámetro */
  const { itemId, otherParam } = route.params;

  return (
    <View style={estiloContenedor}>
      <Text>Pagina {itemId}</Text>
      <Text>id pagina: {JSON.stringify(itemId)}</Text>
      {otherParam && <Text>otro parámetro: {JSON.stringify(otherParam)}</Text>}
      <Button
        title="Crear nueva pagina..."
        onPress={() =>
          navigation.push("Pag_id", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Ir a la pagina A"
        onPress={() => navigation.navigate("Inicio")}
      />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const PaginationEjemplo: React.FC = () => {
  return (
    <Ruta.Navigator initialRouteName="Inicio">
      <Ruta.Screen name="Inicio" component={PaginaInicio} />
      <Ruta.Screen
        name="Pag_id"
        component={PaginaPorID}
        options={{
          title: "Pagina creada",
        }}
      />
    </Ruta.Navigator>
  );
};

export default PaginationEjemplo;
{
  /* <Ruta.Screen name="Home">
{(props) => <HomeScreen {...props} extraData={someData} />}
</Ruta.Screen> */
}
