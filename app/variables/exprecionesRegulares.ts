// * Para nombre
export const regexNombre: RegExp =
  /^(?!\s)([a-zA-ZñÑáéíóúÁÉÍÓÚ_-\s\d]{2,60})(?<!\s)$/;

// * Para titulo
export const regexTitulo: RegExp =
  /^(?!\s)([a-zA-ZñÑáéíóúÁÉÍÓÚ_-\s\d]{2,60})(?<!\s)$/;

// * Para descripcion corta
export const regexDescripcionCorta: RegExp =
  /^([\w\d][\w\d\sZñÑáéíóúÁÉÍÓÚ.,:;!?+_*¡¿/()[\]{}-]{0,120})?$/;

// * Para descripcion
export const regexDescripcion: RegExp =
  /^([\w\d][\w\d\sZñÑáéíóúÁÉÍÓÚ.,:;!?+_*¡¿/()[\]{}-]{0,699})?$/;

// * Para Números enteros
export const regexNumerosEnteros: RegExp = /^[0-9]{1,5}$/;

// * Para Números decimales
export const regexNumerosDecimales: RegExp =
  /^(?:\d{1,8}(?:\.\d{1,8})?|\.\d{1,8})$/;

// * Para Números cordeladas (longitud y latitud)
export const regexCodeadas: RegExp = /^-?(\d{1,3}(?:\.\d+)?|-\.\d+)$/;

// * Para datos de un qr
export const regexDatosQr: RegExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\d\s_\-]{2,120}$/;

// * Para Matricula
export const regexMatricula: RegExp = /^[0-9]{8}$/;