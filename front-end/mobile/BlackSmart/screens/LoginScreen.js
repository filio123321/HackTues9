import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../firebase";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const LoginHandler = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('bshauidhlasihdla');
        const user = userCredential.user;
        setEmail(user.email);
        console.log('eeeeeeeeee');
        navigation.navigate("Home");

      })
      .catch((error) => {
        alert(error.message + ": " + error.code);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
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
    marginBottom: "10%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    color: "#1E1E1E",
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