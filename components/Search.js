import React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import CurrentWeatherItem from './CurrentWeatherItem';
import ForcastWeatherItem from './ForcastWeatherItem';

import { getCurrentWeather, get7DaysForcast } from '../api/OpenWeatherApi';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.searchText = "";
    this.state = {
      weatherData: undefined,
      cod: "",
      cityName: "",
      isLoading: false,
    };
  }

  _textInputChanged(text) {
    this.searchText = text;
  }

  _loadWeatherData() {
    if (this.searchText.length > 0) {
      getCurrentWeather(this.searchText).then(data => {
        this.setState({
          cod: data.cod,
        });
        if (this.state.cod == "200") {
          this.setState({
            isLoading: true,
            cityName: data.name,
          });
          get7DaysForcast(data.coord.lat, data.coord.lon).then(ddata => {
            this.setState({
              weatherData: ddata,
              isLoading: false,
            });
          });
        }
      });
    }
  }

  _displayCurrentWeatherData() {
    if (this.state.weatherData != undefined) {
      return(
        <CurrentWeatherItem cityName = {this.state.cityName} data={this.state.weatherData} />
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='black' />
            </View>
        );       
    }
  }

  _displayWeatherData() {
    if (this.state.weatherData != undefined && this.state.cod == "200") {
      return(
        <View style={{flex: 1}}>
          <View>
            <CurrentWeatherItem cityName={this.state.cityName} data={this.state.weatherData} />
          </View>
          <FlatList 
            data={this.state.weatherData.daily}
            keyExtractor={(item) => item.dt}
            renderItem={({item}) => <ForcastWeatherItem data={item} />}
          />
        </View>
      );
    } else if (this.state.cod == "404") {
      return(
        <View style={styles.error_container}>
          <Text style={styles.error_text}>Location not found, try again.</Text>
        </View>
      );
    }
  }

  render() {
    return(
      <View style={styles.main_container}>
        <TextInput 
          style={styles.input} 
          placeholder="Country or city name ..."
          placeholderTextColor='black'
          fontSize={20}
          onChangeText={(text) => this._textInputChanged(text)}
          onSubmitEditing={() => this._loadWeatherData()} />
        <View style={styles.button}>
          <Button
            title="Search"
            color='white'
            onPress={() => this._loadWeatherData()} />
        </View>
        {this._displayWeatherData()}
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#B1CCE1',
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderRadius: 3,
    padding: 5,
    marginHorizontal: 5,
    marginTop: 50,
  },
  button: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#198CE7',
    backgroundColor: '#198CE7',
    marginHorizontal: 5,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_container: {
    height: 40,
    // backgroundColor: '#E82542',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  error_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E82542',
  }
});

export default Search;