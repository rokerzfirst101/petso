import React from 'react'
import { StyleSheet, Image, View, TextInput } from 'react-native'
import { Button, Caption, Menu, Subheading, Surface, Title, useTheme } from 'react-native-paper'
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { baseUrl, commentQandA, defaultAvatar, getReportName, likeQandA, unlikeQandA } from '../../requests';
import { TouchableOpacity } from '@gorhom/bottom-sheet';


const QandAItem = ({item, user, token, report, reportType, approveReport, rejectReport}) => {
    
    const [isLiked, setIsLiked] = React.useState(item.likedBy.includes(user._id))
    const [showComments, setShowComments] = React.useState(false)
    const [commentText, setCommentText] = React.useState()

    const [menuVisible, setMenuVisible] = React.useState(false)
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const {colors, dark} = useTheme();
    const styles = StyleSheetCreator(colors, dark)

    const handleLike = () => {
        if (isLiked) {
            unlikeQandA(token, item._id)
            .then((res) => setIsLiked(false))
            .catch((err) => console.log(err))
        } else {
            likeQandA(token, item._id)
            .then((res) => setIsLiked(true))
            .catch((err) => console.log(err))
        }
    }    

    const submitComment = () => {
        const formData = new FormData();
        formData.append("text", commentText);
        commentQandA(token, item._id, formData)
        .then((res) => {
            item.comments = res.data.comments
            setCommentText()
        })
        .catch((err) => console.log(err))
    }

    

    const comments = item.comments.map((item, index) => <Comment item={item} index={index.toString()} />);

    return (
        <View>
            <Surface style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingEnd: 18}}>
                    <View style={styles.header}>
                        <Image source={{uri: item.createdBy.avatar && item.createdBy.avatar != "" ? `${baseUrl}${item.createdBy.avatar}` : defaultAvatar}} style={styles.headerImage} />
                        <View style={styles.headerText}>
                            <Title style={styles.headerTitle}>{item.createdBy.name ? item.createdBy.name : "Petso User"}</Title>
                            <Caption>just now</Caption>
                        </View>
                    </View>
                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={<Entypo onPress={openMenu} name="dots-three-horizontal" size={18} color={"white"} />}
                    >
                        <Menu.Item onPress={() => {
                            closeMenu()
                            report("qanda", item._id)
                        }} title="Report" />
                        {
                            user.access.admin ? <Menu.Item onPress={() => {}} title="Delete" /> : null
                        }
                    </Menu>
                </View>
                <View style={styles.body}>
                    <Subheading>{item.text}</Subheading>
                </View>
                <View style={styles.footer}>
                    {
                        isLiked ? (
                            <AntDesign name="heart" size={18} color={colors.accent} onPress={handleLike} />
                        ) : (
                            <AntDesign name="hearto" size={18} color="white" onPress={handleLike} />
                        )
                    }
                </View>
                <View style={{padding: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <Subheading style={{fontSize: 14}}>Comments</Subheading>
                    {item.comments.length > 2 ? <TouchableOpacity onPress={() => setShowComments(!showComments)}><Caption>{showComments ? "See less" : "See more"}</Caption></TouchableOpacity> : null}
                </View>
                    {
                        item.comments.length > 0 ? (
                            showComments ? (
                                comments
                            ) : (
                                <View>
                                    {item.comments[0] ? <Comment item={item.comments[0]} key={"0"} /> : null}
                                    {item.comments[1] ? <Comment item={item.comments[1]} key={"1"} /> : null}
                                </View>  
                            )
                        ) : (
                            <Caption>No comments yet</Caption>
                        )
                    }
                    <View style={{marginTop: 12, flexDirection: 'row'}}>
                        <Image style={{height: 30, width: 30, borderRadius: 15}} source={{uri: user.avatar ? `${baseUrl}${user.avatar}` : defaultAvatar}} />
                        <TextInput value={commentText} onChangeText={setCommentText} placeholderTextColor={dark ? "grey" : "black"} style={styles.commentEditText} placeholder="Add a comment" />
                        <TouchableOpacity onPress={submitComment}>
                            <Title style={{fontSize: 16, fontFamily: "Staatliches_400Regular", letterSpacing: 1.5}}>Post</Title>
                        </TouchableOpacity>
                    </View>
                </View>
            </Surface>
            {
                reportType ? (
                    <View style={{padding: 8}}>
                        <Subheading>Reported for : {getReportName(reportType)}</Subheading>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button onPress={approveReport}>Approve Report</Button>
                            <Button onPress={rejectReport}>Reject Report</Button>
                        </View>
                    </View>
                ) : null
            }
        </View>
    )
}

export default QandAItem

const Comment = ({index, item}) => {
    return (
        <View key={index} style={{marginVertical: 3, flexDirection: 'row'}}>
            <Image source={{uri: item.createdBy.avatar ? `${baseUrl}${item.createdBy.avatar}` : defaultAvatar}} style={{width: 30, height: 30, borderRadius: 15}} />
            <Subheading style={{fontSize: 14, marginStart: 4, flexShrink: 1, alignSelf: 'center'}}>
                {item.createdBy.name ? item.createdBy.name : "Petso User"}
                {" "}
                <Caption>{item.comment}</Caption>
            </Subheading>
        </View>
    )
}

const StyleSheetCreator = (colors, dark) => StyleSheet.create({
    card: {
        elevation: 4,
        borderRadius: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
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
    },
    body: {
        padding: 4,
        marginStart: 8
    },
    footer: {
        flexDirection: 'row',
        padding: 12
    },
    commentEditText: {
        flex: 1,
        marginStart: 8,
        color: dark ? "white" : "black"
    }
})
