import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";

export const ProfileScreen = () => {
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
        <View style={styles.form}>
          <Text style={styles.formTitle}>Natali Romanova</Text>
          <View style={styles.avatar}></View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 120,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
    position: "absolute",
    top: -60,
    left: "50%",
    transform: "translateX(-60px)",
  },
  form: {
    position: "relative",
    paddingTop: 92,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingBottom: 32,
    width: "100%",
    backgroundColor: "#fff",
    height: "100%",
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
    marginBottom: 78,
    color: "#1B4371",
    fontSize: 16,
  },
});
