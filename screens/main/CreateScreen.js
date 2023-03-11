import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const initialState = {
  title: "",
  place: "",
};

export const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
      setPhotoUri(photo.uri);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const sendPhoto = () => {
    if (!photoUri) return;
    navigation.navigate("DefaultScreen", { photoUri, location, state });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera}>
          {photoUri && (
            <View style={styles.image}>
              <Image
                source={{ uri: photoUri }}
                style={{ height: 130, width: 130 }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.snap} onPress={takePhoto}>
            <Text style={styles.textSnap}>SNAP</Text>
          </TouchableOpacity>
        </Camera>
        <Text style={{ marginBottom: 33 }}>Завантажте фото</Text>

        <View style={{ marginTop: 16 }}>
          <TextInput
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
            }}
            style={{
              ...styles.input,
            }}
            value={state.title}
            placeholder={"Назва..."}
            placeholderTextColor={"#cbcbcb"}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <TextInput
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
            }}
            style={{
              ...styles.input,
            }}
            value={state.place}
            placeholder={"Місцевість..."}
            placeholderTextColor={"#cbcbcb"}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, place: value }))
            }
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={sendPhoto}>
          <Text style={styles.sendButtonLabel}>ОПУБЛІКУВАТИ</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  camera: {
    alignItems: "center",
    height: 240,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  textSnap: {
    color: "#fff",
  },
  snap: {
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  takePhotoContainer: {
    borderRadius: 5,
    position: "absolute",
    top: 50,
    left: 50,
    borderColor: "#fff",
    borderWidth: 1,
    height: 200,
    width: 200,
  },
  sendButton: {
    marginTop: 32,
    marginHorizontal: 30,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  sendButtonLabel: {
    color: "black",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
});
