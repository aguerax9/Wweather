import React from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import CurrentWeather from './CurrentWeather';
import ForcastWeatherItem from './ForcastWeatherItem';

import { getCurrentWeather, get7DaysForcast } from '../api/OpenWeatherApi';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.searchText = "";
    this.state = {
      currentWeather: undefined,
      forcastWeather: [],
      isLoading: false,
    };
  }

  _textInputChanged(text) {
    this.searchText = text;
  }

  _load7DaysForcastWeatherData() {
    get7DaysForcast(this.state.currentWeather.coord.lat, this.state.currentWeather.coord.lon)
      .then(data => {
        this.setState({
          forcastWeather: data,
        });
      });
  }

  _loadWeatherData() {
    if (this.searchText.length > 0) {
      this.setState({isLoading: true});
      getCurrentWeather(this.searchText).then(data => {
        this.setState({
          currentWeather: data,
          isLoading: false,
        }, () => {
          this._load7DaysForcastWeatherData();
        });
      });
    }
  }

  _displayWeatherData() {
    if (this.state.currentWeather !== undefined) {
      return(
        <CurrentWeather data={this.state.currentWeather} />
      ); 
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
        return(
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
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
          fontSize={18}
          onChangeText={(text) => this._textInputChanged(text)}
          onSubmitEditing={() => this._loadWeatherData()} 
        />
        <View style={styles.button}>
          <Button
            title="Search"
            color='white'
            onPress={() => this._loadWeatherData()} 
          />
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
    // backgroundColor: '#B1CCE1',
  },
  input: {
    height: 40,
    borderWidth: 1.5,
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