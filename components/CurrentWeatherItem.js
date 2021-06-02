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
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 150,
        marginHorizontal: 5,
        borderBottomWidth: 3,
        marginBottom: 3,
        backgroundColor: '#6A7A87',
        borderRadius: 3,

    },
    icon: {
        height: 90,
        width: 90,
        position: 'absolute',
        right: 0,
    },
    header_container: {
        flex: 1,
    },
    city_name_text: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    description_text: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontStyle: 'italic',
    },
    info_container: {
        flex: 1,
    },
    main_temp: {
        textAlign: 'center',
        fontSize: 65,
        color: 'white',
    },
});