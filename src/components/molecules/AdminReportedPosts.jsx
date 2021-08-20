import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Image, View } from 'react-native'
import { approveReport, getActiveReports, getExpertPostAdmin, rejectReport } from '../../requests'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Surface, Title, Subheading, Caption, Button } from 'react-native-paper'
import YoutubePlayer from 'react-native-youtube-iframe'
import { approveExpertPost, rejectExpertPost } from '../../requests'
import HomeListingItem from './HomeListingItem'
import QandAItem from './QandAItem'


const AdminReportedPosts = (props) => {

    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    useFocusEffect(
        React.useCallback(() => {
            if (isLoading) {
                getActiveReports(props.token)
                .then((res) => {
                    setIsLoading(false)
                    setData(res.reports)
                })
                .catch((err) => console.log(err))
            }
        }, [isLoading])
    )

    const approve = (id) => {
        approveReport(props.token, id)
        .then((res) => setIsLoading(true))
    }

    const reject = (id) => {
        rejectReport(props.token, id)
        .then((res) => setIsLoading(true))
    }


    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{marginVertical: 5}} />}
                renderItem={({item}) => {
                    if (item.post.postType === "qanda")
                    return (
                        <QandAItem 
                            item={item.post.qanda} 
                            user={props.user} 
                            token={props.token}
                            reportType={item.reportType}
                            approveReport={() => approve(item._id)}
                            rejectReport={() => reject(item._id)}
                        />
                    )
                
                    if (item.post.postType === "listing")
                    return (
                        <HomeListingItem
                            navigation={props.navigation}
                            token={props.token}
                            userId={props.user._id}
                            isAdmin={props.user.access.admin}
                            item={item.post.listing}
                            reportType={item.reportType}
                            approveReport={() => approve(item._id)}
                            rejectReport={() => reject(item._id)}
                        />
                    )
                }}
                ListFooterComponent={() => <View style={{height: 10}} />}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(AdminReportedPosts)

const styles = StyleSheet.create({})
