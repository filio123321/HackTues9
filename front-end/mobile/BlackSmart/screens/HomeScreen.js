import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { auth, database } from "../firebase";





export default function HomeScreen() {
  // const waypointIcon = require('./../assets/bag.png');
  // change the resolution of the icon
  const waypointIcon = require("./../assets/bag.png");


  
  // const geolocation = { latitude: 42.687710, longitude: 23.296888 };


  // const timestamp = new Date().getTime();

  // const logsRef = database.ref(`users/${auth.currentUser.uid}/logs`);

  // logsRef.push({ geolocation, timestamp })
  //   .then(() => {
  //     console.log('Log created successfully');
  //   })
  //   .catch((error) => {
  //     console.error('Error creating log:', error);
  //   });


  const [waypoint, setWaypoint] = useState({ latitude: 0, longitude: 0 });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    
    atitudeDelta: 0.05,
    longitudeDelta: 0.05,

  });

  const PLTest_1 = {
    // 42.687966, 23.297014
    latitude: 42.687966,
    longitude: 23.297014,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
    
  };

  const PLTest_2 = {
    // 42.687842, 23.296784
    latitude: 42.687842,
    longitude: 23.296784,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const PLTest_3 = {
    // 42.687710, 23.296888
    latitude: 42.687710,
    longitude: 23.296888,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };


  const geocodeLocation = async () => {
    // console.log('ne stana');

    // dbRef.orderByChild('time').limitToLast(1).on('value', snapshot => {
    //   console.log('DAAAA');

    //   const lastEntry = snapshot.val();

    //   console.log(lastEntry);

    //   setWaypoint({ latitude: lastEntry.latitude, longitude: lastEntry.longitude});
    // });

    // list all entried in the database

    const logsRef = database.ref(`users/${auth.currentUser.uid}/logs`);

    logsRef.orderByChild('timestamp').limitToLast(1).once('value')
    .then((snapshot) => {
      const log = snapshot.val();
      // console.log('Youngest log:', log);
      // Youngest log: {"-NQ8MJBBm8erA2S2RBWU": {"geolocation": {"latitude": 42.68771, "longitude": 23.296888}, "timestamp": 1678415576929}}

      const latitude = log[Object.keys(log)[0]].geolocation.latitude;
      const longitude = log[Object.keys(log)[0]].geolocation.longitude;

      // console.log(latitude);
      // console.log(longitude);

      setWaypoint({ latitude: latitude, longitude: longitude});
    })
    .catch((error) => {
      console.error('Error getting youngest log:', error);
    });


  };
  
  useEffect(() => {
    // geocodeLocation();

    // do a setInterval here
    setInterval(() => {
      // console.log('.');
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

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
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
        <Polyline
          coordinates={[ PLTest_1, PLTest_2, PLTest_3 ]}
          strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
          lineDashPattern={[1]}
        />


        {/* <MapView.Marker
          coordinate={{
            latitude: "42.687966",
            longitude: "23.297014",
          }}
          title="Waypoint"
          image={waypointIcon}
        /> */}

        

      </MapView>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={zoomIn}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={zoomOut}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
});
