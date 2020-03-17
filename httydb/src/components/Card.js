import React from 'react';
import {View, Dimensions} from 'react-native';

const Card = props => {
  const {containerStyle} = styles;

  return <View style={containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#F06449',
    borderBottomWidth: 1,
    shadowColor: '#820933',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.2,
  },
};

export default Card;
