import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authSignInUser } from "../../redux/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [show, setShow] = useState(true);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [active, setIsActive] = useState({
    email: false,
    password: false,
  });
  const dispatch = useDispatch();

  const passwordShow = () => {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  };

  const handleSubmit = () => {
    dispatch(authSignInUser({ email: state.email, password: state.password }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../assets/bg-registration.png")}
        style={styles.image}
      >
        <View style={styles.form}>
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
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              placeholder={"Адреса електронної пошти"}
              placeholderTextColor={"#cbcbcb"}
              style={{
                ...styles.input,
                borderColor: active.email ? "#FF6C00" : "#E8E8E8",
              }}
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
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              placeholder={"Пароль"}
              placeholderTextColor={"#cbcbcb"}
              secureTextEntry={show}
              style={{
                ...styles.input,
                borderColor: active.password ? "#FF6C00" : "#E8E8E8",
              }}
            />
            <Text onPress={passwordShow} style={styles.textShow}>
              {show ? "Показати" : "Сховати"}
            </Text>
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

            <TouchableOpacity onPress={() => navigation.navigate("auth")}>
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
  container: {
    position: "absolute",
    bottom: 0,
    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "#fff",
    width: "100 %",
    justifyContent: "flex-end",
    paddingBottom: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  textShow: {
    color: "#000",
    position: "absolute",
    top: 13,
    right: 25,
    fontSize: 16,
    color: "#1B4371",
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
