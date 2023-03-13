import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import Home from "../main/Home";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/authOperations";

const AuthStack = createNativeStackNavigator();

export default function AuthScreen() {
  const { state } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [state]);

  return (
    <AuthStack.Navigator>
      <>
        {!state ? (
          <>
            <AuthStack.Screen
              name="auth"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <AuthStack.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <AuthStack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        )}
      </>
    </AuthStack.Navigator>
  );
}
