import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { storage, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [text, onChangeText] = useState("");
  const [place, setPlace] = useState("");
  const [locationPhoto, setLocationPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
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
      setLocationPhoto(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Camera.getCameraPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const TakePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhotoUri(photo.uri);
    } catch (err) {
      console.log(err.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const postId = uuid.v4().split("-").join("");

      const response = await fetch(photoUri);
      const file = await response.blob();

      const storageRef = await ref(storage, `posts/${postId}`);

      await uploadBytesResumable(storageRef, file);

      const photo = await getDownloadURL(storageRef);

      const location = await Location.getCurrentPositionAsync({});

      return { photo, location };
    } catch (err) {
      console.log(err);
    }
  };

  const createPost = async () => {
    try {
      const { photo, location } = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        photo,
        name: text,
        place,
        location,
        userId,
        login,
        comments: 0,
        likes: [],
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const uploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  };

  const reset = () => {
    onChangeText("");
    setPlace("");
    setPhotoUri("");
  };

  const onSubmit = async () => {
    try {
      reset();
      await createPost();
      reset();
      setLoading(false);
      navigation.navigate("posts");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

          borderSize: 1,
          borderRadius: 8,
          borderColor: "#BDBDBD",
        }}
      >
        <Camera
          style={styles.camera}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.button,
            }}
            onPress={TakePhoto}
          >
            <MaterialIcons
              name="photo-camera"
              size={20}
              style={{ ...styles.takePhotoOut }}
            />
          </TouchableOpacity>

          {photoUri && (
            <View style={styles.sampleImg}>
              <Image source={{ uri: photoUri }} style={styles.sampleImg} />
            </View>
          )}
        </Camera>
      </View>

      {photoUri ? (
        <Text style={styles.textInPhoto} onPress={() => console.log("ok")}>
          Редактировать фото
        </Text>
      ) : (
        <TouchableOpacity onPress={() => uploadPhoto()}>
          <Text style={styles.textInPhoto}>Завантажте фото</Text>
        </TouchableOpacity>
      )}

      <View style={styles.place}>
        <TextInput
          style={styles.text}
          onChangeText={onChangeText}
          placeholder="Назва..."
          value={text}
        />
      </View>

      <View style={styles.place}>
        <FontAwesome5
          name="map-marker-alt"
          size={24}
          color="#BDBDBD"
          style={styles.mapIcon}
        />

        <TextInput
          style={styles.textInMap}
          onChangeText={setPlace}
          placeholder="Місцевість..."
          value={place}
        />
      </View>

      <View style={styles.wrapBottom}>
        <TouchableOpacity
          title="Go to Posts"
          disabled={!(photoUri && text && place)}
          onPress={onSubmit}
          style={{
            ...styles.buttonReg,
            backgroundColor: !(photoUri && text && place)
              ? "#F6F6F6"
              : "#FF6C00",
            color: !(photoUri && text && place) ? "#BDBDBD" : "#FFFFFF",
          }}
        >
          <Text
            style={{
              ...styles.textBtn,

              color: !(photoUri && text && place) ? "#BDBDBD" : "#FFFFFF",
            }}
          >
            ОПУБЛІКУВАТИ
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.footer} onPress={reset}>
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",

    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  place: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,

    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  mapIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  textInMap: {
    color: "#212121",

    paddingBottom: 15,
    fontSize: 16,
  },
  text: {
    color: "#212121",
    paddingBottom: 15,
    fontSize: 16,
  },
  textInPhoto: {
    color: "#BDBDBD",
    paddingBottom: 48,
    paddingTop: 8,
    fontSize: 16,
  },
  sampleImg: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 100,
    width: 100,
    zIndex: 1,
  },

  camera: {
    position: "relative",
    flex: 1,
    width: "100%",
    marginTop: 32,
  },
  photoView: {
    position: "relative",
  },

  flipContainer: {
    height: 240,
    width: "100%",
    alignSelf: "center",
  },

  button: {
    position: "absolute",
    left: 150,
    top: 110,
    height: 60,
    width: 60,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  },

  takePhotoOut: {
    fontSize: 18,
    margin: 20,
    color: "#BDBDBD",
  },

  wrapBottom: {
    marginTop: 0,
    marginBottom: 120,
    marginLeft: 16,
    marginRight: 16,
  },
  buttonReg: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,

    width: "100%",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  footer: { height: 83, alignItems: "center", justifyContent: "center" },
});

export default CreatePostsScreen;
