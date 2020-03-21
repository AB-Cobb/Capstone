/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import LayoutScreen from './src/screens/LayoutScreen';
import ReadyScreen from './src/screens/ReadyScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import TeamScreen from './src/screens/TeamScreen';
import AddLayoutModal from './src/screens/AddLayoutModal';
import AddTeammateModal from "./src/screens/AddTeammateModal";
import ReadyRecordingModal from "./src/screens/ReadyRecordingModal";
import ViewTeammateModal from "./src/screens/ViewTeammateModal";
import EditTeammateModal from "./src/screens/EditTeammateModal";
import ViewLayoutScreen from "./src/screens/ViewLayoutScreen";
import ViewAnalyticsModal from "./src/screens/ViewAnalyticsModal";

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

const TabStack = createBottomTabNavigator({
    Home: HomeStack,
    Layout: LayoutStack,
    Ready: ReadyStack,
    Analytics: AnalyticsStack,
    Team: TeamStack,
});

const RootStack = createStackNavigator({
  Tabs: {
      screen: TabStack,
      navigationOptions: ({ navigation }) => ({
          headerShown: false
      })
  },
  AddLayout: {screen: AddLayoutModal},
  AddTeammate: {screen: AddTeammateModal},
  ViewTeammate: {screen: ViewTeammateModal},
  EditTeammate: {screen: EditTeammateModal},
  ReadyRecording: {screen: ReadyRecordingModal},
  ViewLayout: {screen: ViewLayoutScreen},
  ViewAnalytics: {screen: ViewAnalyticsModal}
},{
    header: null
});

export default createAppContainer(
  RootStack
);
