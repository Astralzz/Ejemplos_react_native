import React from "react";
import { Alert, ImageSourcePropType } from "react-native";
import QRCode from "react-native-qrcode-svg";

// * Tipo logo qr
export interface StyleLogoQr {
  img: ImageSourcePropType;
  tamano?: number;
  colorFondo?: string;
  radioBorde?: number;
  margen?: number;
}

// * Props
export interface ComponentQrProps {
  datos: string;
  tamano: number;
  color?: string;
  colorFondo?: string;
  siDaError?: () => void;
  logo?: StyleLogoQr;
}

// Todo ---> Componente QR
const ComponentQr: React.FC<ComponentQrProps> = ({
  datos,
  tamano,
  color = "black",
  colorFondo = "white",
  siDaError,
  logo,
}) => {
  // * Error
  const alDarError = () => {
    if (siDaError) {
      siDaError();
    } else {
      Alert.alert("Error inesperado 🥹", "El QR no se generó correctamente");
    }
  };

  // pre props
  const commonQRProps = {
    onError: alDarError,
    value: datos,
    size: tamano,
    color,
    backgroundColor: colorFondo,
  };

  // ? Con logo
  if (logo) {
    return (
      <QRCode
        {...commonQRProps}
        logo={logo.img}
        logoSize={logo.tamano}
        logoBackgroundColor={logo.colorFondo}
        logoMargin={logo.margen}
        logoBorderRadius={logo.radioBorde}
      />
    );
  }

  return <QRCode {...commonQRProps} />;
};

export default ComponentQr;
