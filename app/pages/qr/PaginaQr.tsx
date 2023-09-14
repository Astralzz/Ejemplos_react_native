import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import GlobalStyles from "../../styles/global";
import { usarTema } from "../../components/theme/TemaApp";
import ComponentQr, {
  ComponentQrProps,
} from "../../components/oters/ComponentQr";
import FormularioQr from "./FormularioQr";
import ComponentModal from "../../components/modals/ComponentModal";
import ComponentListaQr from "./ComponentListaQr";
import EscanerQR from "./EscanerQr";

// TODO ---> PAGINA QR
const PaginaQr: React.FC = () => {
  // * Tema
  const { tema } = usarTema();

  // * Variables
  const [dataQr, setDataQr] = useState<ComponentQrProps | null>(null);
  const [listaQr, setListaQr] = useState<ComponentQrProps[]>([]);
  const [isModalFormulario, setModalFormulario] = useState<boolean>(false);
  const [isModalLista, setModalLista] = useState<boolean>(false);
  const [isModalEscaner, setModalEscaner] = useState<boolean>(false);

  // * Acciones modal
  const cerrarModalFormulario = (): void => setModalFormulario(false);
  const abrirModalFormulario = (): void => setModalFormulario(true);
  const cerrarModalLista = (): void => setModalLista(false);
  const abrirModalLista = (): void => setModalLista(true);
  const cerrarModalEscaner = (): void => setModalEscaner(false);
  const abrirModalEscaner = (): void => setModalEscaner(true);

  // * Crear Qr
  const crearQr = (data: ComponentQrProps): void => {
    cerrarModalFormulario();
    setDataQr(data);

    // Aumentamos lista
    setListaQr([...listaQr, data]);
  };

  // * Visualizar Qr
  const visualizarQr = (data: ComponentQrProps): void => {
    setDataQr(data);
    cerrarModalLista();
  };

  // * Actualizar lista
  const actualizarLista = (lista: ComponentQrProps[]): void => {
    setListaQr(lista);

    // ? La lista esta vacía
    if (lista.length === 0) {
      cerrarModalFormulario();
    }
  };

  // * Escaner qr
  const Escaner: React.FC = () => (
    <EscanerQR colors={tema.colorsPagina} otrosColores={tema.otros} />
  );

  // * Formulario qr
  const FormularioCrearQr: React.FC = () => (
    <FormularioQr
      colors={tema.colorsPagina}
      otrosColores={tema.otros}
      crearQr={crearQr}
    />
  );

  // * Lista Qr
  const ListaQrs: React.FC = () => (
    <ComponentListaQr
      listaQr={listaQr}
      colores={tema.colorsPagina}
      actualizarLista={actualizarLista}
      visualizarQr={visualizarQr}
    />
  );

  return (
    <View
      style={[
        GlobalStyles.contenedor_centrado,
        {
          backgroundColor: tema.colorsPagina.color_fondo_pagina,
        },
      ]}
    >
      {/* Boton y texto */}
      <View style={{ alignItems: "center" }}>
        {/* Qr */}
        {dataQr && <ComponentQr {...dataQr} />}

        {/* Botones */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Crear QR */}
          <Pressable
            onPress={abrirModalFormulario}
            style={{
              ...estilo.styleBoton,
              borderColor: tema.colorsPagina.color_letra_paginas,
            }}
          >
            <Text
              style={{
                ...estilo.textBoton,
                color: tema.colorsPagina.color_letra_paginas,
              }}
            >
              Crear QR
            </Text>
          </Pressable>

          {/* Escanear Qr */}
          <Pressable
            onPress={abrirModalEscaner}
            style={{
              ...estilo.styleBoton,
              borderColor: tema.colorsPagina.color_letra_paginas,
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                ...estilo.textBoton,
                color: tema.colorsPagina.color_letra_paginas,
              }}
            >
              Escanear
            </Text>
          </Pressable>

          {/* Lista de QR */}
          {listaQr.length > 1 && (
            <Pressable
              onPress={abrirModalLista}
              style={{
                ...estilo.styleBoton,
                borderColor: tema.colorsPagina.color_letra_paginas,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  ...estilo.textBoton,
                  color: tema.colorsPagina.color_letra_paginas,
                }}
              >
                Ver lista
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Modal Escaner */}
      <ComponentModal
        titulo={"Escanear qr"}
        Cuerpo={Escaner}
        visible={isModalEscaner}
        cerrarModal={cerrarModalEscaner}
      />

      {/* Modal qr */}
      <ComponentModal
        titulo={"Crear nuevo Qr"}
        Cuerpo={FormularioCrearQr}
        visible={isModalFormulario}
        cerrarModal={cerrarModalFormulario}
        isOcultarPie
      />

      {/* Modal de lista de QR */}
      <ComponentModal
        visible={isModalLista}
        cerrarModal={cerrarModalLista}
        Cuerpo={ListaQrs}
        titulo={"Lista de Qrs"}
      />
    </View>
  );
};

// * Estilo
const estilo = StyleSheet.create({
  styleBoton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 0.5,
  },
  textBoton: {
    fontSize: 18,
    fontWeight: "normal",
  },
});

export default PaginaQr;
