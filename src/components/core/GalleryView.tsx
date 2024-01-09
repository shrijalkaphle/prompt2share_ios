import { useEffect, useState } from "react"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { IGeneratedImage } from "../../screens/ImageGenerate.screen"
import Toast from "react-native-root-toast"
import { postGenerateImage } from "../../services/openai.service"
import { Ionicons } from "@expo/vector-icons"
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';

interface IGalleryViewProps {
    images: IGeneratedImage[],
    prompt: string,
    navigation: any
    setImage: any
}
const albumName = "PromptToShare"

export const GalleryView = ({ images, prompt, navigation, setImage }: IGalleryViewProps) => {


    // const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false)

    const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
    const [postingImage, setPostingImage] = useState<boolean>(false)

    const [imageSaving, setImageSaving] = useState<boolean>(false)

    const show = (index: number) => {
        setActiveImageIndex(index)
    }

    const postImage = async () => {
        setPostingImage(true)
        const props = {
            prompt: prompt,
            category: 'extra',
            image_url: images[activeImageIndex].uri
        }
        const response = await postGenerateImage(props)
        
        if (response && response.error) {
            Toast.show(response.error)
            setPostingImage(false)
            return
        }
        Toast.show(response.message)
        setPostingImage(false)
        navigation.navigate('Home', { screen: 'Profile' })
    }

    const saveToMedia = async () => {
        setImageSaving(true)
        Toast.show('Saving image')
        const fileName = `${images[activeImageIndex].id}.png`
        const { uri } = await FileSystem.downloadAsync(images[activeImageIndex].uri, FileSystem.documentDirectory + fileName)
        
        const response = await MediaLibrary.saveToLibraryAsync(uri)
        
        Toast.show('Image Saved')
        setImageSaving(false)
    }

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <StyledView className="rounded-lg h-3/6 px-4 py-1 flex items-center">
            <StyledView className="flex flex-row items-center justify-between w-full px-3 my-2">
                <StyledTouchableOpacity className="" onPress={() => setImage([])}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="" onPress={saveToMedia} disabled={imageSaving}>

                    {
                        imageSaving ? <StyledActivityIndicator /> : <Ionicons name="cloud-download" size={24} color="white" />
                    }
                </StyledTouchableOpacity>
            </StyledView>

            <Image source={images[activeImageIndex].uri} style={{ width: '100%', aspectRatio: 1, borderRadius: 8 }} placeholder={blurhash} transition={500} contentFit="cover" />
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