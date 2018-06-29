import React from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import moment from 'moment';

import CitySelection from './components/CitySelection';
import { API_KEY, API_URL } from './utils/Constants'; 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      country: '',
      date: '',
      currentTemp: '',
      lowTemp: '',
      highTemp: '',
      humidity: ''
    };
    //bind the function to get the correct value of this
    this.getApiData = this.getApiData.bind(this);
  }

  async getApiData(city) {    
    try {
      //call the OpenWeather API to fetch the temperature
      let apiUrl = `${API_URL}?APPID=${API_KEY}&q=${city}&units=metric`;        
      let response = await fetch(apiUrl);
      let responseData = await response.json();  
      
      this.setState({
        city: responseData.city.name,
        country: responseData.city.country,
        date: responseData.list[0].dt_txt,
        currentTemp: responseData.list[0].main.temp,       
        lowTemp: responseData.list[0].main.temp_min,
        highTemp: responseData.list[0].main.temp_max,
        humidity: responseData.list[0].main.humidity
      });
      
    } catch(error) {
    //can log this error to database 
    console.error(error);
  }
}

  render() {
    return (
      <View style={styles.container}> 
        <CitySelection onCitySelected={this.getApiData} />
        {this.state.city ? <Text>{`City: ${this.state.city}`}</Text> : <Text></Text>}
        {this.state.country ? <Text>{`Country: ${this.state.country}`}</Text> : <Text></Text>}
        {this.state.date ? <Text>{`Date: ${moment(this.state.date).format('MM/DD/YYYY')}`}</Text> : <Text></Text>}
        {this.state.currentTemp ? <Text>{`Current Temp: ${this.state.currentTemp}`}</Text> : <Text></Text>}
        {this.state.lowTemp ? <Text>{`Minimium Temp: ${this.state.lowTemp}`}</Text> : <Text></Text>}
        {this.state.highTemp ? <Text>{`Maximum Temp: ${this.state.highTemp}`}</Text> : <Text></Text>}
        {this.state.humidity ? <Text>{`Humidity: ${this.state.humidity}`}</Text> : <Text></Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#41f4b2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
