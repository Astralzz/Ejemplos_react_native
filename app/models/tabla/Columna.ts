// * Datos de la columna
interface Columna {
  nombre: string;
  tipoDato: "string" | "number" | "boolean" | "Date";
  isNull?: boolean;
  isUnico?: boolean;
  maxLongitud?: number;
  valorPorDefecto?: string | number | boolean;
  validacionRegex?: RegExp;
  descripcion?: string;
}

export default Columna;
