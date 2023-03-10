import React, { useState, useEffect } from "react";
import { StyleSheet, View, Switch, Text } from "react-native";
import { auth, database } from "../firebase";

export default function Settings () {
    const [isEnabled, setIsEnabled] = useState(false);


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <View style={styles.container}>
        <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text>
        <Switch
            trackColor={{ false: 'gray', true: 'gray' }}
            thumbColor={isEnabled ? '#39FF14' : '#FF3131'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
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

});

