import React, { Component } from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Home from "../screens/home";
import Dashboard from "../components/dashboard.component";
import RegistrationForm from "../components/form.component";
import SpotRegistration from "../components/SpotRegistration.component";
// const Main = createStackNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       header: null
//     }
//   },
//   // registraion: registraion,
//   registrationform:RegistrationForm,
//   dashboard:Dashboard,
//   spotregistration:SpotRegistration
  
// });

// export default createAppContainer(Main);
class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Dashboard: Dashboard ,  spotregistration:SpotRegistration});
const AuthStack = createStackNavigator({ Home: Home, registrationform:RegistrationForm });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppContainer;