import { useEffect, useRef, useState } from "react"
import { StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { CameraView, CameraCapturedPicture, CameraPictureOptions, useCameraPermissions } from 'expo-camera'
import { Ionicons } from "@expo/vector-icons"
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-root-toast"
import { CameraPreview } from "../components/core/CameraPreview"
import { FlipType, manipulateAsync } from "expo-image-manipulator";
import { AppBarComponent } from "../components/core/AppBarComponent"


export const CameraScreen = ({ navigation }: any) => {
    let cameraRef = useRef<CameraView>(null)
    const [permission, requestPermissions] = useCameraPermissions()
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)
    const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset | undefined>(undefined);
    const [type, setType] = useState('front');

    useEffect(() => {
        const focus = navigation.addListener('focus', async () => {

            const cameraPermission = await requestPermissions()
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()
            setHasMediaLibraryPermission(mediaPermission.status === 'granted')
            console.log(permission, cameraPermission.status)
        })

        return focus
    }, [])

    const takePicture = async () => {
        let options: CameraPictureOptions = {
            quality: 1,
            base64: true,
            exif: false
        };

        if (cameraRef) {
            let data = await cameraRef.current?.takePictureAsync(options)
            if (data) {
                const { uri, base64 } = await manipulateAsync(data.uri, [
                    { flip: FlipType.Horizontal },
                ], { compress: 1, base64: true })
                data.uri = uri
                data.base64 = base64
            }
            setPhoto(data)

            // crop image
        }
    }

    const toggleCameraType = () => {
        setType(current => (current === 'back' ? 'front' : 'back'));
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
                if (result.canceled) return
                setPhoto(result.assets[0])
                return
            }

            Toast.show('Please enable media library permission in settings')
        })()
    }

    if (!permission?.granted) {
        return (
            <StyledView className="w-full h-full bg-background flex items-center justify-center">
                <StyledText className="text-white text-2xl font-bold">Permission for camera not granted! Please change it in settings</StyledText>
            </StyledView>
        )
    }

    return (
        <>
            <AppBarComponent
                hasBack
                navigation={navigation}
            />
            {
                photo
                    ?
                    <CameraPreview navigation={navigation} photo={photo} setPhoto={setPhoto} />
                    :
                    <StyledView className="h-full w-full p-3 bg-black flex items-center justify-between">
                        <StyledView>
                            <StyledView className="flex flex-row items-center justify-end p-2 w-full">
                                <StyledTouchableOpacity className="p-2 items-center justify-center rounded-full bg-white/20" onPress={toggleCameraType}>
                                    <Ionicons name="camera-reverse" size={24} color="white" />
                                </StyledTouchableOpacity>
                            </StyledView>
                            <StyledView className="h-3/4">
                                <StyledView className="rounded-3xl mt-1 overflow-hidden bg-white h-[90%]">
                                    <CameraView ref={cameraRef} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} facing={type} />
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
                                    <Ionicons name="close" size={46} color="white" />
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>


                    </StyledView>
            }
        </>
    )
}