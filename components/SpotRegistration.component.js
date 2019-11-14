import React, { Component } from "react";
import { Text, View, Alert, ActivityIndicator,Image } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView ,{ Marker }from "react-native-maps";
import { grey } from "ansi-colors";
export default class SpotRegistration extends Component {
  constructor(props) {
    let lat,lon;
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
      fetching: false
    };
    // console.log(props);
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
        timeout: 10000,
        enableHighAccuracy:true
      });

      if (location) {
        this.setState({
          mapRegion: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.0092
          },
          markerCoordinates:{
            latitude:location.coords.latitude,
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

  render() {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        {this.state.fetching ? (
          <MapView
            style={{ flex:1 }}
            region={this.state.mapRegion}
            toolbarEnabled={true}
          >
            <Marker
              draggable
              title="you are here"
              coordinate={this.state.markerCoordinates}
              onDragEnd={e => this.setState({ markerCoordinates: e.nativeEvent.coordinate })}
            
            >
            {/* <Image source={require('../assets/location-pin.png')} style={{height: 50, width:50 }} /> */}
            </Marker>
          </MapView>
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
      </View>
    );
  }
}
SpotRegistration.navigationOptions = {
  headerTitle: "Pick Location"
};
