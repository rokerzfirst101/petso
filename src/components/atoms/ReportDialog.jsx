import * as React from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, RadioButton, Subheading, Snackbar, Colors } from 'react-native-paper';
import { reportListing, reportQandA } from '../../requests';
import { AntDesign } from '@expo/vector-icons';

const ReportDialog = forwardRef((props, ref) => {

    
    const [visible, setVisible] = React.useState(false);
    const [type, setType] = React.useState();
    const [id, setId] = React.useState();
    const [checked, setChecked] = React.useState();
    const [message, setMessage] = React.useState();

    const [snackbarVisible, setSnackbarVisible] = React.useState(false);

    const toggleSnackbar = () => setSnackbarVisible(!snackbarVisible)
    const onDismissSnackbar = () => setSnackbarVisible(false);
    
    useImperativeHandle(ref, () => ({
        showDialog(type, id) {
            setType(type)
            setId(id);
            setVisible(true)
        }
    }))

    const report = () => {
        if (checked && type == "listing") {
            const formData = new FormData();
            formData.append("reportType", checked);
            formData.append("id", id);
            reportListing(props.token, formData)
            .then((res) => {
                setMessage(res.message)
                setVisible(false)
                toggleSnackbar();
            })
            .catch((err) => console.log(err))
        } else if (checked && type == "qanda") {
            const formData = new FormData();
            formData.append("reportType", checked);
            formData.append("id", id);
            reportQandA(props.token, formData)
            .then((res) => {
                setMessage(res.message)
                setVisible(false)
                toggleSnackbar();
            })
            .catch((err) => console.log(err))
        }
    }

    const hideDialog = () => setVisible(false);


    return (
            <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Report</Dialog.Title>
                <Dialog.Content>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                            value="asi"
                            status={ checked === "asi" ? 'checked' : 'unchecked'}
                            onPress={() => setChecked("asi")}
                        />
                        <Subheading>Abusive / Sexual / Inappropriate</Subheading>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                            value="asi"
                            status={ checked === "ihd" ? 'checked' : 'unchecked'}
                            onPress={() => setChecked("ihd")}
                        />
                        <Subheading>Inappropriate / Harmful / Defame</Subheading>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton
                            value="asi"
                            status={ checked === "hwf" ? 'checked' : 'unchecked'}
                            onPress={() => setChecked("hwf")}
                        />
                        <Subheading>Hateful / Wrong / Fake</Subheading>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={report}>Report</Button>
                </Dialog.Actions>
            </Dialog>
            <Snackbar
                style={{backgroundColor: Colors.green200, alignItems: 'center'}}
                duration={2500}
                visible={snackbarVisible}
                onDismiss={onDismissSnackbar}
            >
                {message}
            </Snackbar>
        </Portal>
    );
});

export default ReportDialog;