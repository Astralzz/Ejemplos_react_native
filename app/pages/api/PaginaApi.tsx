import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { usarTema } from "../../components/theme/TemaApp";
import ElementInput from "../../components/inputs/ElememtInput";
import { regexMatricula } from "../../variables/exprecionesRegulares";
import Icon from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import { apiObtenerPlanAlumno } from "../../apis/alumno";
import { RespuestaApi } from "../../apis/variables";
import PlanAlumno from "../../models/alumno/Plan";
import { ScrollView } from "react-native-gesture-handler";
import TarjetaPlan from "./TarjetaPlan";

// Todo --> Pagina del api
const PaginaApi: React.FC = () => {
  // * Tema
  const { tema } = usarTema();
  const colorLetra = tema.colorsPagina.color_letra_paginas;

  // * Variables
  const [matricula, setMatricula] = useState<string | null>(null);
  const [isMatriculaValida, setMatriculaValida] = useState<boolean>(false);
  const [listaPlanes, setListaPlanes] = useState<PlanAlumno[]>([]);
  const [isCargando, setCargando] = useState<boolean>(false);

  // * Buscar pla del alumno
  const buscarPlanes = async (): Promise<void> => {
    try {
      setCargando(true);

      // ? Matricula errónea
      if (!matricula || !isMatriculaValida) {
        throw new Error("La matricula es errónea");
      }

      // Buscamos
      const res: RespuestaApi = await apiObtenerPlanAlumno(matricula);

      // ? Es falso
      if (!res.estado) {
        throw new Error(
          res.detalles_error || "No se pudo obtener respuesta del servidor"
        );
      }

      // ? Es falso
      if (!res.listaPlanesAlumnos) {
        throw new Error("No se pudo obtener la lista de planes");
      }

      // Agregamos
      setListaPlanes(res.listaPlanesAlumnos);

      setCargando(false);

      // ! Error
    } catch (e: unknown) {
      setCargando(false);
      Alert.alert("Error 🔴", `Error ${String(e)}, 🥹`);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: tema.colorsPagina.color_fondo_pagina,
      }}
    >
      {/* Titulo */}
      <Text
        style={{
          ...estilo.titulo,
          color: colorLetra,
        }}
      >
        Ejemplo de api
      </Text>
      {/* Encabezado */}
      <View style={estilo.caja_formulario}>
        {/* Formulario */}
        <ElementInput
          longitudMax={8}
          expresionRegular={regexMatricula}
          valorPlaceholder="Introduce tu matricula"
          tipoInput={"numeric"}
          valor={matricula}
          isValorValido={isMatriculaValida}
          setValorValido={setMatriculaValida}
          setValor={setMatricula}
          colores={{
            colorLetra: colorLetra,
            colorPlaceholder: colorLetra,
          }}
          estiloExtra={estilo.formulario}
        />

        {/* Boton de buscar */}
        <Pressable
          onPress={buscarPlanes}
          disabled={!isMatriculaValida || isCargando}
          style={{
            ...estilo.boton_buscar,
            borderColor: isMatriculaValida
              ? tema.otros.colorExito
              : tema.otros.colorError,
            opacity: isMatriculaValida ? 1 : 0.4,
          }}
        >
          <Icon
            name="search"
            size={35}
            color={
              isMatriculaValida ? tema.otros.colorExito : tema.otros.colorError
            }
          />
        </Pressable>
      </View>

      {/* Cuerpo */}
      <View style={estilo.caja_cuerpo}>
        {/* // ? Cargando */}
        {isCargando ? (
          <ActivityIndicator
            style={estilo.cargando}
            size="large"
            color={colorLetra}
          />
        ) : listaPlanes.length > 0 ? (
          <ScrollView>
            <View style={estilo.cuerpo_tarjeta}>
              {listaPlanes.map((plan, i) => {
                return (
                  <TarjetaPlan key={i} plan={plan} colorLetra={colorLetra} />
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <Text
            style={{
              color: colorLetra,
              fontSize: 18,
            }}
          >
            La lista esta vacía
          </Text>
        )}
      </View>
    </View>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  caja_formulario: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  titulo: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 25,
    padding: 7,
    fontWeight: "bold",
  },
  formulario: {
    padding: 3,
    marginTop: 7,
    marginRight: 13,
    height: 50,
  },
  boton_buscar: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 7,
    borderWidth: 0.5,
    height: 50,
    width: 50,
  },
  caja_cuerpo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cargando: {
    // padding: 20,
  },
  cuerpo_tarjeta: {},
});

export default PaginaApi;
