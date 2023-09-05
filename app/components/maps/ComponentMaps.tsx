import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import Marcador from "../../models/Marcador";
// import {
//   DirectionsRenderer,
//   GoogleMap,
//   LoadScript,
// } from "@react-google-maps/api";

// * Props
interface ComponentMapsProps {
  listaMarcadores?: Marcador[];
  marcadorUbicacion?: Marcador;
}

// Todo, Mapa Global
const ComponentMaps: React.FC<ComponentMapsProps> = ({
  listaMarcadores,
  marcadorUbicacion,
}) => {
  // * Destino
  const [destino, setDestino] = useState<Marcador | undefined>(undefined);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomControlEnabled={true}
        showsCompass={true}
        region={
          marcadorUbicacion
            ? {
                latitude: marcadorUbicacion.latitud,
                longitude: marcadorUbicacion.longitud,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }
      >
        {marcadorUbicacion && destino && (
          <Polyline
            coordinates={[
              {
                latitude: marcadorUbicacion.latitud,
                longitude: marcadorUbicacion.longitud,
              },
              {
                latitude: destino.latitud,
                longitude: destino.longitud,
              },
            ]}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}

        {/* Marcador Ubicacion */}
        {marcadorUbicacion && (
          <Marker
            onPress={() => alert(`Latitud: ${marcadorUbicacion.latitud}`)}
            coordinate={{
              latitude: marcadorUbicacion.latitud,
              longitude: marcadorUbicacion.longitud,
            }}
            title={marcadorUbicacion.titulo}
            description={marcadorUbicacion.descripcion ?? ""}
          >
            {marcadorUbicacion.imagenUrl && (
              <Image
                source={marcadorUbicacion.imagenUrl}
                style={{ width: 30, height: 30 }}
              />
            )}
          </Marker>
        )}

        {/* Lista de marcadores */}
        {listaMarcadores &&
          listaMarcadores.length > 0 &&
          listaMarcadores.map((marcador, i) => (
            <Marker
              key={i}
              onPress={() => setDestino(marcador)}
              coordinate={{
                latitude: marcador.latitud,
                longitude: marcador.longitud,
              }}
              title={marcador.titulo}
              description={marcador.descripcion ?? ""}
            >
              {marcador.imagenUrl && (
                <Image
                  source={marcador.imagenUrl}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </Marker>
          ))}
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
