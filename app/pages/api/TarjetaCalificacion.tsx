import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CalificacionAlumno from "../../models/alumno/Calificacion";

// * Aprobado
type Aprobado =
  | "rgba(0,139,2, 0.3)"
  | "rgba(184,0,2, 0.3)"
  | "rgba(252,203,0, 0.3)";

// * Obtener estado
const colorMateria = (calificacion: string): Aprobado => {
  // ? Se puede numerar?
  if (calificacion && !isNaN(Number(calificacion))) {
    return parseInt(calificacion) < 70
      ? "rgba(184,0,2, 0.3)"
      : "rgba(0,139,2, 0.3)";
  }

  // Desconocido
  return "rgba(252,203,0, 0.3)";
};

// * Props
interface TarjetaCalificacionProps {
  calificacion: CalificacionAlumno;
  colorLetra: string;
}

// Todo --> Tarjeta
const TarjetaCalificacion: React.FC<TarjetaCalificacionProps> = ({
  calificacion,
  colorLetra,
}) => {
  // isAprobado =

  return (
    <View style={estilo.caja}>
      {/* Cuerpo de tarjeta */}
      <View style={{ ...estilo.cuerpo, borderColor: colorLetra }}>
        {/* Nombre de etapa */}
        {calificacion.nomfase && (
          <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
            {calificacion.nomfase}
          </Text>
        )}

        {/* Nombre de materia */}
        <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
          {calificacion.nomentmat}
        </Text>

        {/* Fecha de examen*/}
        <View style={estilo.caja_boton}>
          {/* Fecha */}
          <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
            {`FECHA: ${calificacion.fecha_examen}`}
          </Text>
        </View>

        {/* Pie de tarjeta */}
        <View
          style={{
            ...estilo.caja_pie,
            backgroundColor: colorMateria(calificacion.calactexm || "N/A"),
          }}
        >
          {/* Calificacion */}
          <Text style={{ ...estilo.texto_encabezado, color: colorLetra }}>
            {`Calificacion: ${calificacion.calactexm || "N/A"}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

// * Tarjeta
const estilo = StyleSheet.create({
  caja: {
    margin: 5,
  },
  cuerpo: {
    borderWidth: 0.5,
  },
  encabezado: {
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
    marginTop: 9,
    bottom: 0,
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default TarjetaCalificacion;
