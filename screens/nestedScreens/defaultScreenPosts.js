import { StyleSheet, View, FlatList, Image, Button } from "react-native";
import { useState, useEffect } from "react";
// import { Button } from "react-native-web";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(route.params);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Image
              source={{ uri: item.photoUri }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
      />
      <Button
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
