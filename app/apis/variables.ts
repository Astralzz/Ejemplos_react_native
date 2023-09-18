import axios from "axios";
import PlanAlumno from "../models/alumno/Plan";
import CalificacionAlumno from "../models/alumno/Calificacion";
import { ENV_API_UAGRO_APP } from "@env";

// * Apis del servidor
// export const URL_SERVER: string | undefined =
//   process.env.EXPO_PUBLIC_URL_SERVER ?? undefined;
// export const API_URL: string | undefined =
//   process.env.EXPO_PUBLIC_URL_SERVER_API ?? undefined;

// // * Apis del servidor local
export const API_UAGRO_APP: string | undefined = ENV_API_UAGRO_APP;

// Respuestas
export interface RespuestaApi {
  // De estados
  estado: boolean;
  noEstado?: number | string;
  detalles_error?: string;
  // Listas
  listaPlanesAlumnos?: PlanAlumno[];
  listaCalificacionesAlumno?: CalificacionAlumno[];
  // Datos
  PlanAlumno?: PlanAlumno;
  CalificacionAlumno?: CalificacionAlumno;
  // Total filas
  totalFilas?: number;
}

// * Comprobar apis
export const comprobarApiUagroApp = (): boolean => !API_UAGRO_APP;

// * Respuesta axios
export const catchAxiosError = async (er: unknown): Promise<RespuestaApi> => {
  // ? Es error de axios
  if (axios.isAxiosError(er)) {
    // ? Existe response
    if (er.response) {
      return {
        estado: false,
        noEstado: "ERROR " + (er.response.status ?? "DESCONOCIDO"),
        detalles_error: er.response.data?.error,
      };
    } else {
      return {
        estado: false,
        noEstado: "ERROR 500",
        detalles_error: "No se pudo conectar al servidor",
      };
    }
  }

  // ! Errores críticos
  return {
    estado: false,
    noEstado: "ERROR CRITICO",
    detalles_error: er ? String(er) : undefined,
  };
};
