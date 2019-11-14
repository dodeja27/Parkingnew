import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import axios from "axios";
export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      wrongcredentials: ""
    };
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    const credentials = {
      useremail: this.state.email,
      userpassword: this.state.password
    };
    axios
      .post("http://192.168.43.23:2727/users/auth", credentials)
      .then(res => {console.log(res.data[0])
        if (res.data[0]) {
          // console.log("great going");
          this.props.nav.navigate({ routeName: "dashboard" });
          
        }
        else{
          this.setState({
            wrongcredentials: "Invalid email or password. please try again"
          });
          console.log("incorrect details try again");
        }
      
      })
      .catch(function(error) {
        console.log(error);
      });
    // fetch("http://192.168.43.23:2727/users/auth", {
    //   method: "post",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify(credentials)
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    //console.log(credentials.useremail, credentials.userpassword);
    // this.setState({
    //   wrongcredentials: "wrong credentials"
    // });
  }
  render() {
    let warning;
    if (this.state.wrongcredentials) {
      warning = <Text>{this.state.wrongcredentials}</Text>;
    }
    return (
      <View style={style.container}>
        {/* <Text>hello</Text> */}
        <Text style={{ padding: 10 }}>Email</Text>
        <TextInput
          style={style.inputcontainer}
          defaultValue={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <Text style={{ padding: 10 }}>password</Text>
        <TextInput secureTextEntry={true}
          style={style.inputcontainer}
          defaultValue={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
        {warning}
        <View style={{ paddingTop: 20 }}>
          <Button title="Sign In" color="black" onPress={this.handlePress} />
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    padding: 10,
    width: "50%"
  },
  inputcontainer: {
    borderColor: "gray",
    borderWidth: 1
  }
});
