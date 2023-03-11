import { StyleSheet, View, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultScreenPosts } from "../nestedScreens/defaultScreenPosts";
import { MapScreen } from "../nestedScreens/mapScreen";
import { CommentsScreen } from "../nestedScreens/commentsScreen";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = ({ route }) => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        // headerShown: false,
      }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};
