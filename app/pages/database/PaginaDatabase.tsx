import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, Text, Alert } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import { abrirBaseDeDatos } from "../../database/funciones";

interface Columna {
  nombre: string;
  isNulo: boolean;
  isUnico: boolean;
}

// * Databases
const DATABASE_ALUMNO = {
  nombre: "db_alumnos",
  tablas: {
    alumnos: {
      nombre: "alumnos",
      columnas: [
        {
          nombre: "string",
          isNulo: false,
          isUnico: false,
        },
      ],
    },
  },
};

// TODO ---> PAGINA CAMARA
const PaginaDatabase: React.FC = () => {
  // * Tema
  const { tema } = usarTema();

  // * Variables
  const [baseDeDatos, setBaseDeDatos] = useState<SQLite.WebSQLDatabase | null>(
    null
  );

  // * Abrimos BD
  const abrirBD = async (): Promise<void> => {
    try {
      // Abrimos bd
      const bd: SQLite.WebSQLDatabase = await abrirBaseDeDatos(
        DATABASE_ALUMNO.nombre
      );

      console.log("BD:::");
      console.log(bd);

      // Agregamos
      setBaseDeDatos(bd);

      // ! Error
    } catch (err: unknown) {
      Alert.alert("Error 🔴", `Error ${String(err)}, 🥹`);
    }
  };

  // Al iniciar
  useEffect(() => {
    abrirBD();
  }, []);

  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        { backgroundColor: tema.colorsPagina.color_fondo_pagina },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: tema.colorsPagina.color_letra_paginas,
            padding: 25,
            fontSize: 25,
          }}
        >
          Uso de databases
        </Text>
      </View>
    </View>
  );
};

export default PaginaDatabase;
