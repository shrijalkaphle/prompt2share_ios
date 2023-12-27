import { useEffect, useRef, useState } from "react"
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import AutoGrowingTextInput from 'react-native-autogrow-textinput-ts';
import { Dropdown } from "react-native-element-dropdown";
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImagePickerAsset } from "expo-image-picker";
import { ICreateManualPostProps } from "../types/services/post.type";
import { FileSystemUploadType } from "expo-file-system";
import { ENDPOINT } from "../enum/endpoint.enum";
import { useAuth } from "../contexts/AuthContext";
import Toast from "react-native-root-toast";
import { AppBarComponent } from "../components/core/AppBarComponent";
import { manipulateAsync } from "expo-image-manipulator";
import { KeyboardAvoidingView, Platform } from "react-native";
import { BottomTab } from "../components/core/BottomTab";
import { TextPost } from "../components/createPost/Text.post";
import { ImagePost } from "../components/createPost/Image.post";
import { VideoPost } from "../components/createPost/Video.post";

export enum IPostType {
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
}
export const CreatePostScreen = ({ navigation }: any) => {

    const [video, setVideo] = useState<ImagePickerAsset>();
    const [postType, setPostType] = useState<IPostType>(IPostType.TEXT)

    return (
        <StyledView className="h-full w-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="w-full mt-1 p-4" style={{ flex: 1, minHeight: '50%' }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    
                    {postType == IPostType.TEXT && <TextPost navigation={navigation}/>}
                    {postType == IPostType.IMAGE && <ImagePost navigation={navigation}/>}
                    {postType == IPostType.VIDEO && <VideoPost navigation={navigation}/>}

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