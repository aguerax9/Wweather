import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import { getIcon } from '../api/OpenWeatherApi'

export default class ForcastWeatherItem extends React.Component {
    render() {
        const weatherData = this.props.data;
        return(
            <TouchableOpacity style={styles.main_container} onPress={() => this.props.displayForcastDetails(weatherData)}>
                <View style={styles.day_container}>
                    <Text style={styles.day_text}>{moment(weatherData.dt*1000).format('ddd').toUpperCase()}.</Text>
                    <Text style={styles.day_text}>{moment(weatherData.dt*1000).format('DD/MM')}</Text>
                </View>
                <View style={styles.icon_container}>
                    <Image style={styles.icon}
                        source={{uri: getIcon(
                            weatherData.weather.map(weather => {
                                return weather.icon;
                            })
                        )}}
                    />
                </View>
                <View style={styles.temp_container}>
                    <Text style={[styles.temp_text, {color: 'white'}]}>{Math.round(weatherData.temp.max)}</Text>
                    <Text style={styles.temp_text}>{Math.round(weatherData.temp.min)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginHorizontal: 5,
        height: 40,
        paddingLeft: 10,
        marginVertical: 2,
        flexDirection: 'row',
        backgroundColor: '#6A7A87',
        borderRadius: 3,
    },
    day_container: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    day_text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    icon_container: {
        flex: 2,
        marginVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 50,
        width: 50,
        right: 0,
    },
    temp_container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    temp_text: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});