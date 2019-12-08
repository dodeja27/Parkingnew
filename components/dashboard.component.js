import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage,Text } from "react-native";
import { Button } from "react-native-elements";
import {
  HeaderButtons,
  HeaderButton,
  Item
} from "react-navigation-header-buttons";

const IoniconsHeaderButton = props => (
  <HeaderButton {...props} iconSize={23} color="black" />
);
export default class Dashboard extends Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <HeaderButtons.Item
            title="LOGOUT"
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate("Auth");
            }}
          />
        </HeaderButtons>
      )
    };
  };

  handlePress = async () => {
    console.log("pressed");
  };
  render() {
    return (
      <View style={style.container}>
        <Text style={{fontSize:50, marginBottom:35}}>Park Here</Text>
        <View style={{ width: "50%" }}>
          <Button
            large
            buttonStyle={style.Button}
            title="Pick a spot"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "spotpicker" });
            }}
          />

          <Button
            buttonStyle={style.Button}
            title="Register a spot"
            onPress={() => {
              this.props.navigation.navigate({ routeName: "spotregistration" });
            }}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent: "space-between",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  contentstyle: {
    paddingTop: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center"
  },
  Button: {
    marginBottom: 10,
    backgroundColor: "black",
    padding: 20
  }
});
