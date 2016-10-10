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
      passwordConfirmation: '',
      errorMessage: ''
    };
  },
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <TextInput
          value={this.state.email}
          placeholder="E-mail"
          onChangeText={(text) => this.setState({email: text})}
          style={styles.input} />

        <Text style={styles.label}></Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input} />

        <TextInput
          secureTextEntry={true}
          value={this.state.passwordConfirmation}
          placeholder="Confirm Password"
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          style={styles.input} />
        
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        
        <Button text={'Sign Up'} onPress={this.onSignUpPress} />
        <Button text={'Back'} onPress={this.onBackPress} />

      </View>
    );
  },
  onSignUpPress() {
    
    if (this.state.password !== this.state.passwordConfirmation ) {
      return this.setState({errorMessage: 'Your passwords do not match'});
    }
      auth.createUser({
        email    : this.state.email,
        password : this.state.password
      }, (error, authData) => {
        if (error) {
            this.setState({errorMessage: error.message});
        } else {
            this.props.navigator.push({name: 'dashboard'});
        }
    });
  },
 onBackPress() {
     this.props.navigator.pop();
 }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    //marginTop: 115
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