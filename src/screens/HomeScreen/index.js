import { View, FlatList, StyleSheet, Text } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify/datastore";
import { Restaurant } from "../../models";

export default function HomeScreen() {
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    // fetching restaurant items and storing as state
    try {
      DataStore.query(Restaurant).then(setRestaurant);
      console.log(restaurants);
    } catch (e) {
      console.log("Error fetching restaurant: ", e);
    }
  }, []);

  return (
    <View>
      <FlatList
        style={{ padding: 10 }}
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
