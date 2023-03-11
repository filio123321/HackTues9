import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../firebase";
import * as Location from "expo-location";
// import MovingGradientButton from "../components/MovingGradientButton";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const getCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    
    setCoords({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return [location.coords.latitude, location.coords.longitude];
  }

  useEffect(() => {
    getCoords()
    .then((coords) => {
      console.log("coords: ", coords);
    });
  }, []);

  const handlePress = () => {
    console.log('Button pressed!');
  };

  const LoginHandler = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail(user.email);
        console.log('passed coords: ', coords);
        navigation.navigate("Home", { coords: coords });
      })
      .catch((error) => {
        alert(error.message + ": " + error.code);
      });
  };

  return (
    <View style={styles.container}>


      <View style={styles.header}>
        {/* <Text style={styles.headerText}><Text style={{color: 'red'}}>Your</Text> way</Text>
        <Text style={styles.headerText}>To a <Text style={{color: 'red'}}>secure</Text></Text>
        <Text style={[styles.headerText, {color: 'blue'}]}>Backpack</Text> */}
        <Text style={styles.headerText}>Pack<Text style={{color: '#0D98BA'}}>Safe</Text></Text>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor="#B8B8B8"
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor="#B8B8B8"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.loginButton} onPress={LoginHandler}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#B8B8B8",
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: "#F6F6F6",
    width: "80%",
    height: 50,
  },
  header: {
    marginTop: "10%",
    marginLeft: "5%",
    marginBottom: "10%",
    // alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    color: "#1E1E1E",
    fontWeight: "bold",
  },
  headerTextRed: {
    color: "red",
    fontWeight: "bold",
  },
  headerTextBackpack: {
    color: "#9b59b6",
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
