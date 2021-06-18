import React from 'react';
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from "react-redux";

import HistoricItem from "./HistoricItem";

class HistoricSearch extends React.Component {

    _delete_historic() {
        const action = {type: 'DELETE_HISTORIC'};
        this.props.dispatch(action);
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View style={styles.title_container}>
                    <Text style={styles.title_text}>Historique de recherches</Text>
                </View>
                <FlatList 
                    data={this.props.historicResearch}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => <HistoricItem data={item} />}
                />
                <Button title="Supprimer" color="red" onPress={() => this._delete_historic()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 40,
    },
    title_container: {
        height: 40,
        // backgroundColor: 'grey',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
    },
    title_text: {
        textAlign: 'center',
        fontSize: 20,
    }
});

const mapStateToProps = (state) => {
    return {
      historicResearch: state.historicResearch,
    };
}

export default connect(mapStateToProps)(HistoricSearch);