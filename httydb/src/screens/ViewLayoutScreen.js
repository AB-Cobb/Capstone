import React from 'react';
import {View, Button, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import LayoutRow from "../components/LayoutRow";
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar } from 'react-native-elements';

class ViewLayoutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
        }
    }

    CreateRows = (numRows) => {
        const rows = [];
        for (let i = 0; i < numRows; i++){
            rows.push(<LayoutRow key={i}/>)
        }
        return rows;
    };

    render() {
        const rows = this.CreateRows(10);



        console.log('Rendered Layout Screen!');
        return (
            <View>
                <View style={styles.ViewStyle}>
                    <View style={styles.BoatOutline}>
                        {rows}
                    </View>
                    <TouchableOpacity onPress={() => this.RBSheet.open()}><Text>Click to view Teammates</Text></TouchableOpacity>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={300}
                    duration={250}
                >
                    <SearchBar
                        placeholder={"Search for a teammate..."}
                        onChangeText={term => this.setState({searchTerm: term})}
                        searchIcon={false}
                        clearIcon={false}
                        value={this.state.searchTerm}
                        lightTheme={true}
                    />
                </RBSheet>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    ViewStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    RecentHeaderStyle: {
        alignSelf: 'center',
    },
    BoatOutline: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 4,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
    }
});

export default ViewLayoutScreen;
