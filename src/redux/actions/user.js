import { SET_SIGNED_IN, SET_SIGNED_OUT } from "./types";

export const signIn = (user, token) => ({
  type: SET_SIGNED_IN,
  user,
  token,
});

export const signOut = () => ({
  type: SET_SIGNED_OUT,
});
