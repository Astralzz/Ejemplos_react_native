// * Colores del encabezado
export interface EncabezadoPagina {
  color_letra_encabezado: string;
  color_fondo_encabezado: string;
}

// * Colores del menu
export interface ColorsMenu {
  color_separador_menu: string;
  color_letra_menu: string;
  color_menu_principal: string;
  color_icono_menu: string;
}

// * Colores del modal
export interface ColorsModal {
  color_encabezado: string;
  color_letra: string;
  color_cuerpo: string;
  color_fondo_exterior?: string;
  color_boton_cerrar: string;
  color_pie_de_pagina: string;
}

// * Colores de las paginas
export interface ColorPagina {
  color_fondo_pagina: string;
  color_letra_paginas: string;
}

// * Otros colores
export interface OtrosColores {
  colorExito: string;
  colorError: string;
}

// * Variables
export interface VariablesColors {
  colorsEncabezado: EncabezadoPagina;
  colorsMenu: ColorsMenu;
  colorsPagina: ColorPagina;
  colorsModal: ColorsModal;
  otros: OtrosColores;
}

// * Globales
const COLOR_LETRA_GLOBAL_CLARO = "#000";
const COLOR_LETRA_GLOBAL_OSCURO = "#fff";
const COLOR_FONDO_GLOBAL_CLARO = "#ffe4e1";
const COLOR_FONDO_GLOBAL_OSCURO = "#6A1B34";

// * Tema claro
export const coloresClaros: VariablesColors = {
  colorsMenu: {
    color_separador_menu: COLOR_LETRA_GLOBAL_CLARO,
    color_letra_menu: COLOR_LETRA_GLOBAL_CLARO,
    color_icono_menu: COLOR_LETRA_GLOBAL_CLARO,
    color_menu_principal: COLOR_FONDO_GLOBAL_CLARO,
  },
  colorsPagina: {
    color_fondo_pagina: COLOR_FONDO_GLOBAL_CLARO,
    color_letra_paginas: COLOR_LETRA_GLOBAL_CLARO,
  },
  colorsEncabezado: {
    color_fondo_encabezado: COLOR_FONDO_GLOBAL_CLARO,
    color_letra_encabezado: COLOR_LETRA_GLOBAL_CLARO,
  },
  colorsModal: {
    color_encabezado: COLOR_FONDO_GLOBAL_CLARO,
    color_cuerpo: COLOR_FONDO_GLOBAL_CLARO,
    color_letra: COLOR_LETRA_GLOBAL_CLARO,
    color_boton_cerrar: COLOR_LETRA_GLOBAL_CLARO,
    color_pie_de_pagina: COLOR_FONDO_GLOBAL_CLARO,
  },
  otros: {
    colorExito: "#00FF00",
    colorError: "#FF0000",
  },
};

// * Tema oscuro
export const coloresOscuros: VariablesColors = {
  ...coloresClaros,

  colorsMenu: {
    color_separador_menu: COLOR_LETRA_GLOBAL_OSCURO,
    color_letra_menu: COLOR_LETRA_GLOBAL_OSCURO,
    color_icono_menu: COLOR_LETRA_GLOBAL_OSCURO,
    color_menu_principal: COLOR_FONDO_GLOBAL_OSCURO,
  },
  colorsPagina: {
    color_fondo_pagina: COLOR_FONDO_GLOBAL_OSCURO,
    color_letra_paginas: COLOR_LETRA_GLOBAL_OSCURO,
  },
  colorsEncabezado: {
    color_fondo_encabezado: COLOR_FONDO_GLOBAL_OSCURO,
    color_letra_encabezado: COLOR_LETRA_GLOBAL_OSCURO,
  },
  colorsModal: {
    color_encabezado: COLOR_FONDO_GLOBAL_OSCURO,
    color_cuerpo: COLOR_FONDO_GLOBAL_OSCURO,
    color_letra: COLOR_LETRA_GLOBAL_OSCURO,
    color_boton_cerrar: COLOR_LETRA_GLOBAL_OSCURO,
    color_pie_de_pagina: COLOR_FONDO_GLOBAL_OSCURO,
  },
  otros: {
    colorExito: "#008000",
    colorError: "#FF4500",
  },
};

export default VariablesColors;
