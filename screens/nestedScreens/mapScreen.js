// import { StyleSheet, Text, View } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

export const MapScreen = () => {
  // return (
  //   <View style={styles.container}>
  //     <Text>MapScreen</Text>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 48.493083,
          longitude: 32.273694,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        mapType="standard"
        minZoomLevel={10}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 48.493083, longitude: 32.273694 }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
