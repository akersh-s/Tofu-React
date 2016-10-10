import React, {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    AlertIOS
} from 'react-native';

import Firebase from 'firebase';
import Button from './button.js';
import moment from 'moment';

const auth = new Firebase("https://burning-torch-1074.firebaseIO.com/users");

export default React.createClass({

  watchID: (null: ?number),

  getInitialState: function() {
    return {
      lastPosition: 'unknown',
      user: 'unknown'
    };
  },
  
  componentDidMount: function() {
    AsyncStorage.getItem('user').then((user) => {
      var user = JSON.parse(user);
      this.setState({"user": user.uid});
    }).done();
    
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});

      auth.child(this.state.user).update({
        geo: lastPosition
      });
      
      //AlertIOS.alert('tomato', this.state);

    });
    
  
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render() {
     return (
       <View style={styles.container}>
          <Text>Welcome</Text>

      <Text>
        <Text style={styles.title}>UID: </Text>
        {this.state.user}
        {this.state.lastPosition}
      </Text>

      <Button text={'TOFU'} onPress={this.onTofu} />
      <Button text={'Settings'} onPress={this.onSettingsPress} />

       </View>  
     );
  },
  
  getBackgroundImage(position) {
    fetch('http://www.panoramio.com/map/get_panoramas.php?callback=JSON_CALLBACK&set=public&from=0&to=10' +
          '&minx=' + (position.longitude - 1) +
          '&miny=' + (position.latitude - 1) +
          '&maxx=' + (position.longitude + 1) +
          '&maxy=' + (position.latitude + 1) +
          '&size=original&mapfilter=true', {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            AlertIOS.alert("GET RESPONSE",
                          "Search Query -> " + responseData.count)
          }).done();
  },
   
  onTofu() {
    auth.child(this.state.user).update({
      tofu: moment().format()
    });
  },

  onSettingsPress() {
      this.props.navigator.push({name: 'settings'})
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