import React from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from "react-redux";

import CurrentWeather from './CurrentWeather';
import ForcastWeatherItem from './ForcastWeatherItem';

import { getCurrentWeather, get7DaysForcast } from '../api/OpenWeatherApi';

import moment from 'moment';

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
          forcastWeather: data.daily,
        }, () => {
          // permet de retirer les donnees d aujourd hui de la liste des previsions
          this.setState({
            forcastWeather: this.state.forcastWeather.filter((item, index) => index !== 0),
          });
        });
      });
  }

  _loadWeatherData() {
    if (this.searchText.length > 0) {
      this._addToHistoric();
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
        <View>
          <CurrentWeather data={this.state.currentWeather} />
          <FlatList 
            data={this.state.forcastWeather}
            keyExtractor={(item) => item.dt}
            renderItem={({item}) => <ForcastWeatherItem data={item} displayForcastDetails={this._displayForcastDetails} />}
            // scrollEnabled={false}
          />
          <ScrollView style={{height: 170}}>
            <View style={[styles.current_info_container, {borderTopWidth: 1}]}>
              <View style={{flex: 2}}>
                <Text style={styles.data_name_text}>Max</Text>
                <Text style={{fontSize: 30}}>{Math.round(this.state.currentWeather.main.temp_max)}°</Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.data_name_text}>Min</Text>
                <Text style={{fontSize: 30}}>{Math.round(this.state.currentWeather.main.temp_min)}°</Text>
              </View>
            </View>
            <View style={styles.current_info_container}>
              <View style={{flex: 2}}>
                <Text style={styles.data_name_text}>Sunrise</Text>
                <Text style={{fontSize: 30}}>{moment(this.state.currentWeather.sys.sunrise*1000).format('LT')}</Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.data_name_text}>Sunset</Text>
                <Text style={{fontSize: 30}}>{moment(this.state.currentWeather.sys.sunset*1000).format('LT')}</Text>
              </View>
            </View>
            <View style={styles.current_info_container}>
              <View style={{flex: 2}}>
                <Text style={styles.data_name_text}>Humidity</Text>
                <Text style={{fontSize: 30}}>{this.state.currentWeather.main.humidity} %</Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.data_name_text}>Pressure</Text>
                <Text style={{fontSize: 30}}>{this.state.currentWeather.main.pressure} hPa</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        );
    }
  }

  _addToHistoric() {
    const action = {type: 'ADD_TO_HISTORIC', value: this.searchText};
    this.props.dispatch(action);
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate : ");
    console.log(this.props.historicResearch);
  }

  _displayForcastDetails = (data) => {
    // console.log(this.state.currentWeather.name);
    this.props.navigation.navigate('Infos', {weatherData: data});
  }

  render() {
    // console.log(this.props);
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
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1.5,
    borderRadius: 3,
    padding: 5,
    marginHorizontal: 5,
    // marginTop: 50,
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
  },
  current_info_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#6A7A87',
    paddingLeft: 5,
  },
  data_name_text: {
    fontSize: 20, 
    color: '#9A9898',
  }
});

const mapStateToProps = (state) => {
  return {
    historicResearch: state.historicResearch,
  };
}

export default connect(mapStateToProps)(Search);