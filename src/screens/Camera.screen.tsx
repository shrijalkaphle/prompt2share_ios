import { useEffect, useRef, useState } from "react"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { Ionicons } from "@expo/vector-icons"
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-root-toast"
import { CameraPreview } from "../components/core/CameraPreview"
export const CameraScreen = ({ navigation }: any) => {
    let cameraRef = useRef<Camera>(null)
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false)
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)
    const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset | undefined>(undefined);
    const [type, setType] = useState(CameraType.front);

    useEffect(() => {
        const focus = navigation.addListener('focus', async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasCameraPermission(cameraPermission.status === 'granted')
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
        })

        return focus
    }, [])

    const takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        if (cameraRef) {
            const data = await cameraRef.current?.takePictureAsync(options)
            setPhoto(data)
        }
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const selectFromMediaLibrary = () => {
        (async () => {
            const { granted } = await MediaLibrary.requestPermissionsAsync()
            if (granted) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: true,
                    quality: 1,
                    allowsEditing: true,
                    aspect: [1, 1],
                })
                if(result.canceled) return
                setPhoto(result.assets[0])
                return
            }

            Toast.show('Please enable media library permission in settings')
        })()
    }

    if (!hasCameraPermission) {
        return (
            <StyledView className="w-full h-full bg-background flex items-center justify-center">
                <StyledText className="text-white text-2xl font-bold">Permission for camera not granted! Please change it in settings</StyledText>
            </StyledView>
        )
    }

    return (
        <>
            {
                photo
                    ?
                    <CameraPreview navigation={navigation} photo={photo} setPhoto={setPhoto} />
                    :
                    <StyledView className="h-full w-full p-3 bg-black flex items-center justify-between">
                        <StyledView>
                            <StyledView className="flex flex-row items-center justify-end p-2 w-full mt-9">
                                <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full bg-white/20" onPress={toggleCameraType}>
                                    <Ionicons name="camera-reverse" size={24} color="white" />
                                </StyledTouchableOpacity>
                            </StyledView>
                            <StyledView className="w-full rounded-3xl mt-1 overflow-hidden relative" style={{ aspectRatio: 1 }}>
                                <Camera ref={cameraRef} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} type={type} ratio="1:1"></Camera>
                            </StyledView>
                        </StyledView>
                        <StyledView className="bg-black flex flex-row items-center justify-between px-4 w-full mb-10">
                            <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full" onPress={selectFromMediaLibrary}>
                                <Ionicons name="images" size={32} color="white" />
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full bg-white" onPress={takePicture}>
                                <Ionicons name="camera" size={46} color="black" />
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full" onPress={() => navigation.goBack()}>
                                <Ionicons name="close" size={32} color="white" />
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
            }
        </>
    )
}