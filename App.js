import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./images/bg-registration.png")}
        >
          <View
            style={{
              ...styles.form,
              // paddingBottom: `${isShowKeyboard ? 2 : 20}`,
            }}
          >
            <Text style={styles.formTitle}>Реєстрація</Text>
            <View>
              <TextInput
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
                value={state.login}
                placeholder={"Логін"}
                placeholderTextColor={"#cbcbcb"}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
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
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
                secureTextEntry={true}
                value={state.password}
                placeholder={"Пароль"}
                placeholderTextColor={"#cbcbcb"}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.btnSubmit,
                display: `${isShowKeyboard ? "none" : "flex"}`,
              }}
              onPress={keyboardHide}
            >
              <Text style={{ ...styles.btnTitle }}>Зареєструватись</Text>
            </TouchableOpacity>

            <View
              style={{
                display: `${isShowKeyboard ? "none" : "flex"}`,
              }}
            >
              <Text style={styles.btnLogin}>Вже є аккаунт? Увійти</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  },
  form: {
    paddingTop: 45,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
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
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
  },
  submitButton: {
    marginHorizontal: 16,
    backgroundColor: "red",
  },
  btnSubmit: {
    // display: `${false ? "none" : "flex"}`,
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
  },
  btnLogin: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 45,
  },
});
