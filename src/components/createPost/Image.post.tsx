import { Formik } from "formik"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useEffect, useState } from "react"
import { InputField } from "../core/InputField"
import * as Yup from 'yup'
import { FORM_ERRORS } from "../../enum/form.enum"
import { createManualImagePost, createManualTextPost } from "../../services/post.service"
import Toast from "react-native-root-toast"
import { Dropdown } from "react-native-element-dropdown"
import { ImagePickerAsset } from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from "expo-image-manipulator";
import { ENDPOINT } from "../../enum/endpoint.enum"
import { FileSystemUploadType } from "expo-file-system"
import { useAuth } from "../../contexts/AuthContext"
import { ICreateManualImagePostProps } from "../../types/services/post.type"

interface IImagePost {
    prompt: string
    imageProvider: string
    photo: ImagePickerAsset | undefined
}

export const ImagePost = ({ navigation }: any) => {

    const { authState } = useAuth()
    const initialFormikValue = {
        prompt: '',
        imageProvider: '',
        photo: undefined
    }

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

    const validationSchema = Yup.object().shape({
        prompt: Yup.string().required(FORM_ERRORS.REQUIRED),
        imageProvider: Yup.string().required(FORM_ERRORS.REQUIRED),
    })

    const [initialValue, setInitialValue] = useState<IImagePost>(initialFormikValue)
    const [formLoading, setFormLoading] = useState<boolean>(false)
    const [photo, setPhoto] = useState<ImagePickerAsset>();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)

    const postToFeed = async (value: IImagePost) => {
        
        // upload image to server
        if (!photo) {
            Toast.show('Please select a video', {
                backgroundColor: 'red',
            })
            return
        }
        setFormLoading(true)
        const { uri } = await manipulateAsync(photo.uri, [], { compress: 1, base64: true })
        const endpoint = `${process.env.EXPO_PUBLIC_API_URL}/${ENDPOINT.UPLOAD_IMAGE}`;
        const { body } = await FileSystem.uploadAsync(endpoint, uri, {
            httpMethod: 'POST',
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            headers: {
                'Authorization': `Bearer ${authState?.token}`
            }
        })
        const props: ICreateManualImagePostProps = {
            prompt: value.prompt,
            imageProvider: value.imageProvider,
            file: body
        }

        const response = await createManualImagePost(props)
        if (response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            setFormLoading(false)
            return
        }

        Toast.show('Post created')
        navigation.navigate('Home', { screen: 'Profile' })
        setFormLoading(false)
    }

    const updateFormik = (value: string, prompt: string) => {
        setInitialValue({ ...initialValue, prompt: prompt, imageProvider: value })
    }

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

    useEffect(() => {
        (async () => {
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
        })()
    }, [])

    return (
        <>

            <Formik initialValues={initialValue} onSubmit={postToFeed} validationSchema={validationSchema} enableReinitialize={true}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <StyledView >
                        <StyledView className="w-full flex flex-row items-center justify-between">
                            <StyledText className="text-white text-2xl font-bold mb-2">Create a post</StyledText>
                            <StyledTouchableOpacity className="w-fit px-4 py-2 rounded-full flex items-center justify-center border-slate-300 border" disabled={formLoading} onPress={() => handleSubmit()}>
                                {
                                    formLoading ? <StyledActivityIndicator /> : <StyledText className="text-white text-lg">Post</StyledText>
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
                        <Dropdown data={imageDropDownData} labelField="label" valueField="value" placeholder="Select Image Provider"
                            selectedTextStyle={{ color: 'white' }} placeholderStyle={{ color: `${errors.imageProvider && touched.imageProvider ? 'red' : 'white'}` }}
                            style={{ backgroundColor: `${errors.imageProvider && touched.imageProvider ? '#fecaca' : 'rgba(255, 255, 255, 0.1)'}`, borderColor: 'white', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, marginTop: 4 }}
                            onChangeText={handleChange('imageProvider')} value={values.imageProvider} onBlur={() => handleBlur('imageProvider')} onChange={(e) => updateFormik(e.value, values.prompt)} />
                        <StyledText className="text-red-500 text-xs ml-2">{errors.imageProvider && touched.imageProvider ? errors.imageProvider : ''}</StyledText>

                        {
                            photo ?
                                <StyledView className="relative">
                                    <StyledImage source={{ uri: photo.uri }} className="w-full h-72 rounded-xl mt-4" />
                                    <StyledTouchableOpacity className="w-full rounded-t rounded-b-xl bg-white/50 py-2 flex items-center justify-center absolute bottom-0" onPress={imagePicker}>
                                        <StyledText className="text-white text-xl font-bold">Upload another</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                                :
                                <>
                                    <StyledTouchableOpacity className={`w-full rounded-xl h-40 p-4 flex items-center justify-center ${errors.photo && touched.photo ? 'bg-red-200' : 'bg-white/10'}`} onPress={imagePicker}>
                                        <StyledText className={`text-white text-xl font-bold ${errors.photo && touched.photo ? 'text-red-500' : 'text-white'}`}>Upload your image</StyledText>
                                    </StyledTouchableOpacity>
                                </>
                        }
                    </StyledView>
                )}
            </Formik>
            {/* <StyledView className="w-full rounded-xl bg-white/10 h-fit p-4">
                <StyledTextInput className="text-white" placeholder={'Your Prompt'} placeholderTextColor={'white'} value={prompt} onChange={(e) => setPrompt(e.nativeEvent.text)} returnKeyType="done" />
            </StyledView> */}
        </>
    )
}