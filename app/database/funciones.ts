import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import Tabla from "../models/tabla/Tabla";
import Columna from "../models/tabla/Columna";

// * Ruta al directorio de documentos
const DIRECTORIO_APP = FileSystem.documentDirectory;

// * Rutas
const RUTAS = {
  SQL: `${DIRECTORIO_APP}/SQLite`,
};

// * Abrir una base de datos SQLite
export async function abrirBaseDeDatos(
  nombreBD: string
): Promise<SQLite.WebSQLDatabase> {
  try {
    // ? El directorio existe, si no, se crea.
    const info = await FileSystem.getInfoAsync(RUTAS.SQL);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(RUTAS.SQL, {
        intermediates: true,
      });
    }

    // Ruta completa al archivo de base de datos.
    const rutaBaseDeDatos = `${RUTAS.SQL}/${nombreBD}.db`;

    // ? El archivo de base de datos existe, si no, se crea.
    const infoBD = await FileSystem.getInfoAsync(rutaBaseDeDatos);
    if (!infoBD.exists) {
      // Puedes inicializar la base de datos aquí si es necesario.
      // Por ejemplo, SQLite.openDatabase(rutaBaseDeDatos);
      // O simplemente puedes crear un archivo vacío.
      await FileSystem.writeAsStringAsync(rutaBaseDeDatos, "", {
        encoding: FileSystem.EncodingType.UTF8,
      });
    }

    // Abre la base de datos SQLite y la devuelve.
    return SQLite.openDatabase(rutaBaseDeDatos);

    // ! Error
  } catch (error: unknown) {
    throw new Error(String(error));
  }
}

// * Cerrar base de datos
export function cerrarBaseDeDatos(database: SQLite.WebSQLDatabase): void {
  try {
    // ? Esta abierta
    if (database) {
      // Cerramos
      database.closeAsync;
    }
  } catch (er: unknown) {
    throw new Error(String(er));
  }
}

// * Crear Tabla
export async function crearTablaEnBD(
  database: SQLite.WebSQLDatabase,
  tabla: Tabla
): Promise<void> {
  try {
    // Creamos la sentencia sql
    const sentenciaSql = `
        CREATE TABLE IF NOT EXISTS ${tabla.nombre} (
          ${tabla.columnas
            .map((columna) => `${columna.nombre} ${obtenerSQLColumna(columna)}`)
            .join(", ")}
        );
      `;

    // Mostramos
    console.log(sentenciaSql);

    // Ejecutamos la sentencia
    database.transaction((tx: SQLite.SQLTransaction) =>
      tx.executeSql(
        // Sentencia
        sentenciaSql,
        // Columnas
        [],
        // * Exito | callback
        // Tipo => SQLStatementCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => void;
        (txObj: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
          console.log(`Exito: ${resultSet.rowsAffected}`);
        },
        // ! Error | errorCallback
        // tipo => (transaction: SQLTransaction, error: SQLError) => boolean;
        (txObj: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log("Error", error.message);
          return false;
        }
      )
    );

    console.log("FINALIZADO");

    // ! Error
  } catch (error: unknown) {
    throw new Error(String(error));
  }
}

// * Insertar datos
export async function insertarUsuario(
  database: SQLite.WebSQLDatabase
): Promise<void> {
  try {
    const nombre = "Ejemplo Nombre";
    const matricula = "12345678";
    const telefono = "5555555555";

    // * Sentencia
    const sentenciaSql = `INSERT INTO usuarios (nombre, matricula, telefono) VALUES (?, ?, ?)`;

    database.transaction((tx: SQLite.SQLTransaction) => {
      tx.executeSql(
        sentenciaSql,
        [nombre, matricula, telefono],
        (_, resultSet) => {
          // La inserción fue exitosa
          console.log(`Datos insertados correctamente: ${resultSet.insertId}`);
        }
        // (_, error) => {
        //   // Manejo de errores si la inserción falla
        //   console.error("Error al insertar datos:", error);
        // }
      );
    });
  } catch (error: unknown) {
    throw new Error(String(error));
  }
}

// Obtener el SQL de la columna
function obtenerSQLColumna(columna: Columna): string {
  // Sql
  let sql = "";

  // Tipo de dato
  switch (columna.tipoDato) {
    // Texto
    case "string":
      sql = "TEXT";
      break;
    // Numero
    case "number":
      sql =
        columna.nombre === "id"
          ? "INTEGER PRIMARY KEY AUTOINCREMENT" // Si el nombre de la columna es "id", se asigna como clave primaria.
          : "REAL"; // En otros casos, se asigna como REAL en SQL.
      break;
    // Booleano
    case "boolean":
      sql = "INTEGER";
      break;
    // Fecha
    case "Date":
      sql = "NUMERIC";
      break;
    // ! EError
    default:
      throw new Error(`Tipo de dato no válido: ${columna.tipoDato}`);
  }

  // ? Se puede nulo
  if (columna.isNull) {
    sql += " NULL";
  } else {
    sql += " NOT NULL";
  }

  // ? Unico
  if (columna.isUnico) sql += " UNIQUE";

  // ? Existe magnitud
  if (columna.maxLongitud !== undefined)
    sql += ` CHECK(LENGTH(${columna.nombre}) <= ${columna.maxLongitud})`;

  // ? Existe valor por defecto
  if (columna.valorPorDefecto !== undefined)
    sql += ` DEFAULT '${columna.valorPorDefecto}'`;

  // ?  Existe validacion
  // Agregamos una  restricción de validación con expresión regular a la definición SQL.
  if (columna.validacionRegex)
    sql += ` CHECK(${columna.nombre} REGEXP '${columna.validacionRegex}')`;

  return sql;
}
