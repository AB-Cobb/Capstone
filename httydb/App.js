/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import LayoutScreen from './src/screens/LayoutScreen';
import ReadyScreen from './src/screens/ReadyScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import TeamScreen from './src/screens/TeamScreen';

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
});

const LayoutStack = createStackNavigator({
  Layout: {screen: LayoutScreen},
});

const ReadyStack = createStackNavigator({
  Ready: {screen: ReadyScreen},
});

const AnalyticsStack = createStackNavigator({
  Analytics: {screen: AnalyticsScreen},
});

const TeamStack = createStackNavigator({
  Team: {screen: TeamScreen},
});

export default createAppContainer(
  createBottomTabNavigator({
    Home: HomeStack,
    Layout: LayoutStack,
    Ready: ReadyStack,
    Analytics: AnalyticsStack,
    Team: TeamStack,
  }),
);
