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
      drawerStyle={{
        // display: useNavigation().getState().routeNames.includes('Login') ? 'flex' : 'flex',
        // height: 10// set the height of the drawer as required
      }}
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
      
      {/* <TouchableOpacity onPress={signoutHandler}>
        <Text style={styles.drawerItem}>Sign out</Text>
      </TouchableOpacity> */}

      {/* add Login if user is not logged in in the bottom, if he is logged in make that Sign out */}



      {/* {auth.currentUser ? (
        <TouchableOpacity onPress={signoutHandler}>
          <Text style={styles.drawerItem}>Sign out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.drawerItem}>Login</Text>
        </TouchableOpacity>
      )} */}

      {/* add a wrapper for the login/signout button */}
      <View style={styles.drawer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.drawerItem}>Home</Text>
          </TouchableOpacity>

          {/* Add a separate wrapper for the pages */}
          <View style={styles.drawerItemWrapper}>
            {/* Add your other pages here */}
          </View>
        </View>

        {/* Add a separate wrapper for the Login/Signout button */}
        <View style={styles.bottomButtonWrapper}>
          {auth.currentUser ? (
            <TouchableOpacity onPress={signoutHandler}>
              <Text style={styles.drawerItem}>Sign out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.drawerItem}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>






    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerItem: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drawerItemWrapper: {
    flex: 1,
  },
  // add a wrapper for the login/signout button
  bottomButtonWrapper: {
    paddingBottom: 20,
  },
});
