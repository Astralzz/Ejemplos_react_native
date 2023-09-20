import axios from "axios";
import {
  API_UAGRO_APP,
  RespuestaApi,
  catchAxiosError,
  urlNoEncontrada,
} from "./variables";

// * Proxy
const PROXY_UAGRO_APP = "api/proxy/uagro";

// * Obtener plan de un alumno
export async function apiObtenerPlanAlumno(
  matricula: string
): Promise<RespuestaApi> {
  try {
    // ? Url no encontrada
    if (urlNoEncontrada()) {
      throw new Error("No se pudo encontrar la url de la uagro app");
    }

    // Ruta
    let url = `${API_UAGRO_APP}/${PROXY_UAGRO_APP}/planes/alumno/${matricula}`;

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
export async function apiObtenerCalificacionesAlumno(datos: {
  matricula: string;
  plan: string;
  version: string;
}): Promise<RespuestaApi> {
  try {
    // ? Url no encontrada
    if (urlNoEncontrada()) {
      throw new Error("No se pudo encontrar la url de la uagro app");
    }

    // Ruta
    let url = `${API_UAGRO_APP}/${PROXY_UAGRO_APP}/calificaciones/alumno/${datos.matricula}/${datos.plan}/${datos.version}`;

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
