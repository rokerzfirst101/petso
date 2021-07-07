import { SET_SIGNED_IN, SET_SIGNED_OUT, UPDATE_USER } from "../actions/types";

const initialState = {
  user: undefined,
  token: undefined,
  signedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNED_IN:
      return {
        signedIn: true,
        user: action.user,
        token: action.token,
      };
    case SET_SIGNED_OUT:
      return {
        user: undefined,
        signedIn: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
