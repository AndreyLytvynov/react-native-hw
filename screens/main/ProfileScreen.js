import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Svg, { Circle, Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { updateAvatar, authSignOutUser } from "../../redux/authOperations";
import { pathSlice } from "../../redux/pathReducer";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

const ProfileScreen = ({ navigation, route }) => {
  const { userId, login, avatar } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadPhotoToServer = async (avatar) => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(storageRef, file);
      const path = await getDownloadURL(ref(storage, `avatars/${userId}`));
      return path;
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setLoading(true);
        const avatar = await uploadPhotoToServer(result.uri);
        dispatch(updateAvatar(avatar));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllPosts();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        getAllPosts();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/VvT6BKMH/Photo-BG.jpg" }}
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <View style={styles.formBackdrop}>
          <View style={styles.logout}>
            <TouchableOpacity onPress={() => dispatch(authSignOutUser())}>
              <MaterialCommunityIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>

          <View style={styles.centerBox}>
            <View style={styles.avatarBox}>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 16 }}
                source={{ uri: avatar }}
              ></Image>

              <TouchableOpacity style={styles.addIconBox} onPress={pickImage}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="none"
                  viewBox="0 0 25 25"
                >
                  <Circle
                    cx="12.5"
                    cy="12.5"
                    r="12"
                    fill="none"
                    stroke="#BDBDBD"
                  ></Circle>
                  <Path
                    fill="#BDBDBD"
                    fillRule="evenodd"
                    d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6z"
                    clipRule="evenodd"
                  ></Path>
                </Svg>
              </TouchableOpacity>
            </View>
            {loading && (
              <ActivityIndicator style={{ position: "absolute", top: 50 }} />
            )}
          </View>
          <Text style={styles.titleText}>{login}</Text>

          <View style={{ marginBottom: 140, paddingHorizontal: 10 }}>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginBottom: 20 }}>
                    <Image
                      source={{ uri: item.photo }}
                      style={{ height: 240, borderRadius: 16 }}
                    />
                    <View style={{ marginTop: 8 }}>
                      <Text style={styles.textPost}>{item.name}</Text>
                    </View>
                    <View style={styles.postInfoBox}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "baseline",
                          justifyContent: "flex-start",
                        }}
                      >
                        <TouchableOpacity
                          onPress={async () => {
                            navigation.navigate("comments", {
                              photo: item.photo,
                              id: item.id,
                            });
                            dispatch(
                              pathSlice.actions.setPath({ path: route.name })
                            );
                          }}
                        >
                          <MaterialCommunityIcons
                            name="message-reply"
                            size={24}
                            color="#FF6C00"
                          />
                        </TouchableOpacity>
                        <Text style={{ ...styles.textPost, marginRight: 27 }}>
                          {item.comments || 0}
                        </Text>

                        <TouchableOpacity onPress={() => addLike(item.id)}>
                          {item.likes.includes(`${userId}`) ? (
                            <SimpleLineIcons
                              name="like"
                              size={24}
                              color="#FF6C00"
                            />
                          ) : (
                            <SimpleLineIcons
                              name="like"
                              size={24}
                              color="#212121"
                            />
                          )}
                        </TouchableOpacity>
                        <Text style={styles.textPost}>
                          {item.likes?.length || 0}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "baseline" }}
                        onPress={() => {
                          navigation.navigate("map", {
                            location: item.location,
                            title: item.place,
                          });
                          dispatch(
                            pathSlice.actions.setPath({ path: route.name })
                          );
                        }}
                      >
                        <SimpleLineIcons
                          name="location-pin"
                          size={18}
                          color="black"
                        />
                        <Text
                          style={{
                            color: "#212121",
                            fontSize: 16,
                            textDecorationLine: "underline",
                          }}
                        >
                          {item.place}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  formBackdrop: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 150,
    flex: 1,
  },
  logout: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 1,
  },

  avatarBox: {
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#fff",
    borderWidth: 1,
  },
  centerBox: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -60,
    alignItems: "center",
  },

  addIconBox: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  titleText: {
    color: "#212121",
    textAlign: "center",
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
  },

  postInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 16,
  },

  locationInfo: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  textPost: {
    fontSize: 16,
    marginLeft: 9,
  },
});

export default ProfileScreen;
