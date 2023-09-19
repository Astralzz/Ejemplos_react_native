import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Text,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PlanAlumno from "../../models/alumno/Plan";
import ComponentError from "../../components/errors/ComponentError";
import GlobalStyles, { estilosModal } from "../../styles/global";
import { RespuestaApi } from "../../apis/variables";
import { apiObtenerCalificacionesAlumno } from "../../apis/alumno";
import CalificacionAlumno from "../../models/alumno/Calificacion";
import { ScrollView } from "react-native-gesture-handler";
import TarjetaCalificacion from "./TarjetaCalificacion";
import ElementInput from "../../components/inputs/ElememtInput";
import { regexTitulo } from "../../variables/exprecionesRegulares";
import { ColorsModal, OtrosColores } from "../../styles/colorsApp";

// * Totales
interface TotalesCal {
  t: number;
  a: number;
  r: number;
  o: number;
}

// * Props
interface ModalCalificacionesProps {
  isVisible: boolean;
  cerrarModal: () => void;
  colors: {
    pagina: string;
    letra: string;
    colorsModal: ColorsModal;
    otros: OtrosColores;
  };
  datosAlumno?: PlanAlumno & {
    matricula: string | null;
  };
}

// * Tipo de calificacion
const TipoCalificacion = (
  cal: string
): "APROBADAS" | "REPROBADAS" | "OTRAS" => {
  // ? Se puede numerar?
  if (cal && !isNaN(Number(cal))) {
    return parseInt(cal) < 70 ? "REPROBADAS" : "APROBADAS";
  }

  return "OTRAS";
};

// * Calcular totales
const calcularTotales = (lista: CalificacionAlumno[]): TotalesCal => {
  // Dato
  const totales: TotalesCal = { t: 0, a: 0, r: 0, o: 0 };

  // Recorremos
  for (const cal of lista) {
    // Calificacion
    const calificacion = Number(cal.calactexm);

    // ? Se puede numerar
    if (!Number.isNaN(calificacion)) {
      // ? Reprobada
      if (calificacion < 70) {
        totales.r++;
      } else {
        totales.a++;
      }
    } else {
      totales.o++;
    }

    totales.t++;
  }

  return totales;
};

