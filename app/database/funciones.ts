import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

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

// Ejemplo de cómo crear una tabla en la base de datos.
async function crearTabla(db: SQLite.WebSQLDatabase) {
  await db.transaction((tx) => {
    // Define la sentencia SQL para crear una tabla.
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, edad INTEGER)"
    );
  });
}

// Ejemplo de cómo insertar datos en la tabla.
async function insertarDatos(
  db: SQLite.WebSQLDatabase,
  nombre: string,
  edad: number
) {
  await db.transaction((tx) => {
    // Define la sentencia SQL para insertar datos en la tabla.
    tx.executeSql("INSERT INTO usuarios (nombre, edad) VALUES (?, ?)", [
      nombre,
      edad,
    ]);
  });
}

// Ejemplo de cómo eliminar datos de la tabla.
async function eliminarDatos(db: SQLite.WebSQLDatabase, id: number) {
  await db.transaction((tx) => {
    // Define la sentencia SQL para eliminar datos de la tabla por ID.
    tx.executeSql("DELETE FROM usuarios WHERE id = ?", [id]);
  });
}

// Uso de la función para abrir la base de datos
// abrirBaseDeDatos("ruta/al/archivo.db")
//   .then(async (db) => {
//     // Realiza operaciones en la base de datos, como crear, insertar o eliminar datos.
//     await crearTabla(db);
//     await insertarDatos(db, "Ejemplo", 30);
//     await eliminarDatos(db, 1);
//   })
//   .catch((error) => {
//     console.error("Error al abrir la base de datos:", error);
//   });
