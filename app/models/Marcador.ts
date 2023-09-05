import { ImageSourcePropType } from "react-native";

// * Marcador
interface Marcador {
  titulo: string;
  descripcion?: string;
  latitud: number;
  longitud: number;
  imagenUrl?: ImageSourcePropType;
}

export default Marcador;
