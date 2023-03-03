import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import RegistrationScreen from "./screens/registrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./images/bg-registration.png")}
      >
        <View style={styles.form}>
          <Text style={styles.formTitle}>Registration</Text>
          <View>
            <TextInput style={styles.input} textAlign={"center"} />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.btnSubmit}>
            <Text style={styles.btnTitle}>SIGN IN</Text>
          </TouchableOpacity>

          <Text style={styles.btnLogin}>Уже есть аккаунтasdasdad? Войти</Text>
        </View>
      </ImageBackground>
    </View>
    // <RegistrationScreen />
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
    borderWidth: 1,
    borderColor: "#f0f8ff",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
    color: "#f0f8ff",
    marginHorizontal: 16,
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
