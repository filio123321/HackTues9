import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        // drawerStyle={{
        //   display: useNavigation().getState().index === 0 ? 'none' : 'flex'
        // }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const signoutHandler = () => {
    if (auth.currentUser) {
      auth
        .signOut()
        .then(() => {
          navigation.navigate("Login");
        })
        .catch((error) => alert(error.message));
    } else {
      alert("No user is currently signed in");
    }
  };

  return (
    <View style={styles.drawer}>
      
      <TouchableOpacity onPress={signoutHandler}>
        <Text style={styles.drawerItem}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#FFE5B4",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerItem: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
