import db from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authRegistration =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      console.log("=========>", login, email, password);
      const { user } = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
    } catch (error) {
      console.log("Error===>", error);
      console.log("Error.message===>", error.message);
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      console.log("=========>", email, password);
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error===>", error);
      console.log("Error.message===>", error.message);
    }
  };
export const authLogIn = () => async (dispatch, getState) => {};
