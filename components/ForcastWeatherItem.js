import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

import { getIcon } from '../api/OpenWeatherApi'

export default class ForcastWeatherItem extends React.Component {


    render() {
        const weatherData = this.props.data;
        return(
            <View style={styles.main_container}>
                <View style={styles.day_container}>
                    <Text style={styles.day_text}>{moment(weatherData.dt*1000).format('dddd')}</Text>
                </View>
                <View style={styles.icon_container}>
                    <Image style={styles.icon}
                        source={{uri: getIcon(
                            weatherData.weather.map(weather => {
                                return weather.icon;
                            })
                        )}} />
                </View>
                <View style={styles.temp_container}>
                    <Text style={styles.temp_text}>{Math.round(weatherData.temp.max)}</Text>
                    <Text style={[styles.temp_text, {color: 'lightgray'}]}>{Math.round(weatherData.temp.min)}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 40,
        paddingLeft: 10,
        marginVertical: 2,
        flexDirection: 'row',
        // backgroundColor: 'lightgray',
        // borderRadius: 3,
        borderBottomWidth: 1,
    },
    day_container: {
        flex: 3,
        justifyContent: 'center',
    },
    day_text: {
        fontSize: 18,
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