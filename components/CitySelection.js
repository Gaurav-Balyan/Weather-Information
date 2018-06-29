import React, { Component } from 'react';
import { Text,TextInput, View, Button, StyleSheet } from 'react-native'; 
import { ALPHABHETS } from '../utils/Regexes';

export default class CitySelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            errorMessage: ''
        };
    }

    selectCity = () => {
           if (ALPHABHETS.test(this.state.city)){
            this.setState({
                errorMessage: ''
            });  
            this.props.onCitySelected(this.state.city);
           }
           else{
               this.setState({
                   errorMessage: 'Please enter valid city'
               });
        }
    }

    render() {
        return (    
        <View style={styles.cityView}>        
            <TextInput 
            placeholder="Enter city..."
            autoCapitalize='none'
            autoCorrect={true}           
            onChangeText={(city) => this.setState({city})}
            style={styles.tempText}
            value={this.setState.city}
            /> 
            {this.state.errorMessage ? <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> : <Text></Text>}
            <Button onPress={() => this.selectCity()} title="Get Temperature" />              
        </View>    
        );
    }
}

const styles = StyleSheet.create({
    cityView: {
        height: 100,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tempText: {
        height: 40, 
        width: 150
    },
    errorMessage: {
        color: '#FF3333'
    }
  });