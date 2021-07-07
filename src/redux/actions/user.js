import { SET_SIGNED_IN, SET_SIGNED_OUT, UPDATE_USER } from "./types";

export const signIn = (user, token) => ({
  type: SET_SIGNED_IN,
  user,
  token,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const signOut = () => ({
  type: SET_SIGNED_OUT,
});
