import { useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify/datastore";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Restaurant } from "../../models";
import { useEffect, useState } from "react";

const OrderListItem = ({ order }) => {
  const navigator = useNavigation();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    DataStore.query(Restaurant, (res) => res.id.eq(order.restaurantID)).then(
      (rest) => setRestaurant(rest[0])
    );
  }, []);

  const onPress = () => {
    navigator.navigate("Order", { id: order.id });
  };
  if (!restaurant) {
    return <ActivityIndicator />;
  }

  return (
    <Pressable onPress={onPress} style={styles.page}>
      {restaurant && (
        <Image source={{ uri: restaurant.image }} style={styles.image} />
      )}
      <View>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text>{order.quantity} items &#8226; $3.0</Text>
        <Text>2 days ago &#8226; {order.status} </Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
