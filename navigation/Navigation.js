import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Search from "../components/Search";
import ForcastDetails from "../components/ForcastDetails";
import HistoricSearch from "../components/HistoricSearch";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return(
        <Stack.Navigator initialRouteName="Recherche">
            <Stack.Screen name="Recherche" component={Search} />
            <Stack.Screen name="Infos" component={ForcastDetails} />
        </Stack.Navigator>
    );
}

function MyTabs() {
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: 'lightgrey',
            }}
        >
            <Tab.Screen 
                name="Recherche" 
                component={MyStack} 
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <View style={styles.icon_container}>
                            <Image 
                                source={require('../images/ic_search.png')} 
                                style={styles.icon} 
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen 
                name="Historique" 
                component={HistoricSearch} 
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <View style={styles.icon_container}>
                            <Image 
                                source={require('../images/icon_history.png')} 
                                style={styles.icon} 
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    icon_container: {
        marginTop: 15,
    },
    icon: {
        width: 40,
        height: 40,
    },
});