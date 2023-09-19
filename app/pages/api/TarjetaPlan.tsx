import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PlanAlumno from "../../models/alumno/Plan";
import Icon from "react-native-vector-icons/Ionicons";

// * Props
interface TarjetaPlanProps {
  plan: PlanAlumno;
  colorLetra: string;
  accion: (plan: PlanAlumno) => void;
}

// Todo --> Tarjeta
const TarjetaPlan: React.FC<TarjetaPlanProps> = ({
  plan,
  colorLetra,
  accion,
}) => {
  return (
    <View style={estilo.caja}>
      <View style={{ ...estilo.cuerpo, borderColor: colorLetra }}>
        {/* Nombre de escuela */}
        <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
          {plan.nombre_escuela}
        </Text>
        {/* Periodo */}
        <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
          {plan.nombre_periodo}
        </Text>
        {/* Semestre y boton */}
        <View style={estilo.caja_boton}>
          {/* Semestre */}
          <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
            {`Semestre: ${plan.semestre}`}
          </Text>
          {/* Ver calificaciones */}
          {/* Boton de buscar */}
          <Pressable
            onPress={() => accion(plan)}
            style={{
              ...estilo.boton_ver,
              borderColor: colorLetra,
            }}
          >
            <Icon name="eye-outline" size={25} color={colorLetra} />
          </Pressable>
        </View>

        {/* Pie de tarjeta */}
        <View style={estilo.caja_pie}>
          {/* Nombre del plan */}
          <Text
            style={{
              ...estilo.texto_pie,
              color: colorLetra,
            }}
          >
            {plan.nombre_plan}
          </Text>
        </View>
      </View>
    </View>
  );
};

// * Tarjeta
const estilo = StyleSheet.create({
  caja: {
    // backgroundColor: "red",
    margin: 5,
  },
  cuerpo: {
    margin: 10,
    width: 280,
    // height: 180,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
    borderWidth: 0.5,
  },
  encabezado: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  texto_encabezado: {
    margin: 5,
  },
  caja_boton: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  caja_pie: {
    // position: "absolute",
    marginTop: 9,
    width: 280,
    // height: 50,
    bottom: 0,
    padding: 5,
    backgroundColor: "rgba(0,0,0, 0.3)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  texto_pie: {
    fontSize: 15,
    margin: 5,
  },
  boton_ver: {
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 0.5,
    marginRight: 15,
  },
});

export default TarjetaPlan;
