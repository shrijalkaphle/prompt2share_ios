import moment from "moment";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyledActivityIndicator, StyledImage, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import React, { useEffect, useRef, useState } from "react";
import { IPost, IPostComment, IPostLike } from "../../types/models.type";
import { commentPostbyId, likePostbyId, tyophyPostbyId } from "../../services/post.service";
import { useAuth } from "../../contexts/AuthContext";
import { ICommentProps, ICommentResponse } from "../../types/services/post.type";
import Toast from 'react-native-root-toast'
import { Video, ResizeMode } from 'expo-av';
import { Modal } from "react-native";
import { ImageModel } from "./ImageModel";

interface IPostCard {
    post: IPost
    navigation: any
}

export const PostCard = ({ post, navigation }: IPostCard) => {

    const video = useRef(null)
    const [status, setStatus] = React.useState({});

    const { authUser, setAuthUser } = useAuth();

    const [toogleComment, setToogleComment] = useState<boolean>(false)
    const [wirteComment, setWriteComment] = useState<string>('')
    const [comments, setComments] = useState<IPostComment[]>(post.comment)

    const [commetCount, setCommentCount] = useState<number>(comments.length)
    const [likeCount, setLikeCount] = useState<number>(post.like.length)
    const [troplyCount, setTroplyCount] = useState<number>(post.trophy.length)
    const [isLiked, setIsLiked] = useState<boolean>(post.like.some((like: any) => like.user_id === authUser?.user_id))
    const [isTroplyed, setIsTroplyed] = useState<boolean>(post.trophy.some((like: any) => like.user_id === authUser?.user_id))

    const [commenting, setCommenting] = useState<boolean>(false)
    const [modelState, setModelState] = useState<boolean>(false)

    const dateFormat = () => {
        return moment(post.created_at).format('MMM D, YYYY');
    }

    const likePost = async () => {
        if (isLiked) {
            return
        }
        const response = await likePostbyId({ id: parseInt(post.id) })
        if (response && response.error) {
            Toast.show(response.message)
            return
        }

        setLikeCount(likeCount + 1)
        setIsLiked(true)

    }

    const troplyPost = async () => {
        if (isTroplyed) {
            return
        }
        const response = await tyophyPostbyId({ id: parseInt(post.id) })
        if (response && response.error) {
            Toast.show(response.message)
            return
        }

        setTroplyCount(troplyCount + 1)
        setIsTroplyed(true)
        response.level
        if (authUser && setAuthUser)
            setAuthUser({
                ...authUser,
                level: response.level
            })
    }

    const commentOnPost = async () => {
        const params: ICommentProps = {
            id: parseInt(post.id),
            comment: wirteComment
        }

        if (wirteComment === '') {
            return
        }
        setCommenting(true)
        const response: ICommentResponse = await commentPostbyId(params)
        Toast.show(response.message)
        if (response && response.error) {
            Toast.show(response.message)
        } else {
            setComments(response.comment)
            setCommenting(false)
            setCommentCount(response.comment.length)
            setWriteComment('')
        }
    }

    const fileExtensionType = () => {
        if (post.file) {
            return post.file.split('.').pop()
        }
    }

    const triggerModel = () => {
        setModelState(true)
    }

    return (
        <>
            <StyledView className="my-2 bg-white/10 shadow rounded-lg p-4">
                <StyledView className="flex flex-row gap-x-4">
                    <StyledImage source={{ uri: post.user?.profile ? post.user?.profile : 'https://bootdey.com/img/Content/avatar/avatar7.png' }} className="h-10 w-10 rounded-full" />
                    <StyledView>
                        <StyledText className="text-lg font-base text-white">{post.user?.name}</StyledText>
                        <StyledText className="text-xs font-bold text-white">{dateFormat()}</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="my-2">
                    <StyledText className={`text-white my-4 ${isLiked ? '' : 'hidden'}`}>
                        <StyledText className="font-bold">Prompt: </StyledText>
                        <StyledText>{post.title}</StyledText>
                    </StyledText>
                    {
                        post.file ?
                            <StyledView className="mt-4">
                                {
                                    (fileExtensionType() != 'mp4') ?
                                        <StyledTouchableOpacity onPress={triggerModel}>
                                            <StyledImage source={{ uri: post.file }} className="h-64 w-full rounded-lg" />
                                        </StyledTouchableOpacity>
                                        :
                                        <Video
                                            ref={video}
                                            style={{ flex: 1, alignSelf: 'stretch', width: '100%', height: 300, backgroundColor: '#000' }}
                                            // className="w-full h-64 rounded-lg flex"
                                            source={{
                                                uri: post.file,
                                            }}
                                            useNativeControls
                                            resizeMode={ResizeMode.CONTAIN}
                                            isLooping
                                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                                        />
                                    // <StyledText className="text-white">{fileExtensionType()}</StyledText>
                                }
                            </StyledView>
                            :
                            <StyledText className="text-white">{post.chunk}</StyledText>
                    }
                </StyledView>
                <StyledView className="my-2 flex flex-row gap-x-1">
                    <StyledTouchableOpacity className={`w-1/3 py-2 rounded-lg ${isLiked ? 'bg-white/10' : ''} `} onPress={likePost}><StyledText className="text-white text-center"><Ionicons name={isLiked ? 'medal' : 'medal-outline'} size={22} color={'white'} /> {likeCount}</StyledText></StyledTouchableOpacity>
                    <StyledTouchableOpacity className={`w-1/3 py-2 rounded-lg ${isTroplyed ? 'bg-white/10' : ''} `} onPress={troplyPost}><StyledText className="text-white text-center"><Ionicons name={isTroplyed ? 'trophy' : 'trophy-outline'} size={22} color={'white'} /> {troplyCount}</StyledText></StyledTouchableOpacity>
                    <StyledTouchableOpacity className={`w-1/3 py-2 rounded-lg `} onPress={() => setToogleComment(!toogleComment)}><StyledText className="text-white text-center"><Ionicons name={'chatbubble-outline'} size={22} color={'white'} /> {commetCount}</StyledText></StyledTouchableOpacity>
                </StyledView>

                <StyledView className={`my-2 border-t border-background ${toogleComment ? '' : 'hidden'}`}>
                    {
                        comments.map((comment: IPostComment, index: number) => (
                            <StyledView className="flex flex-row items-center m-3 justify-center gap-x-3" key={`comment_${post.id}_${index}`}>
                                <StyledImage source={{ uri: comment.profile ? comment.profile : 'https://bootdey.com/img/Content/avatar/avatar7.png' }} className="h-8 w-8 rounded-full border" />
                                <StyledView className="bg-white/10 w-4/5 p-2 rounded-lg">
                                    <StyledText className="text-white font-medium">{comment.name}</StyledText>
                                    <StyledText className="text-slate-400">{comment.text}</StyledText>
                                </StyledView>
                            </StyledView>
                        ))
                    }
                    <StyledView className="flex flex-row items-center m-3 justify-center gap-x-3">
                        <StyledImage source={{ uri: authUser?.profile ? authUser.profile : 'https://bootdey.com/img/Content/avatar/avatar7.png' }} className="h-8 w-8 rounded-full border" />
                        <StyledView className="bg-white/10 w-4/5 p-2 rounded-lg">
                            <StyledTextInput className="text-white font-medium" placeholder="Write a comment" value={wirteComment} onChangeText={(text: string) => setWriteComment(text)} placeholderTextColor={'white'} />
                        </StyledView>
                        <StyledTouchableOpacity className={`py-2 rounded-lg `} onPress={commentOnPost} disabled={commenting}>

                            {
                                commenting
                                    ?
                                    <StyledActivityIndicator />
                                    :
                                    <Ionicons name={'send-outline'} size={22} color={'white'} />
                            }

                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>

            <ImageModel modelState={modelState} setModelState={setModelState} image={post.file} />
        </>

    )
}