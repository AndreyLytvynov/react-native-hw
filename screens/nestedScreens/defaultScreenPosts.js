import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.imgUser}
          source={require("../../assets/userPhoto.jpg")}
        />

        <View style={styles.textUserWrap}>
          <Text style={styles.textName}>Natali Romanova</Text>
          <Text style={styles.textEmail}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        style={{ marginTop: 32 }}
        data={posts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 34 }}>
            <Image
              source={{ uri: item.photoUri }}
              style={{ height: 240, width: 360, borderRadius: 8 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 500, marginTop: 8 }}>
              {item.state.title}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 11,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  navigation.navigate("CommentsScreen");
                }}
              >
                {/* <Button title="Go to comments" /> */}
                <Feather name="message-circle" size={18} color="#BDBDBD" />
                <Text
                  style={{
                    color: "#BDBDBD",
                    marginLeft: 9,
                  }}
                >
                  0
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  navigation.navigate("MapScreen", {
                    location: item.location,
                  });
                }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={18}
                  color="#BDBDBD"
                />
                <Text
                  style={{ textDecorationLine: "underline", marginLeft: 8 }}
                >
                  {item.state.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <Button
        title="Go to map"
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      />
      <Button
        title="Go to comments"
        onPress={() => {
          navigation.navigate("CommentsScreen");
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
    width: "100%",
  },
  imageSpace: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imgUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  textUserWrap: {
    marginLeft: 8,
    justifyContent: "center",
  },
  textName: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
    fontWeight: 700,
  },
  textEmail: {
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
});
