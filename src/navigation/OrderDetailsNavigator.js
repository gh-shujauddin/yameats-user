import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderLiveUpdate from "../screens/OrderLiveUpdate";
import OrderDetails from "../screens/OrderDetails";
const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = ({ route }) => {
  const id = route?.params?.id;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={() => <OrderDetails id={id} />} />
      <Tab.Screen
        name="Updates"
        component={() => <OrderLiveUpdate id={id} />}
      />
    </Tab.Navigator>
  );
};

export default OrderDetailsNavigator;
