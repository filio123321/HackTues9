import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Screen = () => {
  const [email, setEmail] = useState('');
  const [isLeaked, setIsLeaked] = useState(true);

  const checkPasswordLeak = async () => {
    const userAgent = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'AppleWebKit/537.36 (KHTML, like Gecko)',
        'Chrome/58.0.3029.110',
        'Safari/537.36 Edge/16.16299'
    ].join(' ');
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://www.google.com/'
        },
        redirect: 'follow'
    };
    
    const encodedEmail = encodeURIComponent(email);
    
    const response = await fetch(`https://haveibeenpwned.com/unifiedsearch/${encodedEmail}`, requestOptions);
    

    // check if response is status code 404 (emaning no leaks found)
    console.log(response.status);

    if (response.status === 404) {
        setIsLeaked(false);
        }
    else {
        setIsLeaked(true);
    }

    
    

  }

  const handlePress = () => {
    checkPasswordLeak();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check If Your Password Has Been Leaked</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>
      {isLeaked ? (
        <View style={styles.leaked}>
          <Text style={styles.leakedText}>Your Password Has Been Leaked!</Text>
        </View>
      ) : (
        <View style={styles.notLeaked}>
          <Text style={styles.notLeakedText}>Your Password Is Safe!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  leaked: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leakedText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  notLeaked: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notLeakedText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Screen;
