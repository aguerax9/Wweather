import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ForcastDetails extends React.Component {
    render() {
        console.log(this.props.route.params);
        return(
            <View style={styles.main_container}>
                <Text>Hello</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});