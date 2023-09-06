import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ComponentRoutes from "./routes/ComponentRoutes";
import TemaApp from "./components/theme/TemaApp";

const App: React.FC = () => {
  return (
    <TemaApp>
      <NavigationContainer>
        <ComponentRoutes />
      </NavigationContainer>
    </TemaApp>
  );
};

export default App;
