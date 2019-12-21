import React, { Component } from "react";
import axios from "axios";
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Button,
  AsyncStorage
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { grey } from "ansi-colors";
import marker from "../assets/location-pin1.png";

export default class SpotRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 1,
        longitudeDelta: 1
      },
      markerCoordinates: {
        latitude: 37.78,
        longitude: -122.43
      },
      fetching: false,
      address: ""
    };
    this.handlePress = this.handlePress.bind(this);
    this.PlacePicker = this.PlacePicker.bind(this);
    this.verifyPermissions()
      .then(data => {
        if (data === false) {
          console.log("you are going back");
        } else {
          console.log("it is true");
        }
      })
      .catch(err => console.log(err));
    this.location()
      .then(data => console.log("working"))
      .catch(err => console.log(err));
  }

  async verifyPermissions() {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  }
  async location() {
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 20000,
        enableHighAccuracy: true
      });

      if (location) {
        this.setState({
          mapRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.0092
          },
          markerCoordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          fetching: true
        });
      }
      console.log(location);
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
      this.props.navigation.goBack();
    }
  }
  handlePress = async () => {
    let userToken = await AsyncStorage.getItem("details");
    userToken = JSON.parse(userToken);
    // console.log(userToken);
    const spotinformation = {
      name: userToken.name,
      contact: userToken.contact,
      address: this.state.address,
      latitude: this.state.mapRegion.latitude,
      longitude: this.state.mapRegion.longitude
    };
    console.log(spotinformation);
    axios
      .post("https://first-hrk-app.herokuapp.com/spots/add", spotinformation)
      .then(res => {
        if (res.status == "200") {
          // console.log(res.status);
          Alert.alert("Spot added", "parking spot successfully added", [
            { text: "Okay" }
          ]);
          this.props.navigation.goBack();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  PlacePicker = async () => {
    const lat = this.state.mapRegion.latitude;
    const lon = this.state.mapRegion.longitude;
    // console.log(lat+" "+lon);
    const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox= ${lat}%2C${lon}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=`;
    // console.log("in the placepicker function ");
    try {
      // const respone = await fetch("http://192.168.43.23:2727/spots/");
      const respone = await fetch(url);
      const myJson = await respone.json();
      // console.log(myJson.Response.View[0].Result[0].Location.Address.Label)
      const address = myJson.Response.View[0].Result[0].Location.Address.Label;
      this.setState({
        address: address
      });
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "space-evenly"
          }}
        >
          {this.state.fetching ? (
            <View style={{ flex: 2, borderWidth: 1 }}>
              <MapView
                style={{ flex: 1 }}
                style={{ flex: 1 }}
                region={this.state.mapRegion}
                onRegionChangeComplete={region => {
                  this.setState({
                    mapRegion: {
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: region.latitudeDelta,
                      longitudeDelta: region.longitudeDelta
                    }
                  });
                  console.log(region);
                  console.log("here"); //call fuction here for placepicker
                  this.PlacePicker();
                }}
                toolbarEnabled={true}
              />
              <View style={styles.markerFixed}>
                <Image style={styles.marker} source={marker} />
              </View>
            </View>
          ) : (
            <View
              style={{
                height: "50%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator size="large" color={grey} />
            </View>
          )}
          <View style={styles.container}>
            <View style={{ marginHorizontal: 20, marginVertical: 25 }}>
              <Text style={{ marginBottom: 3, fontWeight: "bold" }}>
                Address
              </Text>
              <TextInput
                placeholder="Please type the Address here..."
                style={styles.inputcontainer}
                multiline={true}
                numberOfLines={2}
                defaultValue={this.state.address}
                onChangeText={text => this.setState({ address: text })}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Button title="Submit" color="black" onPress={this.handlePress} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
SpotRegistration.navigationOptions = {
  headerTitle: "Pick Location"
};
const styles = StyleSheet.create({
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%"
  },
  container: {
    padding: 10,
    flex: 1,
    alignContent: "center"
  },
  inputcontainer: {
    borderColor: "gray",
    borderBottomWidth: 1
  },
  marker: {
    height: 42,
    width: 42
  }
});
