import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify/datastore";
import { Dish } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

const DishDetailsScreen = () => {
  const [dish, setDish] = useState();
  const [quantity, setQuantity] = useState(1);

  const { addDishToBasket } = useBasketContext();
  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params?.id;

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  };
  useEffect(() => {
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);

  if (!dish) {
    return (
      <ActivityIndicator style={{ flex: 1 }} color={"black"} size={"large"} />
    );
  }

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity((val) => val - 1);
    }
  };

  const onPlus = () => {
    setQuantity((val) => val + 1);
  };

  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator}></View>

      <View style={styles.row}>
        <AntDesign
          onPress={onMinus}
          name="minuscircleo"
          size={60}
          color={"black"}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          onPress={onPlus}
          name="pluscircleo"
          size={60}
          color={"black"}
        />
      </View>

      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; ${getTotal()}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    color: "#696969",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  quantity: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default DishDetailsScreen;
