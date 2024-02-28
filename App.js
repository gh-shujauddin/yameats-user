import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";

import { Amplify } from "aws-amplify";
import config from "./src/amplifyconfiguration.json";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrderContextProvider from "./src/contexts/OrderContext";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

//for removing the active icon background in Material Bottom Tab Navigator
const theme = {
  colors: {
    secondaryContainer: "rgb(255, 255, 255)",
  },
};

function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
      <StatusBar style="dark" />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
