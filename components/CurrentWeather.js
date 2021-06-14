import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getIcon } from '../api/OpenWeatherApi'

export default class CurrentWeather extends React.Component {
    render() {
        const currentWeatherData = this.props.data;
        const icon_path = currentWeatherData.weather.map(weather => {
            return weather.icon;
        });
        return(
            <View style={styles.main_container}>
                <View style={styles.name_container}>
                    <Text style={styles.city_name_text}>{currentWeatherData.name}</Text>
                    <Text style={styles.description_text}>
                        {
                            currentWeatherData.weather.map(weather => {
                                return weather.description;
                            })
                        }
                    </Text>
                    <Image
                        style={styles.icon}
                        source={{
                            uri: getIcon(icon_path)
                        }}
                    />
                </View>
                <View style={styles.temp_container}>
                    <Text style={styles.main_temp}>{Math.round(currentWeatherData.main.temp)}°</Text>
                    <Text style={styles.feels_like_text}>Feels like</Text>
                    <Text style={styles.feels_like_temp_text}>{Math.round(currentWeatherData.main.feels_like)}°</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 150,
        marginHorizontal: 5,
        marginBottom: 3,
        // backgroundColor: '#EEEEEE',
        borderRadius: 3,
        flexDirection: 'row',
    },
    name_container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        margin: 3,
        borderRadius: 3,
    },
    city_name_text: {
        flex: 2,
        fontSize: 30,
    },
    description_text: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    temp_container: {
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        margin: 3,
        borderRadius: 3,
    },
    icon: {
        width: 90,
        height: 90,
    },
    main_temp: {
        textAlign: 'center',
        fontSize: 65,
        padding: 5,
        // color: '#000000',
    },
    feels_like_text: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    feels_like_temp_text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});