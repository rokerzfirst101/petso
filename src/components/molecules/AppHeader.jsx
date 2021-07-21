import React from "react";
import { Appbar } from "react-native-paper";
import { PreferencesContext } from "../../constants/PreferenceContext";

const AppHeader = (props) => {
  const preference = React.useContext(PreferencesContext);
  return (
    <Appbar.Header
      style={{
        backgroundColor: preference.isThemeDark ? "#121212" : "#FFF",
        elevation: 0,
      }}
    >
      {props.previous ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content
        title={
          props.scene.descriptor.options.headerTitle
            ? props.scene.descriptor.options.headerTitle
            : props.scene.route.name
        }
      />
    </Appbar.Header>
  );
};

export default AppHeader;
