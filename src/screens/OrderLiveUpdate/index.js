import { DataStore } from "aws-amplify/datastore";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Courier, Order } from "../../models";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderLiveUpdate = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);
  const mapRef = useRef(null);

  const fetchOrder = async () => {
    DataStore.query(Order, id).then(setOrder);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setOrder(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (!order) {
      return;
    }
    DataStore.query(Courier, order.courierID).then(setCourier);
  }, [order?.courierID]);

  useEffect(() => {
    if (courier?.lng && courier?.lat) {
      mapRef.current?.animateToRegion(
        {
          latitude: courier.lat,
          longitude: courier.lng,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        },
        1000
      );
    }
  }, [courier?.lat, courier?.lng]);

  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = DataStore.observe(Courier, courier.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setCourier(msg.element);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [courier]);

  return (
    <View>
      <Text>Status: {order?.status || "Loading..."} </Text>
      <MapView style={styles.map} ref={mapRef} showsUserLocation>
        {courier && courier?.lat && (
          <Marker
            coordinate={{ latitude: courier.lat, longitude: courier.lng }}
          >
            <FontAwesome5 name="motorcycle" color="black" size={24} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default OrderLiveUpdate;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
