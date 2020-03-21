import React from 'react';

class ViewAnalyticsModal extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleAlign: "center",
        };
    };

    constructor(props){
        super(props);
    }

    render() {
        console.log('Rendered ViewAnalyticsModal!');

        return (
            <View>
                Analytics Modal!
            </View>
        )
    }
}

export default ViewAnalyticsModal