import React from 'react'
import { Appbar } from 'react-native-paper'
import { PreferencesContext } from '../../constants/PreferenceContext'

const AppHeader = (props) => {
    const preference = React.useContext(PreferencesContext)
    return (
        <Appbar.Header>
            {props.previous ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
            <Appbar.Content title={props.scene.route.name} />
            <Appbar.Action icon="theme-light-dark" onPress={() => preference.toggleTheme()} />
        </Appbar.Header>
    )
}

export default AppHeader

