import Pagina from "../models/Pagina";
import PaginaTema from "../pages/tema/PaginaTema";
import PaginaCamara from "../pages/camara/PaginaCamara";
import PaginaGaleria from "../pages/galeria/PaginaGaleria";
import PaginaMapa from "../pages/mapas/PaginaMapa";
import PaginaQr from "../pages/qr/PaginaQr";

// * Rutas de la app
export const listaPaginas: Pagina[] = [
  //   {
  //     nombre: "Resumen",
  //     textoMenu: "Resumen general",
  //     nombreIcono: "home-sharp",
  //     componente: ComponentePrueba,
  //   },
  {
    nombre: "Tema",
    textoMenu: "Cambiar temas",
    nombreIcono: "color-palette-sharp",
    componente: PaginaTema,
  },
  {
    nombre: "Camara",
    textoMenu: "Uso de cámara",
    nombreIcono: "camera-sharp",
    componente: PaginaCamara,
  },
  {
    nombre: "Galeria",
    textoMenu: "Uso de galería",
    nombreIcono: "images-sharp",
    componente: PaginaGaleria,
  },
  {
    nombre: "Mapas",
    textoMenu: "Uso me mapas",
    nombreIcono: "navigate-sharp",
    componente: PaginaMapa,
  },
  {
    nombre: "QR",
    textoMenu: "Uso de qr",
    nombreIcono: "qr-code-sharp",
    componente: PaginaQr,
  },
];

// const ComponentePrueba: React.FC<{ titulo: string; colors: ColorPagina }> = ({
//     titulo,
//     colors,
//   }) => {
//     return (
//       <View
//         style={{
//           ...GlobalStyles.contenedor_centrado,
//           backgroundColor: colors.color_fondo_pagina,
//         }}
//       >
//         <Text style={{ color: colors.color_letra_paginas }}>
//           {titulo ?? "???"}
//         </Text>
//       </View>
//     );
//   };
