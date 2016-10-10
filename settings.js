import React, {
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';

import Firebase from 'firebase';
import Button from './button.js';

const auth = new Firebase("https://burning-torch-1074.firebaseIO.com/users");

export default React.createClass({

  getInitialState: function() {
    return {
      user: 'unknown'
    };
  },

  componentDidMount: function() {

    AsyncStorage.getItem('user').then((user) => {
      var user = JSON.parse(user);
      this.setState({"user": user.uid});
    }).done();
  },

  render() {
     return (
       <View style={styles.container}>
          <Text>Settings</Text>

      <Text>
        <Text style={styles.title}>UID: </Text>
        {this.state.user}
      </Text>
        <Button text={'Back'} onPress={this.onBackPress} />

       </View>  
     );
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
       backgroundColor: 'white'
   } 
});