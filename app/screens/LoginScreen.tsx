import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { RootStackParamList } from '../../types';
import { useDispatch } from 'react-redux';
import { userPreferences } from '../ducks';
import { login } from '../ducks/api/api.slice';


export default function LoginScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
  const dispatch = useDispatch();
  const [serverAddress, setServerAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <LoginInput
        label='Homebridge server address'
        placeholder='http://192.168.1.111:8581'
        value={serverAddress}
        leftIcon={{ ...leftIconStyle, name: 'server' }}
        onChangeText={value => setServerAddress(value)}
      />
      <LoginInput
        placeholder='Username'
        value={username}
        leftIcon={{ ...leftIconStyle, name: 'user' }}
        onChangeText={value => setUsername(value)}
      />
      <LoginInput
        placeholder='Password'
        value={password}
        secureTextEntry={true}
        leftIcon={{ ...leftIconStyle, name: 'lock' }}
        onChangeText={value => setPassword(value)}
      />

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          dispatch(login({
            serverAddress: serverAddress,
            username: username,
            password: password
          }))
          dispatch(userPreferences.actions.userLoggedIn({
            serverAddress: serverAddress,
            username: username,
            password: password
          }))
        }}
      >
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginInput(props: InputProps) {
  return (
    <Input
      {...props}
      style={styles.input}
      containerStyle={styles.inputContainer}
    />
  );
}

const leftIconStyle = {
  color: '#ffffffa3',
  type: 'font-awesome',
  iconStyle: { width: 30 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#413c69',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginBtn: {
    width: 200,
    alignItems: 'center',
    backgroundColor: '#a7c5eb',
  },
  loginBtnText: {
    fontSize: 20,
    color: '#413c69',
    padding: 10
  },
  input: {
    color: '#fff',
  },
  inputContainer: {
    maxWidth: 500
  }
});
