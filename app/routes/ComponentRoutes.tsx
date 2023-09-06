import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { usarTema } from "../components/theme/TemaApp";
import MenuPrincipal from "../components/menu/MenuPrincipal";
import { listaPaginas } from "./routes";
import ErrorDefaultComponent from "../components/errors/ErrorDefaultComponent";

// * Variables
const Menu = createDrawerNavigator();

const paramTitulo: string[] = ["Resumen"];

// Todo ... RUTAS GLOBALES
const ComponentRoutes: React.FC = () => {
  // * Variables
  const { tema } = usarTema();

  return (
    <Menu.Navigator
      initialRouteName={listaPaginas[0]?.nombre ?? "404"}
      drawerContent={(props) => (
        <MenuPrincipal paginas={listaPaginas} drawer={props} />
      )}
    >
      {/* Componente Error */}
      <Menu.Screen
        name={"404"}
        component={ErrorDefaultComponent}
        options={{
          headerTintColor: tema.colorsEncabezado.color_letra_encabezado,
          headerStyle: {
            backgroundColor: tema.colorsEncabezado.color_fondo_encabezado,
          },
        }}
      />

      {/* Lista de rutas */}
      {listaPaginas.map((pagina, i) => {
        // Componente
        const Pagina: React.ComponentType<any> = pagina.componente;

        return (
          <Menu.Screen
            key={i}
            name={pagina.nombre}
            options={{
              headerTintColor: tema.colorsEncabezado.color_letra_encabezado,
              headerStyle: {
                backgroundColor: tema.colorsEncabezado.color_fondo_encabezado,
              },
            }}
          >
            {/* Pagina */}
            {() =>
              paramTitulo.includes(pagina.nombre) ? (
                <Pagina
                  titulo={pagina.titulo ?? pagina.nombre}
                  colors={tema.colorsPagina}
                />
              ) : (
                <Pagina />
              )
            }
          </Menu.Screen>
        );
      })}
    </Menu.Navigator>
  );
};

export default ComponentRoutes;
