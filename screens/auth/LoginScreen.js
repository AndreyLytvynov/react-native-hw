import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [active, setIsActive] = useState({
    email: false,
    password: false,
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(authLogin(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        style={styles.image}
        source={require("../../assets/bg-registration.png")}
      >
        <View
          style={{
            ...styles.form,
          }}
        >
          <Text style={styles.formTitle}>Увійти</Text>
          <View style={{ marginTop: 16 }}>
            <TextInput
              onFocus={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  email: true,
                }));
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  email: false,
                }));
                setIsShowKeyboard(false);
              }}
              style={{
                ...styles.input,
                borderColor: active.email ? "#FF6C00" : "#E8E8E8",
              }}
              value={state.email}
              placeholder={"Адреса електронної пошти"}
              placeholderTextColor={"#cbcbcb"}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              onFocus={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  password: true,
                }));
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  password: false,
                }));
                setIsShowKeyboard(false);
              }}
              style={{
                ...styles.input,
                borderColor: active.password ? "#FF6C00" : "#E8E8E8",
              }}
              secureTextEntry={true}
              value={state.password}
              placeholder={"Пароль"}
              placeholderTextColor={"#cbcbcb"}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
            />
          </View>

          <View
            style={{
              display: `${isShowKeyboard ? "none" : "flex"}`,
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.btnSubmit,
              }}
              onPress={handleSubmit}
            >
              <Text style={{ ...styles.btnTitle }}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.btnLogin}>
                Не має акаунта? Зареєструватись
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#f0f8ff",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    color: "#f0f8ff",
    marginHorizontal: 16,
    color: "black",
    fontFamily: "Roboto-Regular",
  },
  form: {
    position: "relative",
    paddingTop: 32,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingBottom: 32,
    width: "100%",
    backgroundColor: "#fff",
  },
  formTitle: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#212121",
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  submitButton: {
    marginHorizontal: 16,
    backgroundColor: "red",
  },
  btnSubmit: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#f0f8ff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  btnLogin: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 144,
    color: "#1B4371",
    fontSize: 16,
  },
});
