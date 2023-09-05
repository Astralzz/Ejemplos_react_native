import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import Marcador from "../../models/Marcador";

// * Props
interface ComponentMapsProps {
  marcadores?: Marcador[];
}

// Todo, Mapa Global
const ComponentMaps: React.FC<ComponentMapsProps> = ({ marcadores }) => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {marcadores &&
          marcadores.length > 0 &&
          marcadores.map((marcador, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: marcador.latitud,
                  longitude: marcador.longitud,
                }}
                title={marcador.titulo}
                description={marcador.descripcion ?? ""}
              />
            );
          })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 1,
    width: "80%",
    height: "50%",
    // flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default ComponentMaps;
