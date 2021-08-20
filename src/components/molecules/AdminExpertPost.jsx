import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Image, View, Dimensions } from 'react-native'
import { baseUrl, defaultAvatar, getExpertPostAdmin, getExpertPosts } from '../../requests'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Surface, Title, Subheading, Caption, Button } from 'react-native-paper'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useTheme } from 'react-native-paper'
import { approveExpertPost, rejectExpertPost } from '../../requests'
import { isLoading } from 'expo-font'

const {width} = Dimensions.get("window")
const AdminExpertPost = ({token}) => {

    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const {colors, dark} = useTheme()
    const styles = StyleSheetCreator(colors, dark); 

    useFocusEffect(
        React.useCallback(() => {
            if (isLoading) {
                getExpertPostAdmin(token)
                    .then((res) => {
                        setData(res.posts)
                        setIsLoading(false)
                    })
                    .catch((err) => setIsLoading(false))
            }
        }, [isLoading])
    )

    const approve = (id) => {
        approveExpertPost(token, id)
            .then((res) => setIsLoading(true))
            .catch((err) => console.log(err))
    }

    const reject = (id) => {
        rejectExpertPost(token, id)
            .then((res) => setIsLoading(true))
            .catch((err) => console.log(err))
    }

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{marginVertical: 5}} />}
                renderItem={({item}) => {
                    return (
                        <Surface style={styles.card}>
                            <View style={styles.header}>
                                <Image source={{uri: item.createdBy.avatar && item.createdBy.avatar != "" ? `${baseUrl}${item.createdBy.avatar}` : defaultAvatar }} style={styles.headerImage} />
                                <View style={styles.headerText}>
                                    <Title style={styles.headerTitle}>{item.createdBy.name && item.createdBy.name != "" ? item.createdBy.name : "Petso User" }</Title>
                                    <Caption>few minutes ago</Caption>
                                </View>
                            </View>
                            <View>
                            {
                                item.data.text ? (
                                    <Subheading style={{paddingHorizontal: 12, paddingBottom: 12}}>{item.data.text}</Subheading>
                                ) : null
                            }
                            {
                                item.data.video ? (
                                    <YoutubePlayer
                                        height={200}
                                        width={width}
                                        videoId={item.data.video}
                                    />
                                ) : null
                            }
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Button onPress={() => {
                                    approve(item._id)
                                }} style={{flex: 1}}>Approve</Button>
                                <View style={{height: 20, borderWidth: 0.5, borderColor: colors.background}} />
                                <Button onPress={() => {
                                    reject(item._id)
                                }} style={{flex: 1}}>Reject</Button>
                            </View>
                        </Surface>
                    )
                }}
                ListFooterComponent={() => <View style={{height: 10}} />}
            />
        </View>
    )
}

const StyleSheetCreator = (colors, dark) => StyleSheet.create({
    card: {
        elevation: 4
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    headerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'grey'
    },
    headerText: {
        marginStart: 8,
    },
    headerTitle: {
        fontSize: 16,
        marginBottom: -8
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(AdminExpertPost)

const styles = StyleSheet.create({})
