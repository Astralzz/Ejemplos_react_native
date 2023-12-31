import React, { useState } from "react";
import { View, Text } from "react-native";
import { usarTema } from "../../components/theme/TemaApp";
import ComponentMaps from "../../components/maps/ComponentMaps";
import * as Location from "expo-location";
import BotonIcono from "../../components/botones/BotonIcono";
import { ScrollView } from "react-native-gesture-handler";
import Marcador from "../../models/Marcador";
import ComponentModal from "../../components/modals/ComponentModal";
import FormularioMapa from "./FormularioMapa";
import { alertaBool } from "../../functions/alerts";

// TODO ---> PAGINA CAMARA
const PaginaMapa: React.FC = () => {
  // * Tema
  const { tema } = usarTema();
  const colors = tema.colorsPagina;
  const colorsOtros = tema.otros;

  // * Variables
  const [isModal, setModal] = useState<boolean>(false);
  const [listaMarcadores, setListaMarcadores] = useState<Marcador[]>([]);
  const [marcadorUbicacion, setMarcadorUbicacion] = useState<Marcador | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  // * Acciones modal
  const cerrarModal = (): void => setModal(false);
  const abrirModal = (): void => setModal(true);
  const agregarMarcador = (marcador: Marcador): void => {
    setListaMarcadores((prevMarcadores) => [...prevMarcadores, marcador]);
  };

  // * Obtener ubicación
  const obtenerUbicacion = async (): Promise<void> => {
    try {
      // * Pedimos permisos
      let { status } = await Location.requestForegroundPermissionsAsync();

      // ? No dio el permiso
      if (status !== "granted") {
        setErrorMsg("Permiso para acceder a la ubicación denegado 🥹");
        return;
      }

      // Obtenemos ubicación
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Marcador
      const miMarcador: Marcador = {
        titulo: "Mi ubicación",
        descripcion: "Mi Ubicacion actual en tiempo real",
        latitud: location.coords.latitude,
        longitud: location.coords.longitude,
        imagenUrl: require("../../assets/imgs/shall.jpg") ?? undefined,
      };

      setMarcadorUbicacion(miMarcador);

      // ! Error
    } catch (error: unknown) {
      console.error(error);
      setLocation(null);
      setErrorMsg("Error al obtener la ubicación 😠");
    }
  };

  const TituloPagina: React.FC = () => {
    // ? Ahi un error
    if (errorMsg) {
      return (
        <Text style={{ marginBottom: 12, color: tema.otros.colorError }}>
          {errorMsg}
        </Text>
      );
    }

    return (
      <View style={{ marginTop: 18, marginBottom: 18, alignItems: "center" }}>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 25,
            color: colors.color_letra_paginas,
          }}
        >
          Mis condenadas
        </Text>
        <Text
          style={{
            color: colors.color_letra_paginas,
          }}
        >{`Latitud: ${location.coords.latitude}`}</Text>
        <Text
          style={{
            color: colors.color_letra_paginas,
          }}
        >{`Longitud: ${location.coords.longitude}`}</Text>
      </View>
    );
  };

  // * Formularios
  const FormularioAgregar: React.FC = () => (
    <FormularioMapa
      colors={colors}
      otrosColores={colorsOtros}
      agregarMarcador={agregarMarcador}
      cerrarModal={cerrarModal}
    />
  );

  // * Vaciar lista
  const vaciarLista = async (): Promise<void> => {
    // Pedimos confirmación
    const res: boolean = await alertaBool(
      "¿Vaciar lista?",
      "Estas seguro de vaciar la lista de marcadores 🥹?",
      "Cancelar",
      "Vaciar"
    );

    // ? Confirmado
    if (res) {
      setListaMarcadores([]);
    }
  };

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: colors.color_fondo_pagina,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Texto */}
        {(location || errorMsg) && <TituloPagina />}

        {/* Mapa */}
        <ComponentMaps
          listaMarcadores={listaMarcadores}
          marcadorUbicacion={marcadorUbicacion}
        />

        {/* Iconos */}
        <View style={{ marginTop: 18, flexDirection: "row" }}>
          {/* Ubicacion */}
          <BotonIcono
            color={colors.color_letra_paginas}
            onPress={obtenerUbicacion}
            icono="locate-sharp"
            estiloExtra={{ marginRight: 12 }}
          />
          {/* Agregar marcador */}
          <BotonIcono
            color={colors.color_letra_paginas}
            onPress={abrirModal}
            icono="add-sharp"
          />
          {/* Eliminar lista */}
          <BotonIcono
            color={colors.color_letra_paginas}
            onPress={vaciarLista}
            icono="trash-sharp"
          />
        </View>
      </ScrollView>

      {/* Modales */}
      <ComponentModal
        titulo={"Agregar marcador"}
        Cuerpo={FormularioAgregar}
        visible={isModal}
        cerrarModal={cerrarModal}
        isOcultarPie
      />
    </View>
  );
};

export default PaginaMapa;
