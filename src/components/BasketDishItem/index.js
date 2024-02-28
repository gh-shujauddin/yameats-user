import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { DataStore } from "aws-amplify/datastore";
import { useEffect, useState } from "react";
import { Dish } from "../../models";

const BasketDishItem = ({ basketDish }) => {
  const [dish, setDish] = useState(null);
  const dishId = basketDish.dishID;

  useEffect(() => {
    if (dishId) {
      console.log(dishId);
      DataStore.query(Dish, dishId).then(setDish);
    }
  }, [basketDish]);

  if (!dish) {
    return <ActivityIndicator style={{ flex: 1 }} size={"small"} />;
  }

  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text style={{ paddingHorizontal: 3 }}>{basketDish.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "bold", flex: 1, paddingHorizontal: 9 }}>
        {dish.name}
      </Text>
      <Text style={styles.price}>${dish.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
    borderRadius: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
  },
  price: {
    marginLeft: "auto",
  },
});

export default BasketDishItem;
