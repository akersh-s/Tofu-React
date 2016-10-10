'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  AsyncStorage
} from 'react-native';

import Firebase from 'firebase';
import Button from './button.js';

const auth = new Firebase("https://burning-torch-1074.firebaseIO.com");

export default React.createClass({
  getInitialState() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>

        <TextInput
          value={this.state.email}
          placeholder="E-mail"
          onChangeText={(text) => this.setState({email: text})}
          style={styles.input} />

        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input} />
        
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        
        <Button text={'Login'} onPress={this.onSignInPress} />
        <Button text={'Sign Up'} onPress={this.onSignUpPress} />

      </View>
    );
  },
  onSignInPress() {

      auth.authWithPassword({
        email    : this.state.email,
        password : this.state.password
      }, (error, authData) => {
        if (error) {
            this.setState({errorMessage: error.message});
        } else {
            AsyncStorage.setItem('user', JSON.stringify(authData));
            this.props.navigator.immediatelyResetRouteStack([{name: 'dashboard'}]);
        }
    });
  },
   onSignUpPress() {
        this.props.navigator.push({name: 'signup'})
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    //marginTop: 200
  },
  optionsContainer: {
    flex:0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height:10,
    margin:20,
    padding:20

  },
  label: {
    fontSize: 12
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 1,
    margin: 5,
    width: 250,
    alignSelf: 'center',
    fontSize: 12
  }
});