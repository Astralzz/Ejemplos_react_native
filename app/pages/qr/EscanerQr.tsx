import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Pressable } from "react-native";
import {
  BarCodeScannedCallback,
  BarCodeScanner,
  BarCodeScannerResult,
} from "expo-barcode-scanner";
import { ColorPagina, OtrosColores } from "../../styles/colorsApp";
import Icon from "react-native-vector-icons/Ionicons";

// * Props
interface EscanerQRProps {
  colors: ColorPagina;
  otrosColores: OtrosColores;
}

// Todo -> Componente para escanear códigos QR
const EscanerQR: React.FC<EscanerQRProps> = ({ colors, otrosColores }) => {
  // * Variables
  const [isTienePermiso, setTienePermiso] = useState<boolean | null>(null);
  const [isEscaneado, setEscaneado] = useState<boolean>(false);
  const [dataEscaner, setDataEscaner] = useState<{
    tipo: string;
    data: string;
  } | null>(null);

  // * Al iniciar
  useEffect(() => {
    // Obtener permisos
    const obtenerPermisosBarCodeScanner = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setTienePermiso(status === "granted");
      } catch (error: unknown) {
        Alert.alert("Error 🔴", `Error al escanear ${String(error)} 🥹`);
      }
    };

    // Obtenemos
    obtenerPermisosBarCodeScanner();
  }, []);

  // * Manejador de escáner
  const manejarEscaneoCodigo = (
    resultadoEscaner: BarCodeScannerResult
  ): BarCodeScannedCallback => {
    try {
      // Escaneado
      setEscaneado(true);

      // Datos escaneados
      setDataEscaner({
        tipo: resultadoEscaner.type,
        data: resultadoEscaner.data,
      });

      return;
    } catch (error: unknown) {
      setEscaneado(false);
      setDataEscaner(null);
      Alert.alert("Error 🔴", `Error al escanear ${String(error)} 🥹`);
    }
  };

  // ? Es nulo
  if (isTienePermiso === null) {
    return (
      <Text style={{ color: colors.color_letra_paginas }}>
        Solicitando permiso de la cámara...
      </Text>
    );
  }
  // ? No tiene permiso
  if (isTienePermiso === false) {
    return (
      <Text style={{ color: colors.color_letra_paginas }}>
        No hay acceso a la cámara.
      </Text>
    );
  }

  return (
    <View style={styles.contenedor}>
      {/* Esta escaneado */}
      {isEscaneado ? (
        // Vista
        <View>
          {/* // ?Tiene datos */}
          {dataEscaner && (
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Tipo de dato */}
              <Text
                style={{ marginBottom: 20, color: colors.color_letra_paginas }}
              >
                Tipo de escáner: {` ${dataEscaner.tipo}`}
              </Text>
              {/* Contenido del qr */}
              <Text
                style={{
                  marginBottom: 40,
                  color: colors.color_letra_paginas,
                }}
              >{`Contenido: ${dataEscaner.data}`}</Text>
            </View>
          )}

          {/* Boton de escanear de nuevo */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() => {
                setEscaneado(false);
                setDataEscaner(null);
              }}
            >
              <Icon
                name="reload-sharp"
                size={40}
                color={colors.color_letra_paginas}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        // Escaner qr
        <BarCodeScanner
          onBarCodeScanned={isEscaneado ? undefined : manejarEscaneoCodigo}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

// * Estilos
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    width: "auto",
    height: 400,
  },
});

export default EscanerQR;
