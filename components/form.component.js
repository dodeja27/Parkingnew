import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button , ScrollView} from "react-native";
import { Formik } from 'formik';
import * as yup from "yup"
import axios from "axios";
const validationSchema = yup.object().shape({
  name:yup.string().label("name").required(),
  email:yup.string().label("email").email().required(),
  password:yup.string().label("password").required(),
  contact:yup.string().label("name").required()
});
export default class RegistrationForm extends Component {
  
  constructor(props){
    super(props);
    // console.log(props);
  }
  render(){
    return(
      <Formik
    initialValues={{name:'', email: '',password:'',contact:'' }}
    onSubmit={values => {

      const details = {
        name: values.name,
        email: values.email,
        password:values.password,
        contact:values.contact

      };
      this.props.navigation.navigate({ routeName: "dashboard" });
      // axios
      // .post("http://192.168.43.23:2727/users/add", details)
      // .then(res => {console.log(res.data)
      //   if (res.data) {
      //     // console.log("great going");
      //     this.props.navigation.navigate({ routeName: "dashboard" });
          
      //   }
      //   else{
          
      //     console.log("something went wrong !");
      //   }
      
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
    }}
    // validationSchema={validationSchema}
  >
    {props => (
      <React.Fragment >
        <ScrollView>

        
        <View style={style.container}>
        <View style={{marginHorizontal:20,marginVertical:5}}>
        <Text style={{marginBottom:3}}>Name</Text>
        <TextInput style={style.inputcontainer}
        placeholder="Enter Name"
        onChangeText={props.handleChange('name')}
        onBlur={props.handleBlur('name')}
        value={props.values.name}
        />
        <Text style={{color:'red'}}>{props.touched.name && props.errors.name}</Text>
        
      </View>
      <View style={{marginHorizontal:20,marginVertical:5}}>
        <Text style={{marginBottom:3}}>Email</Text>
        <TextInput style={style.inputcontainer}
        placeholder="Enter Email"
        onChangeText={props.handleChange('email')}
        onBlur={props.handleBlur('email')}
        value={props.values.email}
        />
        <Text style={{color:'red'}}>{props.touched.email && props.errors.email}</Text>
      </View>
      <View style={{marginHorizontal:20,marginVertical:5}}>
        <Text style={{marginBottom:3}}>Password</Text>
        <TextInput style={style.inputcontainer}
        placeholder="Enter password"
        onBlur={props.handleBlur('password')}
        onChangeText={props.handleChange('password')}
        secureTextEntry
        value={props.values.password}
        />
        <Text style={{color:'red'}}>{props.touched.password && props.errors.password}</Text>
        
      </View>
      <View style={{marginHorizontal:20,marginVertical:5}}>
        <Text style={{marginBottom:3}}>Contact</Text>
        <TextInput style={style.inputcontainer}
        placeholder="Enter Contact Number"
        onChangeText={props.handleChange('contact')}
        onBlur={props.handleBlur('contact')}
        secureTextEntry
        value={props.values.contact}
        />
        <Text style={{color:'red'}}>{props.touched.contact && props.errors.contact}</Text>
        
      </View>
      <Button onPress={props.handleSubmit} title="Submit" />
        </View>
        </ScrollView>
      </React.Fragment>
    )}
  </Formik>
    );
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     warning: true
  //   };
  //   this.handlePress = this.handlePress.bind(this);
  // }
  // handlePress() {
  //   const tpass = {
  //     pass: this.state.password,
  //     cpass: this.state.cpassword
  //   };
  //   console.log(tpass);
  //   if (tpass.pass === tpass.cpass) {
  //     const userinfo = {
  //       username: this.state.name,
  //       useremail: this.state.email,
  //       userpassword: this.state.password,
  //       usercno: this.state.cno
  //     };
  //     axios
  //       .post("http://192.168.43.23:2727/users/add", userinfo)
  //       .then(res => console.log(res.data))
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   } else {
  //     this.setState({
  //       warning: false
  //     });
  //   }
  // }
  // render() {
  //   return (
  //     <View style={style.container}>
  //       <Text style={{ padding: 10 }}>Name</Text>
  //       <TextInput
  //         style={style.inputcontainer}
  //         defaultValue={this.state.name}
  //         onChangeText={text => this.setState({ name: text })}
  //       />
  //       <Text style={{ padding: 10 }}>Email</Text>
  //       <TextInput
  //         style={style.inputcontainer}
  //         defaultValue={this.state.email}
  //         onChangeText={text => this.setState({ email: text })}
  //       />
  //       <Text style={{ padding: 10 }}>password</Text>
  //       <TextInput
  //       secureTextEntry={true}
  //         style={style.inputcontainer}
  //         defaultValue={this.state.password}
  //         onChangeText={text => this.setState({ password: text })}
  //       />
  //       <Text style={{ padding: 10 }}>Confirm password</Text>
  //       <TextInput secureTextEntry={true}
  //         style={style.inputcontainer}
  //         defaultValue={this.state.cpassword}
  //         onChangeText={text => this.setState({ cpassword: text })}
  //       />
  //       <Text style={{ padding: 10 }}>Contact no.</Text>
  //       <TextInput
  //         style={style.inputcontainer}
  //         defaultValue={this.state.cno}
  //         onChangeText={text => this.setState({ cno: text })}
  //       />
  //       {this.state.warning ? <></> : <Text>password does not match!</Text>}
  //       <View style={{ paddingTop: 20 }}>
  //         <Button title="Sign In" color="black" onPress={this.handlePress} />
  //       </View>
  //     </View>
  //   );
  // }
}
RegistrationForm.navigationOptions={
  headerTitle:'Register'
};
const style = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center"
  },
  inputcontainer: {
    borderColor: "gray",
    borderBottomWidth: 1
  }
});
