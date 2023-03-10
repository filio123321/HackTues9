import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { auth, database } from "../firebase";

export default function HomeScreen ({ route }) {
  const { coords } = route.params;
  const waypointIcon = require("./../assets/bag.png");

  const [waypoint, setWaypoint] = useState({ latitude: 0, longitude: 0 });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [foundRegion, setFoundRegion] = useState(false);

  // do an async function to get the location
  const getLoc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    // console.log('Golqm Kur');
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);
    // console.log('Golqm Kur');
  };



  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });


  useEffect(() => {
    if ( coords.latitude !== 0 && coords.longitude !== 0) {
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setFoundRegion(true);
    }
  }, [coords]);



  // useEffect(() => {
  //   getLoc();
  //   console.log(location);
  //   // location.coords.latitude
  //   // location.coords.longitude

  //   setRegion({
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.005,
  //     longitudeDelta: 0.005,
  //   });
    
  // }, []);

  const geocodeLocation = async () => {
    const logsRef = database.ref(`users/${auth.currentUser.uid}/logs`);

    logsRef
      .orderByChild("timestamp")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        const log = snapshot.val();
        const latitude = log[Object.keys(log)[0]].geolocation.latitude;
        const longitude = log[Object.keys(log)[0]].geolocation.longitude;

        setWaypoint({ latitude: latitude, longitude: longitude });
      })
      .catch((error) => {
        console.error("Error getting youngest log:", error);
      });
  };

  useEffect(() => {
    setInterval(() => {
      geocodeLocation();
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);


      console.log(location.coords.latitude);
      console.log(location.coords.longitude);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      console.log(region);

      setFoundRegion(true);

    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: waypoint.latitude,
            longitude: waypoint.longitude,
          }}
          title="My Bag"
          image={waypointIcon}
        />
      </MapView> */}
      {/* if foundRegion is true, show thing above, else loading screen */}
      {foundRegion ? (
        <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: waypoint.latitude,
            longitude: waypoint.longitude,
          }}
          title="My Bag"
          image={waypointIcon}
        />
      </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});






// settings
// // za vseki senzor ili za celiq device vkluch izkluch

