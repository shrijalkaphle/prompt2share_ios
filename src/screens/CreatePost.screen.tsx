import { useEffect, useRef, useState } from "react"
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import * as MediaLibrary from 'expo-media-library'
import AutoGrowingTextInput from 'react-native-autogrow-textinput-ts';
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImagePickerAsset } from "expo-image-picker";
import { ICreateManualPostProps } from "../types/services/post.type";
import { createManualPost } from "../services/post.service";
import { FileSystemUploadType } from "expo-file-system";
import { ENDPOINT } from "../enum/endpoint.enum";
import { useAuth } from "../contexts/AuthContext";
import Toast from "react-native-root-toast";
import { AppBarComponent } from "../components/core/AppBarComponent";
import { manipulateAsync } from "expo-image-manipulator";
import { KeyboardAvoidingView, Platform } from "react-native";
import { BottomTab } from "../components/core/BottomTab";

export enum IPostType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
}
export const CreatePostScreen = ({ navigation }: any) => {

    const { authState } = useAuth()
    const imageDropDownData = [
        {
            label: 'DALL-E',
            value: 'DALL-E',
        },
        {
            label: 'Craiyon',
            value: 'Craiyon',
        },
        {
            label: 'Midjourney',
            value: 'Midjourney',
        }
    ]

    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)
    const [photo, setPhoto] = useState<ImagePickerAsset>();
    const [video, setVideo] = useState<ImagePickerAsset>();
    const [prompt, setPrompt] = useState<string>('');
    const [imageProvider, setImageProvider] = useState<string>('');
    const [postType, setPostType] = useState<IPostType>(IPostType.TEXT);
    const [textPost, setTextPost] = useState<string>('');

    const [posting, setPosting] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
        })()
    }, [])

    const imagePicker = async () => {
        if (!hasMediaLibraryPermission) {
            Toast.show('Please enable media library permission in settings')
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
        })

        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    }

    const videoPicker = async () => {
        if (!hasMediaLibraryPermission) {
            Toast.show('Please enable media library permission in settings')
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            base64: true,
            quality: 1,
        })

        if (!result.canceled) {
            setVideo(result.assets[0]);
        }
    }

    const postToFeed = async () => {
        setPosting(true)
        let props: ICreateManualPostProps = {
            prompt: prompt,
            file: null,
            imageProvider: null,
            chunk: null,
            postType: postType
        }
        if (postType == IPostType.IMAGE || postType == IPostType.VIDEO) {
            const endpoint = `${process.env.EXPO_PUBLIC_API_URL}/${postType == IPostType.IMAGE ? ENDPOINT.UPLOAD_IMAGE : ENDPOINT.UPLOAD_VIDEO}`;
            let rawUri = ''
            if (postType == IPostType.IMAGE)
                rawUri = photo?.uri ? photo.uri : ''
            if (postType == IPostType.VIDEO)
                rawUri = video?.uri ? video.uri : ''

            const { uri } = await manipulateAsync(rawUri, [], { compress: 0, base64: true })
            const { body } = await FileSystem.uploadAsync(endpoint, uri, {
                httpMethod: 'POST',
                uploadType: FileSystemUploadType.MULTIPART,
                fieldName: 'file',
                headers: {
                    'Authorization': `Bearer ${authState?.token}`
                }
            })
            props.file = body
            props.imageProvider = postType == IPostType.IMAGE ? imageProvider : null
        }

        props.chunk = postType == IPostType.TEXT ? textPost : null
        const response = await createManualPost(props)
        console.log(response)
        if (response && response.error) {
            setPosting(false)
            Toast.show('Error creating post')
            return
        }
        Toast.show('Post created')
        navigation.navigate('Home', { screen: 'Profile' })
        setPosting(false)
    }

    return (
        <StyledView className="h-full w-full bg-background">
            <StyledView className="w-full h-24 flex flex-row items-end justify-center p-4 bg-background">
                <StyledView className="w-full flex flex-row items-center justify-between">
                    <StyledTouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={18} color="white" />
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="w-fit px-4 py-2 rounded-full flex items-center justify-center bg-white/10" onPress={postToFeed} disabled={posting}>
                        {
                            posting ? <StyledActivityIndicator size={"large"} /> : <StyledText className="text-base text-white font-bold">Post</StyledText>
                        }
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            <StyledView className="w-full mt-1 p-4" style={{ flex: 1, minHeight: '50%' }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <StyledText className="text-white text-2xl font-bold mb-2">Create a post</StyledText>
                    <StyledText className="text-white text-base font-bold mt-3 my-2">Prompt</StyledText>
                    <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4">
                        <StyledTextInput className="text-white" placeholder={'Your Prompt'} placeholderTextColor={'white'} value={prompt} onChange={(e) => setPrompt(e.nativeEvent.text)} returnKeyType="done" />
                    </StyledView>
                    <StyledView className={`${postType == IPostType.TEXT ? 'mt-4' : 'hidden'}`}>
                        <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4 ">
                            <AutoGrowingTextInput placeholder={'Write a post'} style={{ color: 'white', textAlignVertical: 'top' }} minHeight={50} maxHeight={50} placeholderTextColor={'white'} value={textPost} onChange={(e) => setTextPost(e.nativeEvent.text)} />
                        </StyledView>
                    </StyledView>

                    <StyledView className={`${postType == IPostType.IMAGE ? 'mt-4 ' : 'hidden'}`}>
                        {
                            photo ?
                                <StyledView className="relative">
                                    <StyledImage source={{ uri: photo.uri }} className="w-full h-72 rounded-xl mt-4" />
                                    <StyledTouchableOpacity className="w-full rounded-t rounded-b-xl bg-white/50 py-2 flex items-center justify-center absolute bottom-0" onPress={imagePicker}>
                                        <StyledText className="text-white text-xl font-bold">Upload another</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                                :
                                <StyledTouchableOpacity className="w-full rounded-xl bg-white/10 h-40 p-4 flex items-center justify-center" onPress={imagePicker}>
                                    <StyledText className="text-white text-xl font-bold">Upload your image</StyledText>
                                </StyledTouchableOpacity>
                        }

                        <Dropdown data={imageDropDownData} labelField="label" valueField="value" placeholder="Select Image Provider"
                            selectedTextStyle={{ color: 'white' }} placeholderStyle={{ color: 'white' }}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'white', padding: 12, borderRadius: 12, marginTop: 16 }}
                            onChange={(e) => setImageProvider(e.value)} value={imageProvider} />
                        {/* <StyledText className="text-white text-xl font-bold mt-3 my-2">Prompt</StyledText>
                        <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4">
                            <StyledTextInput placeholder={'Your Prompt'} placeholderTextColor={'white'} value={prompt} onChange={(e) => setPrompt(e.nativeEvent.text)} className="text-white" />
                        </StyledView> */}
                    </StyledView>

                    <StyledView className={`${postType == IPostType.VIDEO ? 'mt-4 ' : 'hidden'}`}>
                        {
                            video ?
                                <StyledView>
                                    <StyledImage source={{ uri: video.uri }} className="w-full h-52 rounded-xl mt-4 relative" />
                                    <StyledTouchableOpacity className="w-full rounded-t rounded-b-xl bg-white/50 py-2 flex items-center justify-center absolute bottom-0" onPress={videoPicker}>
                                        <StyledText className="text-white text-xl font-bold">Upload another</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                                :
                                <StyledTouchableOpacity className="w-full rounded-xl bg-white/10 h-40 p-4 flex items-center justify-center" onPress={videoPicker}>
                                    <StyledText className="text-white text-xl font-bold">Upload your video</StyledText>
                                </StyledTouchableOpacity>
                        }
                        {/* <StyledText className="text-white text-xl font-bold mt-3 my-2">Prompt</StyledText>
                        <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4">
                            <StyledTextInput placeholder={'Your Prompt'} placeholderTextColor={'white'} className="text-white" value={prompt} onChange={(e) => setPrompt(e.nativeEvent.text)} />
                        </StyledView> */}
                    </StyledView>

                    <StyledView className="w-full py-2 flex items-center flex-row">
                        <StyledTouchableOpacity className="p-4 flex items-center justify-center" onPress={() => setPostType(IPostType.TEXT)}>
                            <Ionicons name={'text'} size={22} color={'white'} />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="p-4 flex items-center justify-center" onPress={() => setPostType(IPostType.IMAGE)}>
                            <Ionicons name={'image'} size={22} color={'white'} />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="p-4 flex items-center justify-center" onPress={() => setPostType(IPostType.VIDEO)}>
                            <Ionicons name={'videocam'} size={22} color={'white'} />
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* <StyledTouchableOpacity className="w-full px-4 py-2 rounded-full flex items-center justify-center border-slate-300 border" onPress={postToFeed} disabled={posting}>
                        {
                            posting ? <StyledActivityIndicator size={"large"} /> : <StyledText className="text-white text-xl font-bold mt-3 my-2">Post</StyledText>
                        }
                    </StyledTouchableOpacity> */}
                </KeyboardAvoidingView>
            </StyledView>
        </StyledView>
    )
}