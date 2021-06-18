import React from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from "react-redux";


class HistoricItem extends React.Component {
  render() {
    const cityName = this.props.data;
    return(
        <View style={styles.main_container}>
            <Text>{cityName}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    main_container: {
        height: 40,
        // backgroundColor: 'grey',
        justifyContent: 'center',
        paddingLeft: 5,
        borderBottomWidth: 0.5,
        // borderTopWidth: 0.5,
    }
});

export default HistoricItem;