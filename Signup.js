import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {url} from './URL';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const signup = async () => {
    if (pass !== confirmPass) {
      alert('Passwords do not match');
      return;
    }

    const data = {Name: name, Password: pass, role: 'User'};

    const response = await fetch(url + 'AttemptQuiz/takeQuiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Signup successful');
      navigation.navigate('Login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Let's Sign Up!...</Text>
        <Text style={styles.subtitle}>
          Create an account to continue Allcourses...
        </Text>
        <TextInput
          onChangeText={setName}
          style={{
            height: 50,
            width: '100%',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 120,
          }}
          placeholder="User Name"
        />
        <TextInput
          onChangeText={setPass}
          style={{
            paddingHorizontal: 125,
            height: 50,
            width: '100%',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
          }}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          onChangeText={setConfirmPass}
          style={{
            paddingHorizontal: 95,
            height: 50,
            width: '400%',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
          }}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={signup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.footerText, {color: 'blue'}]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Signup;
