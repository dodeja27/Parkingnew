import React, { Component } from "react";
import { StyleSheet, View  } from "react-native";
import { Button} from "react-native-elements";

export default class Dashboard extends Component {
  render() {
    return (
      <View style={style.container}>
        {/* <Text>dashboard content</Text> */}
        <View style={{ width: "50%" }}>
          <Button large buttonStyle={style.Button} title="Pick a spot" onPress={() => {
              this.props.navigation.navigate({ routeName: "spotpicker" });
            }}/>

          <Button buttonStyle={style.Button} title="Register a spot" onPress={() => {
              this.props.navigation.navigate({ routeName: "spotregistration" });
            }}/>
        </View>
      </View>
    );
  }
}
Dashboard.navigationOptions={
  headerTitle:'Home'
};
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
