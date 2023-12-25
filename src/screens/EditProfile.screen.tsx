import { StyledActivityIndicator, StyledImage, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import Toast from "react-native-root-toast";
import { updateUserPassword, updateUserProfile } from "../services/auth.service";
import { Keyboard } from "react-native";
import { IUpdateDetailParams } from "../types/services/auth.type";
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import { ENDPOINT } from "../enum/endpoint.enum";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, FlipType } from 'expo-image-manipulator';


export const EditProfileScreen = ({ navigation }: any) => {

    const { authUser, setAuthUser, authState } = useAuth()
    const [profile, setProfile] = useState<string>(authUser?.profile ? authUser?.profile : 'https://bootdey.com/img/Content/avatar/avatar7.png')
    const [name, setName] = useState<string>(authUser?.name ? authUser?.name : '')
    const [email, setEmail] = useState<string>(authUser?.email ? authUser?.email : '')
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)

    const [profileUploading, setProfileUploading] = useState<boolean>(false)

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const updateDetails = async () => {
        Keyboard.dismiss()
        if (changePassword) {
            if (password !== confirmPassword) {
                Toast.show('Passwords do not match')
                return
            }
            const props = {
                password: password,
                confirm_password: confirmPassword
            }
            const response = await updateUserPassword(props)
            if (response && response.error) {
                Toast.show(response.message)
                return
            }
            Toast.show(response.message)
            setPassword('')
            setConfirmPassword('')
        } else {
            const props: IUpdateDetailParams = {
                name: name,
                email: email
            }
            const response = await updateUserProfile(props)
            if (response && response.error) {
                Toast.show(response.message)
                return
            }
            Toast.show(response.message)
            if (setAuthUser)
                setAuthUser(response.user)
        }
    }

    const changeForm = () => {
        if (changePassword) {
            setPassword('')
            setConfirmPassword('')
        } else {
            setName(authUser?.name ? authUser?.name : '')
            setEmail(authUser?.email ? authUser?.email : '')
        }
        setChangePassword(!changePassword)
    }

    const updateProfilePicture = async () => {
        if (!hasMediaLibraryPermission) {
            Toast.show('Please enable media library permission in settings')
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
            cameraType: ImagePicker.CameraType.front
        })

        if (result.canceled) {
            return
        }
        setProfileUploading(true)
        // flip image
        const { uri } = await manipulateAsync(result.assets[0].uri, [], { compress: 0, base64: true })
        const endpoint = `${process.env.EXPO_PUBLIC_API_URL}/${ENDPOINT.UPDATE_PROFILE}`;
        const { body } = await FileSystem.uploadAsync(endpoint,uri,{
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'profile',
            headers: {
                'Authorization': `Bearer ${authState?.token}`
            }
        })
        const response = JSON.parse(body)
        if(response && response.error) {
            Toast.show(response.message)
            setProfileUploading(false)
            return 
        }
        if (setAuthUser) {
            setAuthUser(response.user)
            setProfile(response.user.profile)
        }

        setProfileUploading(false)
    }



    useEffect(() => {
        (async () => {
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
        })()
    }, [])

    return (
        <StyledView className="w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} hasTitle={true} title={"Edit Profile"}/>
            <StyledView className="w-full mt-9 flex items-center">
                <StyledView className="h-32 w-32 bg-black rounded-full relative">
                    <StyledImage className="h-32 w-32 rounded-full" source={{ uri: profile }} />
                    <StyledTouchableOpacity className="bg-slate-500 absolute bottom-2 right-0 flex items-center justify-center p-1 rounded-full" onPress={updateProfilePicture}>
                        {
                            profileUploading ? <StyledActivityIndicator/> : <Ionicons name="camera" size={24} color="white" />
                        }
                    </StyledTouchableOpacity>
                </StyledView>

                <StyledView className="w-2/3 h-20 mt-10">
                    {
                        changePassword
                            ?
                            <StyledView>
                                <StyledView className="my-1">
                                    <StyledText className="text-lg text-white font-semibold">Password</StyledText>
                                    <StyledTextInput className="bg-white/10 h-10 rounded-lg mt-1 px-3 py-2 text-white" value={password} onChange={(e) => setPassword(e.nativeEvent.text)} secureTextEntry={true} autoCapitalize="none" />
                                    <StyledText className="text-xs text-white font-bold my-1 mx-3 italic">{password}</StyledText>
                                </StyledView>
                                <StyledView className="my-1">
                                    <StyledText className="text-lg text-white font-semibold">Change Password</StyledText>
                                    <StyledTextInput className="bg-white/10 h-10 rounded-lg mt-1 px-3 py-2 text-white" value={confirmPassword} onChange={(e) => setConfirmPassword(e.nativeEvent.text)} secureTextEntry={true} autoCapitalize="none" />
                                    <StyledText className="text-xs text-white font-bold my-1 mx-3 italic">{confirmPassword}</StyledText>
                                </StyledView>
                            </StyledView>
                            :
                            <StyledView>
                                <StyledView className="my-3">
                                    <StyledText className="text-lg text-white font-semibold">Name</StyledText>
                                    <StyledTextInput className="bg-white/10 h-10 rounded-lg mt-1 px-3 py-2 text-white" value={name} onChange={(e) => setName(e.nativeEvent.text)} />
                                </StyledView>
                                <StyledView className="my-3">
                                    <StyledText className="text-lg text-white font-semibold">Email</StyledText>
                                    <StyledTextInput className="bg-white/10 h-10 rounded-lg mt-1 px-3 py-2 text-white" value={email} onChange={(e) => setEmail(e.nativeEvent.text)} autoCapitalize="none" />
                                </StyledView>
                            </StyledView>
                    }
                    <StyledTouchableOpacity className="border border-slate-300 rounded-lg mt-6 py-3 flex items-center justify-center" onPress={updateDetails}>
                        <StyledText className="text-white font-bold text-lg">Update</StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity className="mt-6 py-3 flex items-center justify-center" onPress={changeForm}>
                        <StyledText className="text-white font-bold text-lg">{changePassword ? 'Change Details' : 'Change Password'}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}