import axios from "axios";
import {
  API_UAGRO_APP,
  RespuestaApi,
  catchAxiosError,
  comprobarApiUagroApp,
} from "./variables";

// * Proxy
const PROXY_UAGRO_APP = "api/proxy/uagro";

// * Obtener plan de un alumno
export async function apiObtenerPlanAlumno(
  matricula: string
): Promise<RespuestaApi> {
  try {
    // ? Url no encontrada
    if (comprobarApiUagroApp()) {
      throw new Error("No se pudo encontrar la url de la uagro app");
    }

    // Ruta
    let url = `${API_UAGRO_APP}/${PROXY_UAGRO_APP}/planes/alumno/${matricula}`;
    // https://www.uagroapp.uagro.mx/api/proxy/uagro/planes/alumno/15240863

    // Enviamos
    const res = await axios.get(url);

    // ? No existe
    if (!res.data) {
      throw new Error("Los datos del plan son indefinidos");
    }

    // * Éxito
    return {
      estado: true,
      listaPlanesAlumnos: res.data,
    };

    // ! Error
  } catch (er: unknown) {
    return await catchAxiosError(er);
  }
}

// * Obtener calificaciones de un alumno
export async function apiObtenerCalificacionesAlumno(
  matricula: string | null,
  plan: string | null,
  version: string | null
): Promise<RespuestaApi> {
  try {
    // ? Url no encontrada
    if (!comprobarApiUagroApp()) {
      throw new Error("No se pudo encontrar la url de la uagro app");
    }

    // Ruta
    let url = `${API_UAGRO_APP}/${PROXY_UAGRO_APP}/calificaciones/alumno/${matricula}/${plan}/${version}`;
    // https://www.uagroapp.uagro.mx/api/proxy/uagro/calificaciones/alumno/15240863/06/23

    // Enviamos
    const res = await axios.get(url);

    // ? No existe
    if (!res.data) {
      throw new Error("La lista de calificaciones es indefinida");
    }

    // * Éxito
    return {
      estado: true,
      listaCalificacionesAlumno: res.data,
    };

    // ! Error
  } catch (er: unknown) {
    return await catchAxiosError(er);
  }
}