import React, { Component } from "react";
import {
  View,
  Dimensions,
  Linking,
  Animated,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { grey } from "ansi-colors";
import Icon from "react-native-vector-icons/FontAwesome5";
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
    // backgroundColor: "white",
    width: "100%",
    // backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    position: "relative",
    height: height * 0.2,
    // backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
    justifyContent: "center",

    paddingLeft: width * 0.25
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  Button: {
    backgroundColor: "black",
    paddingTop: 20,
    paddingBottom: 20
  }
});
export default class SpotPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 1,
        longitudeDelta: 1
      },
      fetching: false,
      locfetch: false,
      locations: [],
      heremapslocations: []
    };
    this.handlePress = this.handlePress.bind(this);
    this.verifyPermissions()
      .then(data => {
        if (data === false) {
          this.props.navigation.goBack();
          // console.log("you are going back");
        } else {
          // console.log("it is true");
          this.location()
            .then(data => console.log("working"))
            .catch(err => console.log(err));
        }
      })
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
          locfetch: true
        });
      }
      // console.log(location);
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
      // const respone = await fetch("http://192.168.43.23:2727/spots/");
      const respone = await fetch("https://first-hrk-app.herokuapp.com/spots/");
      const heremaps = await fetch(
        "https://places.ls.hereapi.com/places/v1/discover/search?at=24.5866%2C73.6975&q=parking&apiKey=GDhxANB4_I_exwLeC0wgMoDbXjC0MXFbzvfRL76R0qM	"
      );
      const myJson = await respone.json();
      const herejson = await heremaps.json();

      // console.log(this.state.fetching);
      const herelocations = herejson.results.items.filter(function(element) {
        return element.position;
      });
      // console.log(herejson.results.items);
      this.setState({
        locations: myJson,
        heremapslocations: herelocations,
        fetching: true
      });
      // console.log(this.state.heremapslocations);
    } catch (error) {
      console.log("Error : ", error);
    }
  }
  handlePress() {
    const concatStart = `${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
    const concatEnd = `${this.state.desLatitude},${this.state.desLongitude}`;
    const AllCoords =
      this.state.mapRegion.latitude !== null && this.state.desLatitude !== null;
    if (AllCoords) {
      // console.log("concatstart : ", concatStart);
      // console.log("concatend : ", concatEnd);
      if (Platform.OS == "ios") {
        Linking.openURL(
          `http://maps.apple.com/?saddr=${concatStart}&daddr=${concatEnd}`
        );
      } else {
        Linking.openURL(`https://maps.google.com/maps?daddr=${concatEnd}`);
        // Linking.openURL(`google.navigation:q=${concatEnd}`)
      }
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
              onRegionChangeComplete={region => {
                this.setState({
                  mapRegion: {
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta
                  }
                });
                // console.log(region)
              }}
              loadingEnabled={true}
              showsUserLocation={true}
            >
              {this.state.locations.map((location, index) => {
                const coords = {
                  latitude: location.latitude,
                  longitude: location.longitude
                };

                return (
                  <Marker
                    title={location.address}
                    description={"Private Parking"}
                    key={index}
                    coordinate={coords}
                    onPress={e => {
                      this.setState({
                        desLatitude: e.nativeEvent.coordinate.latitude,
                        desLongitude: e.nativeEvent.coordinate.longitude
                      });
                      // console.log(e.nativeEvent.coordinate);
                      this._panel.show(210);
                    }}
                  />
                );
              })}

              {this.state.heremapslocations.map((hereloc, index) => {
                const herecoords = {
                  latitude: hereloc.position[0],
                  longitude: hereloc.position[1]
                };

                return (
                  <Marker
                    title={hereloc.title}
                    description={"Govt. Parking"}
                    pinColor={"#008b8b"}
                    key={index}
                    coordinate={herecoords}
                    onPress={e => {
                      this.setState({
                        desLatitude: e.nativeEvent.coordinate.latitude,
                        desLongitude: e.nativeEvent.coordinate.longitude
                      });
                      // console.log(e.nativeEvent.coordinate);
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
                    <Button
                      icon={
                        <Icon
                          name="directions"
                          size={15}
                          style={{ paddingLeft: 20 }}
                          color="white"
                        />
                      }
                      iconRight
                      large
                      title="Get Directions"
                      buttonStyle={styles.Button}
                      onPress={this.handlePress}
                    />
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

SpotPicker.navigationOptions = {
  headerTitle: "Select marker"
};
