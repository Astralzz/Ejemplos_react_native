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
    // Obtenemos directorio
    const info: FileSystem.FileInfo = await FileSystem.getInfoAsync(RUTAS.SQL);

    // ? No existe
    if (!info.exists) {
      // Creamos directorio
      await FileSystem.makeDirectoryAsync(RUTAS.SQL, {
        intermediates: true,
      });
    }

    // Ruta completa al archivo de base de datos.
    const rutaBaseDeDatos = `${RUTAS.SQL}/${nombreBD}.db`;

    // Obtenemos el archivo de base de datos existe
    const infoBD = await FileSystem.getInfoAsync(rutaBaseDeDatos);

    // ? No existe
    if (!infoBD.exists) {
      // Puedes inicializar la base de datos aquí si es necesario.
      // Por ejemplo, SQLite.openDatabase(rutaBaseDeDatos);
      // O simplemente puedes crear un archivo vacío.
      await FileSystem.writeAsStringAsync(
        rutaBaseDeDatos,
        `Este archivo contiene la base de datos con el nombre de ${nombreBD}, NO BORRAR`,
        {
          encoding: FileSystem.EncodingType.UTF8,
        }
      );
    }

    // Abre la base de datos SQLite y la devuelve.
    return SQLite.openDatabase(`${nombreBD}.bd`);
    // return SQLite.openDatabase(rutaBaseDeDatos);

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

    // Exito transición
    const ExitoTransicion: () => void = () =>
      console.log("Exito en la transición");

    // Exito sentencia
    const ExitoSentencia: () => void = () =>
      console.log("Exito en la sentencia sql");

    // Ejecutamos
    await ejecutarTransicion(
      database,
      sentenciaSql,
      ExitoTransicion,
      ExitoSentencia
    );

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

// -----------------  PRIVADAS -----------------

// * Obtener el SQL de la columna
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

// * Crear transición
async function ejecutarTransicion(
  db: SQLite.WebSQLDatabase,
  sentenciaSql: string,
  accionExitoTransicion?: () => void,
  accionExitoEjecutarSql?: (
    txObj?: SQLite.SQLTransaction,
    resultSet?: SQLite.SQLResultSet
  ) => void
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      // Transición => SQLTransactionCallback
      (tx: SQLite.SQLTransaction) =>
        ejecutarSql(tx, sentenciaSql, accionExitoEjecutarSql),

      // ! Error => SQLTransactionErrorCallback => (error: SQLError) => void;
      (erTx: SQLite.SQLError) =>
        reject(new Error(`TransiciónError => ${erTx.message}`)),

      // * Exito
      () => {
        if (accionExitoTransicion) {
          accionExitoTransicion();
        }
        resolve();
      }
    );
  });
}

// * Ejecutar SQL
async function ejecutarSql(
  tr: SQLite.SQLTransaction,
  sentenciaSql: string,
  accionExito?: SQLite.SQLStatementCallback
): Promise<void> {
  tr.executeSql(
    // Sentencia => string
    sentenciaSql,
    // Columnas => (number | string | null)[]
    null,
    // * Exito | callback
    // Tipo => SQLStatementCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => void;
    accionExito,
    // ! Error en la ejecución sql | errorCallback
    // tipo => errorCallback = (transaction: SQLTransaction, error: SQLError) => boolean;
    (txObj: SQLite.SQLTransaction, erSql: SQLite.SQLError) => {
      console.log("Error en la sentencia ", erSql.message);
      return false;
    }
  );
}
