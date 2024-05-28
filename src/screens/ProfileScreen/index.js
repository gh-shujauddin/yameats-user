import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

import { DataStore } from "aws-amplify/datastore";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";

import { useNavigation } from "@react-navigation/native";
const userSelector = (context) => [context.user];

const Profile = () => {
  const navigation = useNavigation();
  const { sub, dbUser, setDbUser } = useAuthContext();

  const { user, signOut } = useAuthenticator(userSelector);

  const [name, setName] = useState(dbUser?.name ? dbUser?.name : "");
  const [address, setAddress] = useState(
    dbUser?.address ? dbUser?.address : ""
  );

  // const [lat, setLat] = useState(dbUser?.lat ? dbUser?.lat + "" : "0");
  // const [lng, setLng] = useState(dbUser?.lng ? dbUser?.lng + "" : "0");


  const [lat, setLat] = useState(28.6199298);
  const [lng, setLng] = useState(77.201828);

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("HomeTabs");
    }
  };

  const updateUser = async () => {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = name;
          updated.address = address;
          updated.lat = parseFloat(lat);
          updated.lng = parseFloat(lng);
        })
      );
      console.log("User updated: ", user);
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          sub,
        })
      );
      console.log("User created: ", user);
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const onSignOut = () => {
    console.warn("Sign out pressed");
    signOut();
    setDbUser(null);
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
      />

      <Pressable
        style={[styles.button, { borderColor: "#123489" }]}
        onPress={onSave}
      >
        <Text style={{ color: "#123489", fontSize: 15, fontWeight: "bold" }}>
          Save
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, { borderColor: "#993456" }]}
        onPress={onSignOut}
      >
        <Text style={{ color: "#993456", fontSize: 15, fontWeight: "bold" }}>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  button: {
    height: 40,
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
  },
});

export default Profile;
