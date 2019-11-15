import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Signin from "../components/Signin.component";
import Signup from "../components/Signup.component";
export default class Home extends React.Component {
  static navigationOptions = {
    header:null
  }
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    return (
      <ImageBackground
        source={require("../Artboard1.png")}
        style={style.imagestyle}
      >
        <View style={style.container}>
          <Signin nav={this.props.navigation}/>
          <Signup nav={this.props.navigation} />
          {/* <View style={style.contentstyle}>
            <Text>Not registered ? </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate({ routeName: "registraion" });
              }}
            >
              <Text style={{ color: "#0000ff" }}> sign up </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ImageBackground>
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
  imagestyle: {
    width: "100%",
    height: "100%"
  },
  contentstyle: {
    paddingTop: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center"
  }
});
