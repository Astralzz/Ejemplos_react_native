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

// * Colores de las paginas
export interface ColorPagina {
  color_fondo_pagina: string;
  color_letra_paginas: string;
}

// * Variables
interface VariablesColors {
  colorsEncabezado: EncabezadoPagina;
  colorsMenu: ColorsMenu;
  colorsPagina: ColorPagina;
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
};

export default VariablesColors;
