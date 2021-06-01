import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getIcon } from '../api/OpenWeatherApi'

export default class CurrentWeatherItem extends React.Component {
    render() {
        const cityName = this.props.cityName;
        const weatherData = this.props.data;
        return(
            <View style={styles.main_container}>
                <Image style={styles.icon} 
                    source={{uri: getIcon(
                        weatherData.current.weather.map(weather => {
                            return weather.icon;
                        })
                    )}} />
                <View style={styles.header_container}>
                    <Text style={styles.city_name_text}>{cityName}</Text>
                    <Text style={styles.description_text}>
                        {
                            weatherData.current.weather.map(weather => {
                                return weather.description;
                            })
                        }
                    </Text>
                </View>
                <View style={styles.info_container}>
                    <Text style={styles.main_temp}>{Math.round(weatherData.current.temp)}°</Text>
                    <Text style={styles.max_min_temp}>Max: {Math.round(weatherData.daily[0].temp.max)}° Min: {Math.round(weatherData.daily[0].temp.min)}°</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        // backgroundColor: 'lightgrey',
        // marginBottom: 20,
        // borderRadius: 3,
        borderTopWidth: 3,
        borderBottomWidth: 3,
    },
    icon: {
        height: 90,
        width: 90,
        position: 'absolute',
        right: 0,
    },
    header_container: {
        flex: 2,
    },
    city_name_text: {
        textAlign: 'center',
        fontSize: 30,
    },
    description_text: {
        textAlign: 'center',
        fontSize: 16,
    },
    info_container: {
        flex: 3,
    },
    main_temp: {
        textAlign: 'center',
        fontSize: 50,
    },
    max_min_temp: {
        textAlign: 'center',
        fontSize: 16,
    }
});