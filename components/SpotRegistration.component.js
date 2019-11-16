import React, { Component } from "react";
import { Text, View, Alert, ActivityIndicator, Image, StyleSheet ,TextInput,KeyboardAvoidingView,Button} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { grey } from "ansi-colors";
import marker from "../assets/location-pin.png";

export default class SpotRegistration extends Component {
  constructor(props) {
    let lat, lon;
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
  
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={{ height: "100%", width: "100%" , justifyContent: "space-evenly"}}>
        {this.state.fetching ? (
         <View style={{ flex: 2 ,borderWidth:1}}>
         <MapView style={{ flex: 1 }}
            style={{ flex: 1 }}
            region={this.state.mapRegion}
            onRegionChangeComplete={region => {
              this.setState({
                mapRegion: {
                  latitude: region.latitude,
                  longitude: region.longitude,
                  latitudeDelta:region.latitudeDelta,
                  longitudeDelta:region.longitudeDelta
                }
              });
            console.log(region)}}
            toolbarEnabled={true}
          />
            <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        </View>
          
        ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color={grey} />
          </View>
        )}
        <View style={styles.container}>
        <View style={{marginHorizontal:20,marginVertical:25}}>
        <Text style={{marginBottom:3}}>Address</Text>
        <TextInput style={styles.inputcontainer}
         multiline = {true}
         numberOfLines = {2}/>        
      </View>
      </View>
      <View style={styles.container} >
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
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  container: {
    padding: 10,
    flex:1,
    alignContent: "center"
  },
  inputcontainer: {
    borderColor: "gray",
    borderBottomWidth: 1
  },
  marker: {
    height: 37,
    width: 37
  ,}})