import { useEffect, useState } from "react"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { IGeneratedImage } from "../../screens/ImageGenerate.screen"
import Toast from "react-native-root-toast"
import { postGenerateImage } from "../../services/openai.service"
import { Ionicons } from "@expo/vector-icons"
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import { Platform } from "react-native"

interface IGalleryViewProps {
    images: IGeneratedImage[],
    prompt: string,
    navigation: any
}
const albumName = "PromptToShare"

export const GalleryView = ({ images, prompt, navigation }: IGalleryViewProps) => {

    
    // const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)

    const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
    const [postingImage, setPostingImage] = useState<boolean>(false)

    const [imageSaving, setImageSaving] = useState<boolean>(false)

    const show = (index: number) => {
        setActiveImageIndex(index)
    }

    const deleteImage = () => {
        
    }

    const postImage = async () => {
        if(!activeImageIndex) {
            Toast.show('Please select an image!')
            return
        }
        setPostingImage(true)
        const props = {
            prompt: prompt,
            category: 'extra',
            image_url: images[activeImageIndex].uri
        }
        const response = await postGenerateImage(props)
        console.log(response)
        if(response && response.error) {
            Toast.show(response.error)
            setPostingImage(false)
            return
        }
        Toast.show(response.message)
        setPostingImage(false)
        navigation.navigate('Home', { screen: 'ProfileScreen' })
    }

    const saveToMedia = async () => {
        setImageSaving(true)
        Toast.show('Saving image')
        const fileName = `${images[activeImageIndex].id}.png`
        const { uri } = await FileSystem.downloadAsync(images[activeImageIndex].uri, FileSystem.documentDirectory + fileName)
        console.log(uri)
        const response = await MediaLibrary.saveToLibraryAsync(uri)
        console.log(response, uri)
        Toast.show('Image Saved')
        setImageSaving(false)
    }
    
    return (
        <StyledView className="rounded-lg h-3/6 mt-2 px-4 py-1 flex items-center">
            
            <StyledView className="flex flex-row items-end justify-end w-full px-3">
                <StyledTouchableOpacity className="" onPress={saveToMedia} disabled={imageSaving}>
                    
                    {
                        imageSaving ? <StyledActivityIndicator /> : <Ionicons name="cloud-download" size={32} color="white" />
                    }
                </StyledTouchableOpacity>
            </StyledView>

            <StyledImage source={{ uri: images[activeImageIndex].uri }} className="w-full h-full rounded-lg mx-2"/>
            <StyledView className="flex flex-row items-center justify-center mt-2">
                {
                    images.map((image, index) => {
                        return (
                            <StyledTouchableOpacity onPress={() => show(index)} key={index}>
                                <StyledImage source={{ uri: image.uri }} className={`w-12 h-14 rounded-lg mx-2 ${index == activeImageIndex ? '' : 'opacity-50'}`} />
                            </StyledTouchableOpacity>
                        )
                    })
                }

            </StyledView>
            <StyledView className="flex flex-row items-center justify-center mt-2">
                <StyledTouchableOpacity className="border border-slate-300 w-1/3 rounded-full py-3 flex items-center justify-center" onPress={postImage} disabled={postingImage}>
                    {
                        postingImage ? <StyledActivityIndicator /> : <StyledText className="text-white font-bold text-xl">Post</StyledText>
                    }
                    
                </StyledTouchableOpacity>
            </StyledView>

        </StyledView>
    )
}