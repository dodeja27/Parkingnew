import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Animated,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { grey } from "ansi-colors";
import { Button } from "react-native-elements";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

import SlidingUpPanel from "rn-sliding-up-panel";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: width,
    height: height
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    position: "relative",
    height: height * 0.2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",

    paddingLeft: width * 0.25
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  }
});

export default class SpotPicker extends Component {
  constructor() {
    super();
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
      locfetch: false,
      locations: []
    };
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
          locfetch: true
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
  async componentDidMount() {
    try {
      const respone = await fetch("http://192.168.43.23:2727/spots/");
      const myJson = await respone.json();

      this.setState({
        locations: myJson,
        fetching: true
      });
      console.log(this.state.fetching);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  static defaultProps = {
    draggableRange: { top: height * 0.2, bottom: 0 }
  };

  _draggedValue = new Animated.Value(0);

  render() {
    const { top, bottom } = this.props.draggableRange;

    const textTranslateY = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 8],
      extrapolate: "clamp"
    });

    const textTranslateX = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, -50],
      extrapolate: "clamp"
    });

    const textScale = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [1, 0.7],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.container}>
        {this.state.fetching && this.state.locfetch ? (
          <View style={{ flex: 1 }}>
            <MapView
              style={styles.mapStyle}
              region={this.state.mapRegion}
              showsUserLocation
            >
              {this.state.locations.map((location, index) => {
                const coords = {
                  latitude: location.latitude,
                  longitude: location.longitude
                };

                return (
                  <Marker
                    key={index}
                    coordinate={coords}
                    onPress={coordinate => {
                      console.log(coordinate.nativeEvent.coordinate);
                      this._panel.show(210);
                    }}
                  />
                );
              })}
            </MapView>
            <SlidingUpPanel
              ref={c => (this._panel = c)}
              draggableRange={this.props.draggableRange}
              animatedValue={this._draggedValue}
              snappingPoints={[360]}
              height={height + 180}
              friction={0.5}
            >
              <View style={styles.panel}>
                <View style={styles.panelHeader}>
                  <Animated.View
                    style={{
                      transform: [
                        { translateY: textTranslateY },
                        { translateX: textTranslateX },
                        { scale: textScale }
                      ]
                    }}
                  >
                  {/* <Text>this is some text</Text> */}
                    <Button large title="Get Directions" color="black" />
                  </Animated.View>
                </View>
              </View>
            </SlidingUpPanel>
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
      </View>
    );
  }
}
