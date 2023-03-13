import React, { useState } from "react";
import { storage } from "../../firebase/config";
import { authSlice } from "../../redux/authReducer";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { authSignUpUser, updateAvatar } from "../../redux/authOperations";
import { useDispatch } from "react-redux";
import Svg, { Circle, Path } from "react-native-svg";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [active, setIsActive] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [show, setShow] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const uploadPhotoToServer = async (avatarId) => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      const storageRef = ref(storage, `avatars/${avatarId}`);
      await uploadBytes(storageRef, file);
      const path = await getDownloadURL(ref(storage, `avatars/${avatarId}`));
      setAvatar(path);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedUser = await authSignUpUser({
        email: state.email,
        password: state.password,
        login: state.login,
      });
      await uploadPhotoToServer(updatedUser.uid);
      dispatch(updateAvatar(avatar));
      dispatch(
        authSlice.actions.updateProfile({
          userId: updatedUser.uid,
          login: updatedUser.displayName,
          email: updatedUser.email,
        })
      );
    } catch (error) {
      console.log(error);
    }
    setState(initialState);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
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
          <View
            style={{
              ...styles.avatar,
            }}
          >
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 16 }}
              source={{ uri: avatar }}
            />
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
          <Text style={styles.formTitle}>Реєстрація</Text>
          <View>
            <TextInput
              onFocus={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  login: true,
                }));
                setIsShowKeyboard(true);
              }}
              onBlur={() => {
                setIsActive((prevState) => ({
                  ...prevState,
                  login: false,
                }));
                setIsShowKeyboard(false);
              }}
              style={{
                ...styles.input,
                borderColor: active.login ? "#FF6C00" : "#E8E8E8",
              }}
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
              secureTextEntry={show}
              value={state.password}
              placeholder={"Пароль"}
              placeholderTextColor={"#cbcbcb"}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
            />
            <Text
              onPress={() => {
                if (show) {
                  return setShow(false);
                }
                return setShow(true);
              }}
              style={styles.textShow}
            >
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
              <Text style={{ ...styles.btnTitle }}>Зареєструватись</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={styles.btnLogin}>Вже є аккаунт? Увійти</Text>
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

  avatar: {
    position: "absolute",
    top: -60,
    left: 140,
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addIconBox: {
    position: "absolute",
    right: -13,
    bottom: 14,
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
    position: "relative",
    paddingTop: 92,
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
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
  },
  textShow: {
    color: "#000",
    position: "absolute",
    top: 13,
    right: 25,
    fontSize: 16,
    color: "#1B4371",
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
  },
  btnLogin: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 78,
    color: "#1B4371",
    fontSize: 16,
  },
});
