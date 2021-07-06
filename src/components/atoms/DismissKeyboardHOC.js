import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  KeyboardAvoidingView,
} from "react-native";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};

export const DismissKeyboardView = DismissKeyboardHOC(View);
export const KeyboardAvoidingAndDismissView =
  DismissKeyboardHOC(KeyboardAvoidingView);
