import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
const { height } = Dimensions.get("window");
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label("name")
    .required(),
  email: yup
    .string()
    .label("email")
    .email()
    .required(),
  password: yup
    .string()
    .min(8, "password should be 8 characters or more")

    // .max(50, 'Too Long!')
    .label("password")
    .required(),
  contact: yup
    .string()
    .min(10, "please enter a valid contact number")
    .label("contact")
    .required()
});
export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "", contact: "" }}
        onSubmit={values => {
          const details = {
            name: values.name,
            email: values.email,
            password: values.password,
            contact: values.contact
          };
          // console.log("worked");
          // this.props.navigation.navigate({ routeName: "dashboard" });
          axios
            .post("https://first-hrk-app.herokuapp.com/users/add", details)
            .then(res => {
              // console.log(res.data);
              if (res.data === "user already exists") {
                // console.log("great going");
                Alert.alert(
                  "User exists!",
                  "This Email has been already Registered ",
                  [{ text: "Okay" }]
                );
              } else {
                this.props.navigation.navigate("App");
                // console.log("something went wrong !");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }}
        validationSchema={validationSchema}
      >
        {props => (
          <React.Fragment>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              keyboardVerticalOffset={height * 0.1}
              behavior="padding"
              enabled
            >
              <ScrollView style={{ flex: 1 }}>
                <View style={style.container}>
                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 3 }}>Name</Text>
                    <TextInput
                      autoFocus={true}
                      style={style.inputcontainer}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.secondTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      placeholder="Enter Name"
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                    />
                    <Text style={{ color: "red" }}>
                      {props.touched.name && props.errors.name}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 3 }}>Email</Text>
                    <TextInput
                      ref={input => {
                        this.secondTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.thirdTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      style={style.inputcontainer}
                      returnKeyType="next"
                      placeholder="Enter Email"
                      onChangeText={props.handleChange("email")}
                      onBlur={props.handleBlur("email")}
                      value={props.values.email}
                    />
                    <Text style={{ color: "red" }}>
                      {props.touched.email && props.errors.email}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 3 }}>Password</Text>
                    <TextInput
                      ref={input => {
                        this.thirdTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.fourthTextInput.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      style={style.inputcontainer}
                      placeholder="Enter password"
                      onBlur={props.handleBlur("password")}
                      onChangeText={props.handleChange("password")}
                      secureTextEntry
                      value={props.values.password}
                    />
                    <Text style={{ color: "red" }}>
                      {props.touched.password && props.errors.password}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 3 }}>Contact</Text>
                    <TextInput
                      ref={input => {
                        this.fourthTextInput = input;
                      }}
                      style={style.inputcontainer}
                      onSubmitEditing={Keyboard.dismiss}
                      placeholder="Enter Contact Number"
                      onChangeText={props.handleChange("contact")}
                      onBlur={props.handleBlur("contact")}
                      value={props.values.contact}
                    />
                    <Text style={{ color: "red" }}>
                      {props.touched.contact && props.errors.contact}
                    </Text>
                  </View>

                  <Button title="Submit" color="black" onPress={props.handleSubmit} />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}
RegistrationForm.navigationOptions = {
  headerTitle: "Register"
};
const style = StyleSheet.create({
  container: {
    padding: 10,
    // width: "100%",
    // height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  inputcontainer: {
    borderColor: "gray",
    borderBottomWidth: 1
  }
});
