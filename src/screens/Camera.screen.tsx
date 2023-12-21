import { useEffect, useRef, useState } from "react"
import { StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { Camera, CameraType } from 'expo-camera'
import { Ionicons } from "@expo/vector-icons"
import * as MediaLibrary from 'expo-media-library'

export const CameraScreen = ({navigation}: any) => {
    let cameraRef = useRef<Camera>(null)
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false)
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)
    const [photo, setPhoto] = useState(undefined);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasCameraPermission(cameraPermission.status === 'granted')
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
        })()
    }, [])

    const takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        if (cameraRef) {
            const data = await cameraRef.current?.takePictureAsync(options)
            console.log(data?.uri)
            navigation.navigate('DALLE', { imageBase64: data?.base64 })
        }
    }

    if (!hasCameraPermission) {
        return (
            <StyledView className="w-full h-full bg-background flex items-center justify-center">
                <StyledText className="text-white text-2xl font-bold">Permission for camera not granted! Please change it in settings</StyledText>
            </StyledView>
        )
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const selectFromMediaLibrary = () => {
        (async () => {
            const { granted } = await MediaLibrary.requestPermissionsAsync()
            if (granted) {
                const { assets } = await MediaLibrary.getAssetsAsync()
                console.log(assets)
            }
        })()
    }

    return (
        <StyledView className="h-full w-full p-3 bg-black">
            <StyledView className="w-full h-4/5 rounded-3xl mt-9 overflow-hidden">
                <Camera ref={cameraRef} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} type={type} ratio="16:9"></Camera>
            </StyledView>
            <StyledView className="bg-black flex flex-row items-center justify-between px-4">
                <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full" onPress={selectFromMediaLibrary}>
                    <Ionicons name="images" size={32} color="white" />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full bg-white" onPress={takePicture}>
                    <Ionicons name="camera" size={46} color="black" />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full" onPress={toggleCameraType}>
                    <Ionicons name="camera-reverse" size={32} color="white" />
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    )
}