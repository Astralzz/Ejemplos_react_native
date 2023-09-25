import Tabla from "../tabla/Tabla";

// * Tabla de usuarios
const TablaUsuarios: Tabla = {
  nombre: "usuarios",
  columnas: [
    {
      nombre: "id",
      tipoDato: "number",
      isUnico: true,
    },
    {
      nombre: "nombre",
      tipoDato: "string",
      maxLongitud: 60,
      validacionRegex: '^[a-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{2,60}$'
    },
    {
      nombre: "matricula",
      tipoDato: "string",
      maxLongitud: 8,
      isUnico: true,
      validacionRegex: "^[0-9]{8}$",
    },
    {
      nombre: "telefono",
      tipoDato: "string",
      maxLongitud: 10,
      isNull: true,
      validacionRegex: "^[0-9]{10}$",
    },
  ],
};

export default TablaUsuarios;
