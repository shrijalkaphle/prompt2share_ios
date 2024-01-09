import { Formik } from "formik"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useEffect, useState } from "react"
import { InputField } from "../core/InputField"
import * as Yup from 'yup'
import { FORM_ERRORS } from "../../enum/form.enum"
import { createManualVideoPost } from "../../services/post.service"
import Toast from "react-native-root-toast"
import { ImagePickerAsset } from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ENDPOINT } from "../../enum/endpoint.enum"
import { FileSystemUploadType } from "expo-file-system"
import { useAuth } from "../../contexts/AuthContext"
import { ICreateManualVideoPostProps } from "../../types/services/post.type"
import { ResizeMode, Video } from "expo-av"

interface IImagePost {
    prompt: string
    photo: ImagePickerAsset | undefined
}

export const VideoPost = ({ navigation }: any) => {

    const { authState } = useAuth()
    const initialFormikValue = {
        prompt: '',
        photo: undefined
    }
    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required(FORM_ERRORS.REQUIRED),
    })

    const [initialValue, setInitialValue] = useState<IImagePost>(initialFormikValue)
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const [video, setVideo] = useState<ImagePickerAsset>();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)

    const postToFeed = async (value: IImagePost) => {

        // upload image to server
        if (!video) {
            Toast.show('Please select a video', {
                backgroundColor: 'red',
            })
            return
        }
        setFormLoading(true)
        const endpoint = `${process.env.EXPO_PUBLIC_API_URL}/${ENDPOINT.UPLOAD_VIDEO}`;
        const { body } = await FileSystem.uploadAsync(endpoint, video.uri, {
            httpMethod: 'POST',
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            headers: {
                'Authorization': `Bearer ${authState?.token}`
            }
        })
        const {s3Url, token} = JSON.parse(body)
        const props: ICreateManualVideoPostProps = {
            prompt: value.prompt,
            file: s3Url,
            token: token
        }

        const response = await createManualVideoPost(props)
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            setFormLoading(false)
            return
        }

        Toast.show('Post created')
        try {
            const cacheDirectory = `${FileSystem.cacheDirectory}/${video.fileName}`;
            if(cacheDirectory) await FileSystem.deleteAsync(video.uri);
        } catch(e) {
            
        }

        navigation.navigate('Home', { screen: 'Profile' })
        setFormLoading(false)
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
            setVideo(result.assets[0])
        }

        
    }

    useEffect(() => {
        (async () => {
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
        })()
    }, [])

    return (
        <>

            <Formik initialValues={initialValue} onSubmit={postToFeed} validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <StyledView >
                        <StyledView className="w-full flex flex-row items-center justify-between">
                            <StyledText className="text-white text-2xl font-bold mb-2">Create a post</StyledText>
                            <StyledTouchableOpacity className="w-1/3 px-4 py-3 rounded-full flex items-center justify-center border-slate-300 border" disabled={formLoading} onPress={() => handleSubmit()}>
                                {
                                    formLoading ? <StyledActivityIndicator /> : <StyledText className="text-white my-0.5">Post</StyledText>
                                }
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="mt-3">
                            <InputField
                                value={values.prompt}
                                handleChange={handleChange('prompt')}
                                handleBlur={handleBlur('prompt')}
                                placeholder="Enter your prompt"
                                error={`${errors.prompt && touched.prompt ? errors.prompt : ""}`}
                                secureText={false}
                            />
                        </StyledView>
                        {
                            video ?
                                <StyledView>
                                    <Video source={{ uri: video.uri }} className="w-full h-52 rounded-t-xl mt-4 relative bg-white/10" useNativeControls resizeMode={ResizeMode.CONTAIN}/>
                                    <StyledTouchableOpacity className="w-full rounded-b-xl bg-white/50 py-2 flex items-center justify-center" onPress={videoPicker}>
                                        <StyledText className="text-white text-xl font-bold">Upload another</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                                :
                                <StyledTouchableOpacity className="w-full rounded-xl bg-white/10 h-40 p-4 flex items-center justify-center" onPress={videoPicker}>
                                    <StyledText className="text-white text-xl font-bold">Upload your video</StyledText>
                                </StyledTouchableOpacity>
                        }
                    </StyledView>
                )}
            </Formik>
        </>
    )
}