// Todo --> Modal de calificaciones
const ModalCalificaciones: React.FC<ModalCalificacionesProps> = ({
  isVisible,
  cerrarModal,
  colors,
  datosAlumno,
}) => {
  // * Variables
  const [textFiltro, setTextFiltro] = useState<string | null>(null);
  const [isTextFiltroValido, setTextFiltroValido] = useState<boolean>(false);
  const [listaCalificaciones, setListaCalificaciones] = useState<
    CalificacionAlumno[]
  >([]);
  const [isCargando, setCargando] = useState<boolean>(false);
  const [totalesCalif, setTotalesCalif] = useState<TotalesCal>({
    t: 0,
    a: 0,
    r: 0,
    o: 0,
  });
  const [opcionFiltro, setOpcionFiltro] = useState<
    "TOTALES" | "APROBADAS" | "REPROBADAS" | "OTRAS"
  >("TOTALES");

  // * Obtener calificaciones
  const obtenerCalificaciones = async () => {
    try {
      setCargando(true);

      // ? sin datos
      if (!datosAlumno) {
        throw new Error("No se encontraron los datos del alumno");
      }

      // Buscamos
      const res: RespuestaApi = await apiObtenerCalificacionesAlumno({
        matricula: datosAlumno.matricula,
        plan: datosAlumno.clv_plan,
        version: datosAlumno.vrs_plan,
      });

      // ? Es falso
      if (!res.estado) {
        throw new Error(
          res.detalles_error || "No se pudo obtener respuesta del servidor"
        );
      }

      // ? Es falso
      if (!res.listaCalificacionesAlumno) {
        throw new Error("No se pudo obtener la lista de calificaciones");
      }

      // Obtenemos totales
      const totales: TotalesCal = calcularTotales(
        res.listaCalificacionesAlumno
      );

      // Agregamos
      setListaCalificaciones(res.listaCalificacionesAlumno);
      setTotalesCalif(totales);

      setCargando(false);
    } catch (e: unknown) {
      setCargando(false);
      Alert.alert("Error 🔴", `Error ${String(e)}, 🥹`);
    }
  };

  // * Cuerpo modal
  const CuerpoCalf: React.FC = () => {
    // ? Un dato es erróneo
    if (!datosAlumno) {
      return (
        <ComponentError
          titulo="Error"
          mensaje="Los datos del alumno no llegaron correctamente"
        />
      );
    }

    // ? Esta cargando
    if (isCargando) {
      return (
        <View
          style={[
            GlobalStyles.contenedor_centrado,
            {
              backgroundColor: colors.pagina,
            },
          ]}
        >
          <ActivityIndicator
            style={{
              padding: 20,
            }}
            size="large"
            color={colors.letra}
          />
        </View>
      );
    }

    // ? Lista vacía
    if (listaCalificaciones.length < 1) {
      return (
        <ComponentError
          titulo="Sin datos"
          mensaje="La lista de calificaciones esta vacía"
        />
      );
    }

    // Lista de calificaciones
    return (
      <View style={estilo.cuerpo}>
        {/* Encabezado */}
        <View style={estilo.encabezado}>
          {/* Botones de accion */}
          <View style={estilo.caja_botones}>
            {/* Caja 1 */}
            <View style={estilo.caja_sub_botones}>
              {/* Todas la calificaciones */}
              <Pressable
                onPress={() => {
                  // ? Menor a 1
                  if (totalesCalif.t < 1) {
                    Alert.alert(
                      "Advertencia ⚠️",
                      "No tienes calificaciones disponibles"
                    );
                    return;
                  }

                  // Ponemos dato
                  setOpcionFiltro("TOTALES");
                }}
                style={{
                  ...estilo.boton_filtro,
                  backgroundColor: "rgba(212,203,130, 0.3)",
                }}
              >
                <Text style={{ color: colors.letra }}>
                  {`Totales: ${totalesCalif.t}`}
                </Text>
              </Pressable>

              {/* Aprobadas */}
              <Pressable
                onPress={() => {
                  // ? Menor a 1
                  if (totalesCalif.a < 1) {
                    Alert.alert(
                      "Advertencia ⚠️",
                      "No tienes calificaciones aprobadas, mono 🐒"
                    );
                    return;
                  }

                  // Ponemos dato
                  setOpcionFiltro("APROBADAS");
                }}
                style={{
                  ...estilo.boton_filtro,
                  marginLeft: 15,
                  backgroundColor: "rgba(0,139,2, 0.3)",
                }}
              >
                <Text style={{ color: colors.letra }}>
                  {`Aprobadas: ${totalesCalif.a}`}
                </Text>
              </Pressable>
            </View>

            {/* Caja 2 */}
            <View style={estilo.caja_sub_botones}>
              {/* Reprobadas */}
              <Pressable
                onPress={() => {
                  // ? Menor a 1
                  if (totalesCalif.r < 1) {
                    Alert.alert(
                      "Advertencia ⚠️",
                      "No tienes calificaciones reprobadas, genio 🥸"
                    );
                    return;
                  }

                  // Ponemos dato
                  setOpcionFiltro("REPROBADAS");
                }}
                style={{
                  ...estilo.boton_filtro,
                  backgroundColor: "rgba(184,0,2, 0.3)",
                }}
              >
                <Text style={{ color: colors.letra }}>
                  {`Reprobadas: ${totalesCalif.r}`}
                </Text>
              </Pressable>

              {/* Otras */}
              <Pressable
                onPress={() => {
                  // ? Menor a 1
                  if (totalesCalif.o < 1) {
                    Alert.alert(
                      "Advertencia ⚠️",
                      "No tienes calificaciones extras"
                    );
                    return;
                  }

                  // Ponemos dato
                  setOpcionFiltro("OTRAS");
                }}
                style={{
                  ...estilo.boton_filtro,
                  marginLeft: 15,
                  backgroundColor: "rgba(252,203,0, 0.3)",
                }}
              >
                <Text style={{ color: colors.letra }}>
                  {`Otras: ${totalesCalif.o}`}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Lista de calificaciones */}
        <View style={estilo.lista_cal}>
          <ScrollView>
            <View>
              {listaCalificaciones.map((cal, i) => {
                // ? Texto no nulo
                if (textFiltro !== null && textFiltro.length > 1) {
                  // Gramática no valida
                  if (!isTextFiltroValido) {
                    return <React.Fragment key={i} />;
                  }

                  // Es valido
                  const isCalValida: boolean = cal.nomentmat
                    ?.toLowerCase()
                    .includes(textFiltro.toLowerCase());

                  // ? No valido
                  if (!isCalValida) {
                    return <React.Fragment key={i} />;
                  }
                }

                // ? Aprobadas
                if (opcionFiltro !== "TOTALES") {
                  // Vemos el tipo
                  const tipoCal = TipoCalificacion(cal.calactexm);

                  // ? Son iguales
                  if (opcionFiltro !== tipoCal) {
                    return <React.Fragment key={i} />;
                  }
                }

                return (
                  <TarjetaCalificacion
                    key={i}
                    calificacion={cal}
                    colorLetra={colors.letra}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  // * Al cambiar
  useEffect(() => {
    // ? Modal abierto y datos existente
    if (isVisible && datosAlumno) {
      obtenerCalificaciones();
      return;
    }

    setTextFiltro(null);
    setTextFiltroValido(false);
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={cerrarModal}
    >
      <View
        style={{
          ...estilosModal.contenedorCompleto,
          backgroundColor:
            colors.colorsModal.color_fondo_exterior ?? "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Modal */}
        <View
          style={{
            ...estilosModal.contenedorModal,
            backgroundColor: colors.colorsModal.color_cuerpo,
          }}
        >
          {/* Encabezado */}
          <View
            style={{
              ...estilosModal.encabezado,
              backgroundColor: colors.colorsModal.color_encabezado,
            }}
          >
            <Text
              style={{
                ...estilosModal.encabezadoTexto,
                color: colors.colorsModal.color_letra,
              }}
            >
              {`${
                (datosAlumno && datosAlumno.matricula) || "???"
              } - ${opcionFiltro}`}
            </Text>
            {/* Boton de cerrar */}
            <Pressable onPress={cerrarModal} style={estilosModal.cerrarBoton}>
              <Icon
                name="times"
                size={20}
                color={colors.colorsModal.color_boton_cerrar}
              />
            </Pressable>
          </View>

          {/* Cuerpo */}
          <View
            style={{
              ...estilosModal.cuerpoModal,
              backgroundColor: colors.colorsModal.color_cuerpo,
            }}
          >
            {/* Elemento de buscar */}
            {!isCargando && datosAlumno && (
              <ElementInput
                longitudMax={35}
                expresionRegular={regexTitulo}
                tipoInput={"default"}
                valorPlaceholder="buscar materia"
                valor={textFiltro}
                isValorValido={isTextFiltroValido}
                setValorValido={setTextFiltroValido}
                setValor={setTextFiltro}
                colores={{
                  colorLetra: colors.letra,
                  colorPlaceholder: colors.letra,
                }}
              />
            )}

            {/* Cuerpo calificaciones */}
            <ScrollView>
              <CuerpoCalf />
            </ScrollView>
          </View>

          {/* Pie de página o botón "Aceptar" */}
          <Pressable
            onPress={cerrarModal}
            style={{
              ...estilosModal.aceptarBoton,
              backgroundColor: colors.otros.colorExito,
            }}
          >
            <Text
              style={{
                ...estilosModal.aceptarBotonTexto,
                color: colors.colorsModal.color_letra,
              }}
            >
              Aceptar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  cuerpo: {},
  caja_botones: {
    marginTop: 10,
    marginBottom: 10,
  },
  caja_sub_botones: {
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  boton_filtro: {
    padding: 6,
    borderRadius: 15,
  },
  encabezado: {},
  lista_cal: {},
});

export default ModalCalificaciones;
