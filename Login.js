import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Signup from './Signup'; // Import your SignupPage component
import {url} from './URL';

const Login = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    try {
      console.log(id);
      console.log(password);
      const formData = new FormData();
      formData.append('id', id);
      formData.append('Password', password);
      const response = await fetch(url + 'userLogin/validUserLogin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (response.ok) {
        const datas = await response.json();
        console.log(datas[0].role);
        let role = datas[0].role;
        if (role === 'admin') {
          navigation.navigate('AdminDashboard');
        } else if (role == 'user') {
          navigation.navigate('UserDashboard', {userID: id});
        }
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.headerText}>Old Exams Repository & Quiz</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="User ID"
          onChangeText={setId}
          value={id}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={userLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, {color: 'black'}]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.footerText, {color: 'blue'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 15,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
});

export default Login;
