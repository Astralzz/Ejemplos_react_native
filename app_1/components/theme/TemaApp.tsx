import React, { createContext, useContext, useState } from "react";
import VariablesColors, {
  coloresOscuros,
  coloresClaros,
} from "../../styles/colorsApp";

// * Contexto
interface ContextoTemaType {
  tema: VariablesColors;
  alternar: () => void;
}

// * Tema contexto
const ContextoTema = createContext<ContextoTemaType | undefined>(undefined);

// * Usar tema
export const usarTema = () => {
  const context = useContext(ContextoTema);

  // ? Sin context
  if (!context) {
    throw new Error("useTheme debe ser utilizado dentro de un ThemeProvider");
  }
  return context;
};

// * Tema app
const TemaApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // * Variables
  const [tema, setTema] = useState<VariablesColors>(coloresClaros);

  // * Alternar tema
  const alternarTema = () => {
    setTema(tema === coloresClaros ? coloresOscuros : coloresClaros);
  };

  return (
    <ContextoTema.Provider value={{ tema: tema, alternar: alternarTema }}>
      {children}
    </ContextoTema.Provider>
  );
};

export default TemaApp;
