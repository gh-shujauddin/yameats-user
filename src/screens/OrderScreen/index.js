import { StyleSheet, Text, View, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";

const OrderScreen = () => {
  const { orders } = useOrderContext();
  if (orders[0] == null) {
    return (
      <View style={{ flex: 1 }}>
        <Text>No items</Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
  },
});
