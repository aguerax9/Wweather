import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import moment from "moment";

import { getIcon } from '../api/OpenWeatherApi';

export default class ForcastDetails extends React.Component {

    render() {
        const weatherData = this.props.route.params.weatherData;
        return(
            <ScrollView style={styles.main_container}>
                <View style={styles.header_container}>
                    <Text style={styles.day_text}>{moment(weatherData.dt*1000).format('MMMM Do YYYY').toUpperCase()}</Text>
                    <Text style={styles.description_text}>
                        {
                            weatherData.weather.map(weather => {
                                return weather.description;
                            })
                        }
                    </Text>
                    <Image style={styles.icon}
                        source={{uri: getIcon(
                            weatherData.weather.map(weather => {
                                return weather.icon;
                                })
                            )
                        }}
                    />
                </View>
                <View style={[styles.current_info_container, {borderTopWidth: 1}]}>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Max</Text>
                        <Text style={{fontSize: 30}}>{Math.round(weatherData.temp.max)}°</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Min</Text>
                        <Text style={{fontSize: 30}}>{Math.round(weatherData.temp.min)}°</Text>
                    </View>
                </View>
                <View style={styles.current_info_container}>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Sunrise</Text>
                        <Text style={{fontSize: 30}}>{moment(weatherData.sunrise*1000).format('LT')}</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Sunset</Text>
                        <Text style={{fontSize: 30}}>{moment(weatherData.sunset*1000).format('LT')}</Text>
                    </View>
                </View>
                <View style={styles.current_info_container}>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Humidity</Text>
                        <Text style={{fontSize: 30}}>{weatherData.humidity} %</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Pressure</Text>
                        <Text style={{fontSize: 30}}>{weatherData.pressure} hPa</Text>
                    </View>
                </View>
                <View style={styles.current_info_container}>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Clouds</Text>
                        <Text style={{fontSize: 30}}>{weatherData.clouds} %</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.data_name_text}>Precipitaion vol.</Text>
                        <Text style={{fontSize: 30}}>
                            {weatherData.rain} mm
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    temp_fl_container: {
        height: 200,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
    },
    temp_container: {
        flex: 2,
        alignItems: 'center',
    },
    fl_container: {
        flex: 2,
        alignItems: 'center',
    },
    current_info_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#6A7A87',
        paddingLeft: 5,
    },
    header_container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6A7A87',
        marginHorizontal: 5,
        borderRadius: 3,
    },
    day_text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        // textAlign: 'center',
    },
    icon: {
        height: 90,
        width: 90,
    },
    description_text: {
        fontSize: 18,
        // fontStyle: 'italic',
        color: 'white',
    },
    data_name_text: {
        fontSize: 20, 
        color: '#9A9898',
    }
});