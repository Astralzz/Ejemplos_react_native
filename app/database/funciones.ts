import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import Tabla from "../models/tabla/Tabla";
import Columna from "../models/tabla/Columna";

//ANCHOR - VARIABLES
export interface SqlTransicionDates {
  db: SQLite.WebSQLDatabase;
  sentenciaSql: string;
  columnas?: (number | string | null)[];
  // Acciones transición
  sqlTransicion?: {
    accionExito?: () => void;
    accionError?: (erTx: SQLite.SQLError) => void;
  };
  // Acciones sentencia
  sqlSentencia?: {
    accionExito?: (
      transaction: SQLite.SQLTransaction,
      resultSet: SQLite.SQLResultSet
    ) => void;
    accionError?: (
      txObj: SQLite.SQLTransaction,
      erSql: SQLite.SQLError
    ) => void;
  };
}

// * Ruta al directorio de documentos
const DIRECTORIO_APP = FileSystem.documentDirectory;

// * Rutas
const RUTAS = {
  SQL: `${DIRECTORIO_APP}/SQLite`,
};

//SECTION - ACCIONES BD

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
    database && database.closeAsync();
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

    // Verificamos
    const tablaExiste = await verificarTablaExistente(database, tabla.nombre);

    // ? Existe
    if (tablaExiste) {
      throw new Error(`La tabla '${tabla.nombre}' ya existe.`);
    }

    // Ejecutamos
    await ejecutarTransicion({
      db: database,
      sentenciaSql: sentenciaSql,
    });

    // ! Error
  } catch (error: unknown) {
    throw new Error(String(error));
  }
}

// * Ver todos los datos de una tabla
export async function verDatosDeTabla(
  database: SQLite.WebSQLDatabase,
  tabla: string
): Promise<any[]> {
  return new Promise<any[]>(async (resolve, reject) => {
    try {
      // Verificamos
      const tablaExiste = await verificarTablaExistente(database, tabla);

      // ? No Existe
      if (!tablaExiste) {
        throw new Error(`La tabla '${tabla}' no existe.`);
      }

      // Sentencia
      const sentenciaSql = `SELECT * FROM ${tabla}`;

      // Ejecutamos
      ejecutarTransicion({
        db: database,
        sentenciaSql: sentenciaSql,
        sqlSentencia: {
          accionExito(tx, res) {
            const datos = [];
            for (let i = 0; i < res.rows.length; i++) {
              datos.push(res.rows.item(i));
            }
            resolve(datos);
          },
          accionError(txObj, erSql) {
            reject(new Error(`Error al consultar datos => ${erSql.message}`));
          },
        },
      });

      // ! Error
    } catch (error: unknown) {
      reject(new Error(String(error)));
    }
  });
}

// * Insertar un nuevo dato en la tabla
export async function insertarDatoEnTabla(
  database: SQLite.WebSQLDatabase,
  tabla: string,
  datos: Record<string, any>
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Verificamos
      const tablaExiste = await verificarTablaExistente(database, tabla);

      // ? No Existe
      if (!tablaExiste) {
        throw new Error(`La tabla '${tabla}' no existe.`);
      }

      // Filtramos los campos que no son nulos o vacíos
      const columnasNoNulas = Object.keys(datos).filter(
        (key) => datos[key] !== null && datos[key] !== ""
      );

      // Obtenemos las key / columnas del objeto filtrado
      const columnas = columnasNoNulas.join(", ");

      // Obtenemos los valores del objeto filtrado
      const valores = columnasNoNulas
        .map((key) => `'${datos[key]}'`)
        .join(", ");

      // Caemos sentencia
      const sentenciaSql = `INSERT INTO ${tabla} (${columnas}) VALUES (${valores})`;

      // Ejecutamos
      ejecutarTransicion({
        db: database,
        sentenciaSql: sentenciaSql,
        sqlSentencia: {
          accionExito() {
            resolve();
          },
          accionError(txObj, erSql) {
            reject(new Error(`Error al insertar dato => ${erSql.message}`));
          },
        },
      });

      // ! Error
    } catch (error: unknown) {
      reject(new Error(String(error)));
    }
  });
}

// * Eliminar tabla
export async function eliminarTabla(
  database: SQLite.WebSQLDatabase,
  tabla: string
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Verificamos
      const tablaExiste = await verificarTablaExistente(database, tabla);

      // ? No Existe
      if (!tablaExiste) {
        throw new Error(`La tabla '${tabla}' no existe.`);
      }

      // Sentencia
      const sentenciaSql = `DROP TABLE IF EXISTS ${tabla};`;

      // Ejecutamos
      ejecutarTransicion({
        db: database,
        sentenciaSql: sentenciaSql,
        sqlSentencia: {
          accionExito() {
            resolve();
          },
          accionError(txObj, erSql) {
            reject(new Error(`Error al eliminar tabla => ${erSql.message}`));
          },
        },
      });

      // ! Error
    } catch (error: unknown) {
      reject(new Error(String(error)));
    }
  });
}

//SECTION -- ACCIONES PRIVADAS

// Función para verificar si la tabla ya existe
async function verificarTablaExistente(
  db: SQLite.WebSQLDatabase,
  nombreTabla: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const sentenciaSql = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;
    ejecutarTransicion({
      db: db,
      sentenciaSql: sentenciaSql,
      columnas: [nombreTabla],
      sqlSentencia: {
        accionExito(tx, res) {
          resolve(res.rows.length > 0);
        },
        accionError(txObj, erSql) {
          reject(
            new Error(
              `Error al verificar la existencia de la tabla => ${erSql.message}`
            )
          );
        },
      },
    });
  });
}

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
async function ejecutarTransicion(datos: SqlTransicionDates): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Accion Exito
    const accionExito = datos.sqlTransicion?.accionExito;
    // Accion error
    const accionError = datos.sqlTransicion?.accionError;

    // Transicion
    datos.db.transaction(
      // Transición => SQLTransactionCallback
      (tx: SQLite.SQLTransaction) => ejecutarSql(tx, datos),

      // ! Error => SQLTransactionErrorCallback => (error: SQLError) => void;
      (erTx: SQLite.SQLError): void => {
        accionError && accionError(erTx);
        reject(new Error(`TransiciónError => ${erTx.message}`));
      },

      // * Exito => ():void
      (): void => {
        accionExito && accionExito();
        resolve();
      }
    );
  });
}

// * Ejecutar SQL
async function ejecutarSql(
  tr: SQLite.SQLTransaction,
  datos: SqlTransicionDates
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Acciones
    const accionExito = datos.sqlSentencia?.accionExito;
    const accionError = datos.sqlSentencia?.accionError;

    // Sentencia
    tr.executeSql(
      // Sentencia => string
      datos.sentenciaSql,
      // Columnas => (number | string | null)[]
      datos.columnas,
      // * Exito | callback
      // Tipo => SQLStatementCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => void;
      (tr: SQLite.SQLTransaction, re: SQLite.SQLResultSet) => {
        accionExito && accionExito(tr, re);
        resolve();
      },
      // ! Error en la ejecución sql | errorCallback
      // tipo => errorCallback = (transaction: SQLTransaction, error: SQLError) => boolean;
      (txObj: SQLite.SQLTransaction, erSql: SQLite.SQLError) => {
        accionError && accionError(txObj, erSql);
        reject(new Error(`SentenciaError => ${erSql.message}`));
        return true; //NOTE -- Devolver true para no detener la transición
      }
    );
  });
}
