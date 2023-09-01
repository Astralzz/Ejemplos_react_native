import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/Routes";
import TemaApp from "./components/theme/TemaApp";

const App: React.FC = () => {
  return (
    <TemaApp>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </TemaApp>
  );
};

export default App;
