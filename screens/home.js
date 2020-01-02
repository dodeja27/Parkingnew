import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Signin from "../components/Signin.component";
import Signup from "../components/Signup.component";
export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    return (
      <View style={style.container}>
        <Text style={{ fontSize: 50, marginBottom: 20 }}>Park Here</Text>
        <Signin nav={this.props.navigation} />
        <Signup nav={this.props.navigation} />
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
    backgroundColor: "white",
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
