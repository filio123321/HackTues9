import React, { useState, useEffect } from "react";
import { StyleSheet, View, Switch, Text } from "react-native";
import { auth, database } from "./../firebase";
import { debounce } from "lodash";
import { useCallback } from "react";



export default function Settings () {
    const [deviceEnabled, setDeviceEnabled] = useState(true);
    const [accelerometerEnabled, setAccelerometerEnabled] = useState(true);
    const [pressureEnabled, setPressureEnabled] = useState(true);
    const [alarmEnabled, setAlarmEnabled] = useState(true);

    const optionsRef = database.ref(`users/${auth.currentUser.uid}/alerts`);
  
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    

   
      
    const updateAccelerometerServer = () => {
        optionsRef.update({
            Accelerometer: !accelerometerEnabled,
        });
    };
    
    const updatePressureServer = () => {
        optionsRef.update({
            Pressure: !pressureEnabled,
        });
    };
    
    const updateAlarmServer = () => {
        optionsRef.update({
            Alarm: !alarmEnabled,
        });
    };


    const updateDeviceServer = () => {
        // optionsRef.child('alerts').push({'Device': true})
        // if !deviceEnabled is false, set all others to false
        if (deviceEnabled) {
            if (accelerometerEnabled) {
                setAccelerometerEnabled(false);
                optionsRef.update({
                    Accelerometer: !accelerometerEnabled,
                });
            }
            if (pressureEnabled) {
                setPressureEnabled(false);
                optionsRef.update({
                    Pressure: !pressureEnabled,
                });
            }
            if (alarmEnabled) {
                setAlarmEnabled(false);
                optionsRef.update({
                    Alarm: !alarmEnabled,
                });
            }

        }

        optionsRef.update({
            Device: !deviceEnabled,
        });
      };
      


  
    const getValuesServer = () => {
      optionsRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setDeviceEnabled(data.Device);
        setAccelerometerEnabled(data.Accelerometer);
        setPressureEnabled(data.Pressure);
        setAlarmEnabled(data.Alarm);
      });
    };
  
    // Get values from server on first render
    useEffect(() => {
      getValuesServer();
    }, []);
  
    const handleSwitchChange = (name, value) => {
      // Update state immediately
      switch (name) {
        case "Device":
          setDeviceEnabled(!deviceEnabled);
        //   updateDeviceServer();
          break;
        case "Accelerometer":
          setAccelerometerEnabled(!accelerometerEnabled);
            // updateAccelerometerServer();
          break;
        case "Pressure":
          setPressureEnabled(!pressureEnabled);
            // updatePressureServer();
          break;
        case "Alarm":
          setAlarmEnabled(!alarmEnabled);
            // updateAlarmServer();
          break;
        default:
          break;
      }
      // Debounce the update to the server
    //   updateValuesServer();

    optionsRef.update(
        {
            Accelerometer: accelerometerEnabled,
            Pressure: pressureEnabled,
            Alarm: alarmEnabled,
            Device: deviceEnabled,
            control: makeid(10),
        }
      )

      optionsRef.update(
        {
            Accelerometer: accelerometerEnabled,
            Pressure: pressureEnabled,
            Alarm: alarmEnabled,
            Device: deviceEnabled,
            control: makeid(10),
        }
      )


    };


    return (
        <View style={styles.container}>
          <View style={styles.OptionLineWrapper}>
            <Text style={styles.OptionLineText}>Device</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'gray' }}
              thumbColor={deviceEnabled ? '#39FF14' : '#FF3131'}
              ios_backgroundColor="#3e3e3e"
            //   onValueChange={(value) => handleSwitchChange("Device", value)}
                onValueChange={updateDeviceServer}
              value={deviceEnabled}
            /> 
          </View>

          <View style={styles.OptionLineWrapper}>
            <Text style={styles.OptionLineText}>Accelerometer</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'gray' }}
              thumbColor={accelerometerEnabled ? '#39FF14' : '#FF3131'}
              ios_backgroundColor="#3e3e3e"
            //   onValueChange={(value) => handleSwitchChange("Accelerometer", value) }
                onValueChange={updateAccelerometerServer}
              value={accelerometerEnabled}
              disabled={!deviceEnabled}
            /> 
          </View>
      
          <View style={styles.OptionLineWrapper}>
            <Text style={styles.OptionLineText}>Pressure</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'gray' }}
              thumbColor={pressureEnabled ? '#39FF14' : '#FF3131'}
              ios_backgroundColor="#3e3e3e"
            //   onValueChange={(value) => handleSwitchChange("Pressure", value)}
                onValueChange={updatePressureServer}
              value={pressureEnabled}
              disabled={!deviceEnabled}
            /> 
          </View>
      
          <View style={styles.OptionLineWrapper}>
            <Text style={styles.OptionLineText}>Alarm</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'gray' }}
              thumbColor={alarmEnabled ? '#39FF14' : '#FF3131'}
              ios_backgroundColor="#3e3e3e"
            //   onValueChange={(value) => handleSwitchChange("Alarm", value)}
                onValueChange={updateAlarmServer}
              value={alarmEnabled}
              disabled={!deviceEnabled}
            /> 
          </View>
        </View>
      );
      
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    OptionLineWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 5,
      paddingHorizontal: 20,
    },
    OptionLineText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    OptionLineSwitch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    disabledOptionLineText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "grey",
    },
    disabledOptionLineSwitch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    disabledOptionLineWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 5,
      paddingHorizontal: 20,
      opacity: 0.5,
    },
  });
  