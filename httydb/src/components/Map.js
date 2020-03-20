import React, { Component } from 'react';
import {MapView, PROVIDER_GOOGLE } from 'react-native-maps';
import {AppRegistry} from 'react-native'

export default class Map extends React.Component {
    render() {
        return(
            <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} />
        );
    }
}

const styles = {
    mapStyle: {
        width: 410,
        height: 300
    }
}