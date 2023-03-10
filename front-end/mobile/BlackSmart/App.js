import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Settings from "./screens/Settings";
import HaveIBeenPwned from "./screens/HaveIBeenPwned";
import HistoryLogLocation from "./screens/HistoryLogLocation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { BleManager } from 'react-native-ble-plx';
import { useState, useEffect } from 'react';
import * as Location from "expo-location";




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
      <Drawer.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          // hide Whole drawer navigation bar
          headerShown: false
        
          }}/>
      <Drawer.Screen name="Settings" component={Settings} />
      {/* <Drawer.Screen name="Have I Been Pwned" component={HaveIBeenPwned} /> */}
      {/* HistoryLogLocation.js */}
      {/* <Drawer.Screen name="History Log Location" component={HistoryLogLocation} /> */}
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  // const [bluetoothPermission, setBluetoothPermission] = useState(null);

  const getCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log("coords: ", location.coords.latitude, location.coords.longitude);
    
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
    // .then((coords) => {
    //   console.log(coords);
    // });

  }, []);

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
          
          <TouchableOpacity onPress={() => navigation.navigate("Home", {coords: coords})}>
            <Text style={styles.drawerItem}>Home</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate("History Log Location")}>
            <Text style={styles.drawerItem}>History Log Location</Text>
          </TouchableOpacity> */}


          <View style={styles.drawerItemWrapper}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Have I Been Pwned")}>
              <Text style={styles.drawerItem}>Have I Been Pwned</Text>
            </TouchableOpacity> */}
          </View>

          

        

        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.drawerItem}>Settings</Text>
        </TouchableOpacity>

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
    // add a shadow to the drawer
    
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
