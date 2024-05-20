import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/images/logo.jpeg'

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
   <Text style={styles.title}>To Do</Text>
      <Image
        source={logo} 
        style={styles.logo}
      />
   
      <View style={styles.buttonContainer}>
       
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}> Or Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#8D6DE5',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center"
  },
  loginText: {
    color: '#8D6DE5',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10
  },
  loginButton: {
 alignItems: "center"
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
