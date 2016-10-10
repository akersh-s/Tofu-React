'use strict';
import React, {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

export default React.createClass({
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor={'gray'}
                onPress={this.props.onPress}>
             <Text style={styles.buttonStyle}>{this.props.text}</Text>   
             </TouchableHighlight>   
        );
    } 
});

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: 'black',
        padding: 5,
        marginTop: 10,
        width: 250,
        height: 40
    },
    buttonText: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 20
    }
});