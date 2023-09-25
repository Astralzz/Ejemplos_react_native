import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import {
  abrirBaseDeDatos,
  cerrarBaseDeDatos,
  crearTablaEnBD,
  eliminarTabla,
  insertarDatoEnTabla,
  verDatosDeTabla,
} from "../../database/funciones";
import TablaUsuarios from "../../models/usuarios/TablaUsuarios";
import FormularioUsuario from "./FormularioUsuario";
import Usuario from "../../models/usuarios/Usuario";
import ComponentModal from "../../components/modals/ComponentModal";
import { alertaBool } from "../../functions/alerts";
import ModalListaUsuarios from "./ModalListaUsuarios";
import { color } from "react-native-reanimated";

// * Databases
const DATABASE_ALUMNO = {
  nombre: "db_alumnos",
  tablas_usuarios: TablaUsuarios,
};

// TODO ---> PAGINA CAMARA
const PaginaDatabase: React.FC = () => {
  // * Tema
  const { tema } = usarTema();

  // * Variables
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
  const [isModalFormulario, setModalFormulario] = useState<boolean>(false);
  const [isModalLista, setModalLista] = useState<boolean>(false);
  const [isConectadoBd, setConectadoBd] = useState<boolean>(false);
  const [baseDeDatos, setBaseDeDatos] = useState<SQLite.WebSQLDatabase | null>(
    null
  );

  // * Acciones del modal
  const abrirModalFormulario = () => setModalFormulario(true);
  const cerrarModalFormulario = () => setModalFormulario(false);
  const abrirModalLista = () => setModalLista(true);
  const cerrarModalLista = () => setModalLista(false);

  // * conectar con la BD
  const conectarBD = async (): Promise<void> => {
    try {
      // ? No es nula
      if (baseDeDatos) {
        throw new Error("La BD ya esta abierta");
      }

      // Abrimos bd
      const bd: SQLite.WebSQLDatabase = await abrirBaseDeDatos(
        DATABASE_ALUMNO.nombre
      );

      // Agregamos
      setBaseDeDatos(bd);
      setConectadoBd(true);

      // ! Error
    } catch (err: unknown) {
      !baseDeDatos && setConectadoBd(false);
      Alert.alert("Error al abrir BD 🔴", `Error ${String(err)}, 🥹`);
    }
  };

  // * Desconectarse de la BD
  const desconectarBD = (): void => {
    try {
      // ? Es nula
      if (!baseDeDatos) {
        throw new Error("La BD ya esta cerrada");
      }

      // Cerramos bd
      cerrarBaseDeDatos(baseDeDatos);

      // Agregamos
      setBaseDeDatos(null);
      setConectadoBd(false);

      // ! Error
    } catch (err: unknown) {
      baseDeDatos && setConectadoBd(true);
      Alert.alert("Error al cerrar BD 🔴", `Error: ${String(err)}, 🥹`);
    }
  };

  // * Crear tabla usuarios
  const crearTablaUsuarios = async (): Promise<void> => {
    try {
      // ? No esta activa
      if (!baseDeDatos) {
        throw new Error("La BD esta desconectada");
      }

      // Cerramos la tabla usuarios
      await crearTablaEnBD(baseDeDatos, TablaUsuarios);

      // Exito
      Alert.alert(
        "Exito al crear Tabla ✅",
        `La tabla ${TablaUsuarios.nombre} se creo correctamente`
      );

      // await insertarUsuario(baseDeDatos);
      // // Exito
      // Alert.alert(
      //   "Exito al insertar Datos ✅",
      //   `Los datos se crearon correctamente`
      // );

      // ! Error
    } catch (err: unknown) {
      Alert.alert("Error al crear tabla 🔴", `${String(err)}, 🥹`);
    }
  };

  // * Ver lista de usuarios
  const verListaDeUsuarios = async (): Promise<void> => {
    try {
      // ? No esta activa
      if (!baseDeDatos) {
        throw new Error("La BD esta desconectada");
      }

      // Cerramos la tabla usuarios
      const res = await verDatosDeTabla(baseDeDatos, TablaUsuarios.nombre);

      // Convertimos y agregamos
      const lista: Usuario[] = res.map((item: any) => ({
        id: item.id,
        nombre: item.nombre,
        matricula: item.matricula,
        telefono: item.telefono || null,
      }));

      setListaUsuarios(lista);

      // Abrimos modal
      abrirModalLista();

      // ! Error
    } catch (err: unknown) {
      Alert.alert("Error al ver la lista 🔴", `${String(err)}, 🥹`);
    }
  };

  // * Crear usuario
  const crearUsuario = async (usuario: Usuario): Promise<void> => {
    try {
      // Creamos
      await insertarDatoEnTabla(baseDeDatos, "usuarios", usuario);

      // Exito
      Alert.alert(
        "Exito ✅",
        `El usuario ${usuario.nombre} se creo correctamente`
      );

      // ! Error
    } catch (err: unknown) {
      Alert.alert("Error al crear usuario 🔴", `${String(err)}, 🥹`);
    }
  };

  // * Eliminar tabla usuarios
  const eliminarTablaUsuario = async (): Promise<void> => {
    try {
      // Confirmación
      const res: boolean = await alertaBool(
        "Seguro? 🤚🏻",
        `¿Estas seguro de eliminar la tabla ${TablaUsuarios.nombre}?, perderás todos los datos guardados`
      );

      // ? Cancelo
      if (!res) {
        Alert.alert(
          "Cancelado ✅",
          `Se cancelo la eliminación de la tabla ${TablaUsuarios.nombre}`
        );
        return;
      }

      // Creamos
      await eliminarTabla(baseDeDatos, TablaUsuarios.nombre);

      // Exito
      Alert.alert(
        "Exito ✅",
        `La tabla ${TablaUsuarios.nombre} se elimino correctamente`
      );

      // ! Error
    } catch (err: unknown) {
      Alert.alert(
        "Error al eliminar la tabla de usuarios usuario 🔴",
        `${String(err)}, 🥹`
      );
    }
  };

  // * Formulario crear usuario
  const FormularioCrearUsuario: React.FC = () => (
    <FormularioUsuario
      colors={tema.colorsPagina}
      otrosColores={tema.otros}
      crearUsuario={(u: Usuario) => {
        cerrarModalFormulario();
        crearUsuario(u);
      }}
    />
  );

  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        { backgroundColor: tema.colorsPagina.color_fondo_pagina },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        {/* Titulo */}
        <Text
          style={{
            ...estilos.titulo,
            color: tema.colorsPagina.color_letra_paginas,
          }}
        >
          Uso de bases de datos locales
        </Text>

        {/* Botones superiores */}
        <View style={estilos.caja_botones}>
          {/* Boton de conectar */}
          {!isConectadoBd && (
            <Pressable
              onPress={conectarBD}
              style={{
                ...estilos.boton,
                backgroundColor: isConectadoBd
                  ? tema.otros.colorExitoOpaco
                  : tema.otros.colorExito,
              }}
            >
              <Text
                style={{
                  ...estilos.texto_boton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Conectarse a la base de datos
              </Text>
            </Pressable>
          )}

          {/* Boton de desconectar */}
          {isConectadoBd && (
            <Pressable
              onPress={desconectarBD}
              style={{
                ...estilos.boton,
                backgroundColor: !isConectadoBd
                  ? tema.otros.colorErrorOpaco
                  : tema.otros.colorError,
                marginBottom: 26,
              }}
            >
              <Text
                style={{
                  ...estilos.texto_boton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Desconectarse de la base de datos
              </Text>
            </Pressable>
          )}
        </View>

        {/* Boton de crear tabla usuarios */}
        {isConectadoBd && (
          <>
            {/* Boton de crear tabla usuarios */}
            <Pressable
              onPress={crearTablaUsuarios}
              style={{
                ...estilos.boton,
                backgroundColor: !isConectadoBd
                  ? tema.otros.colorExitoOpaco
                  : tema.otros.colorExito,
              }}
            >
              <Text
                style={{
                  ...estilos.texto_boton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Crear tabla usuarios
              </Text>
            </Pressable>
            {/* Boton de crear tabla usuarios */}
            <Pressable
              onPress={eliminarTablaUsuario}
              style={{
                ...estilos.boton,
                backgroundColor: !isConectadoBd
                  ? tema.otros.colorExitoOpaco
                  : tema.otros.colorExito,
              }}
            >
              <Text
                style={{
                  ...estilos.texto_boton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Eliminar la tabla usuarios
              </Text>
            </Pressable>
            {/* Boton de ver datos de usuarios */}
            <Pressable
              onPress={verListaDeUsuarios}
              style={{
                ...estilos.boton,
                backgroundColor: !isConectadoBd
                  ? tema.otros.colorExitoOpaco
                  : tema.otros.colorExito,
              }}
            >
              <Text
                style={{
                  ...estilos.texto_boton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Ver lista de usuarios
              </Text>
            </Pressable>
            {/* Boton de insertar usuario */}
            <Pressable
              onPress={abrirModalFormulario}
              style={{
                ...estilos.boton,
                backgroundColor: !isConectadoBd
                  ? tema.otros.colorExitoOpaco
                  : tema.otros.colorExito,
              }}
            >
              <Text
                style={{
                  ...estilos.texto_boton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Insertar usuario
              </Text>
            </Pressable>
          </>
        )}
      </View>

      {/* Modal de lista */}
      <ModalListaUsuarios
        isVisible={isModalLista}
        cerrarModal={cerrarModalLista}
        colors={{
          pagina: tema.colorsPagina.color_fondo_pagina,
          letra: tema.colorsPagina.color_letra_paginas,
          colorsModal: tema.colorsModal,
          otros: tema.otros,
        }}
        listaUsuarios={listaUsuarios}
      />

      {/* Modal del Formulario */}
      <ComponentModal
        titulo={"Crear usuario"}
        Cuerpo={FormularioCrearUsuario}
        visible={isModalFormulario}
        cerrarModal={cerrarModalFormulario}
        isOcultarPie
      />
    </View>
  );
};

// * Estilos
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    width: "auto",
    height: 400,
  },
  titulo: {
    padding: 25,
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  caja_botones: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  boton: {
    margin: 6,
    width: "50%",
  },
  texto_boton: {
    padding: 10,
    fontSize: 15,
    textAlign: "center",
  },
});

export default PaginaDatabase;
