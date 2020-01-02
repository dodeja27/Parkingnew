import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default class Signup extends Component {
  render() {
    return (
      <View style={{ paddingTop: 10, width: "50%" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Not registered ? </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.nav.navigate({ routeName: "registrationform" });
            }}
          >
            <Text style={{ color: "#3e84c9" }}> sign up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
