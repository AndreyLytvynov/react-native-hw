import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { PostsScreen } from "./screens/main/PostsScreen";
import { CreateScreen } from "./screens/main/CreateScreen";
import { ProfileScreen } from "./screens/main/ProfileScreen";

import { TouchableOpacity, Text } from "react-native";

//icons import
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Register" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
      }}
    >
      <MainTab.Screen
        name="Post"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              size={size}
              color={color}
            />
          ),

          headerRight: ({ focused, color, size }) => (
            <TouchableOpacity>
              <MaterialIcons
                name="logout"
                size={25}
                color="#BDBDBD"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color="#BDBDBD" />
          ),
          headerLeft: ({ focused, color, size }) => (
            <TouchableOpacity>
              <AntDesign
                name="arrowleft"
                size={25}
                color="#BDBDBD"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
