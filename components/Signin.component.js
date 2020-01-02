import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  AsyncStorage
} from "react-native";
import axios from "axios";
const { height } = Dimensions.get("window");

import Spinner from "react-native-loading-spinner-overlay";
export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email:'',
      password:'',
      wrongcredentials: "",
      isloggedin: false
    };
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    if (this.state.email && this.state.password ) {
      const credentials = {
        useremail: this.state.email,
        userpassword: this.state.password
      };
      this.setState({
        isloggedin: true
      });
      axios
        .post("https://first-hrk-app.herokuapp.com/users/auth", credentials)
        .then(async res => {
          // console.log(res.data[0]);
          if (res.data[0]) {
            
            // console.log("great going");
            const details = {
              name: res.data[0].name,
              contact: res.data[0].contact
            };
            this.setState({
              isloggedin: false
            });
            await AsyncStorage.setItem("details", JSON.stringify(details));
            this.props.nav.navigate({ routeName: "Dashboard" });
          } else {
            this.setState({
              isloggedin: false,
              wrongcredentials: "Invalid email or password. please try again"
            });
            // console.log("incorrect details try again");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    
  }
  render() {
    let warning;
    if (this.state.wrongcredentials) {
      warning = <Text>{this.state.wrongcredentials}</Text>;
    }
    return (
      <KeyboardAvoidingView
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
        keyboardVerticalOffset={height * 0.1}
        behavior="padding"
        enabled
      >
        {/* <ScrollView style={{ width:"100%", backgroundColor:"blue"}}> */}
        <View style={style.container}>
          {/* <Text>hello</Text> */}
          {this.state.isloggedin ? (
            <View style={{ flex: 1 }}>
              <Spinner
                visible={true}
                textContent={"Loading..."}
                textStyle={style.spinnerTextStyle}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Spinner
                visible={false}
                textContent={"Loading..."}
                textStyle={style.spinnerTextStyle}
              />
            </View>
          )}
          {/* <Text style={{ padding: 10 }}>Email</Text> */}
          <View style={{marginVertical: 10 }}> 

          <TextInput
            style={style.inputcontainer}
            defaultValue={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            returnKeyType="next"
            placeholder="Enter Email"
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
            keyboardType="email-address"
            />
          {/* <Text style={{ padding: 10 }}>password</Text> */}
            </View>
            <View style={{marginVertical: 10 }}>

          <TextInput
            secureTextEntry={true}
            style={style.inputcontainer}
            placeholder="Enter Password"
            defaultValue={this.state.password}
            ref={input => {
              this.secondTextInput = input;
            }}
            
            onChangeText={text => this.setState({ password: text })}
            keyboardType="ascii-capable"
            />
            </View>
          {warning}
          <View style={{ paddingTop: 20 }}>
            <Button title="Sign In" color="black" onPress={this.handlePress} />
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    );
  }
}
const style = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF"
  },
  container: {
    padding: 10,
    width: "70%"
  },
  inputcontainer: {
    borderColor: "gray",
    borderBottomWidth: 1
  }
});
