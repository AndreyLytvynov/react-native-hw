import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { PostsScreen } from "./screens/main/PostsScreen";
import { CreateScreen } from "./screens/main/CreateScreen";
import { ProfileScreen } from "./screens/main/ProfileScreen";

import { TouchableOpacity, Image } from "react-native";

//icons import
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/grid.png")}
              style={{ height: 30, width: 30 }}
            />
          ),

          headerRight: ({ focused, color, size }) => (
            <TouchableOpacity>
              <MaterialIcons
                name="logout"
                size={25}
                color={color}
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
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <Image
                  source={require("./assets/trash.png")}
                  style={{ height: 40, width: 70 }}
                />
              );
            }

            return (
              <Image
                source={require("./assets/add.png")}
                style={{ height: 40, width: 70 }}
              />
            );
          },
          // headerLeft: ({ focused, color, size }) => (
          //   <TouchableOpacity onPress={() => {}}>
          //     <AntDesign
          //       name="arrowleft"
          //       size={24}
          //       color="black"
          //       style={{ marginLeft: 10 }}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("./assets/user.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
