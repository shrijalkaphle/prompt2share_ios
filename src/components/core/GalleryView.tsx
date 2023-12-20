import { useEffect, useState } from "react"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { IGeneratedImage } from "../../screens/ImageGenerate.screen"
import Toast from "react-native-root-toast"
import { postGenerateImage } from "../../services/openai.service"

interface IGalleryViewProps {
    images: IGeneratedImage[],
    prompt: string,
    navigation: any
}

export const GalleryView = ({ images, prompt, navigation }: IGalleryViewProps) => {

    const [uri, setUri] = useState<string>()
    const [postingImage, setPostingImage] = useState<boolean>(false)

    const show = (uri: string) => {
        setUri(uri)
    }
    useEffect(() => {
        setUri(images[0].uri)
    }, [])

    const postImage = async () => {
        if(!uri) {
            Toast.show('Please select an image!')
            return
        }
        setPostingImage(true)
        const props = {
            prompt: prompt,
            category: 'extra',
            image_url: uri
        }
        const response = await postGenerateImage(props)
        console.log(response)
        if(response && response.error) {
            Toast.show(response.error)
            setPostingImage(false)
            return
        }
        Toast.show(response.message)
        // navigation.navigate('Home', { screen: 'ProfileScreen' })
        setPostingImage(false)
    }
    
    return (
        <StyledView className="rounded-lg h-3/6 mt-2 p-4 flex items-center">
            {/* image preivew */}
            <StyledImage source={{ uri: uri }} className="w-full h-full rounded-lg mx-2" />
            <StyledView className="flex flex-row items-center justify-center mt-2">
                {
                    images.map((image, index) => {
                        return (
                            <StyledTouchableOpacity onPress={() => show(image.uri)} key={index}>
                                <StyledImage source={{ uri: image.uri }} className={`w-12 h-14 rounded-lg mx-2 ${image.uri == uri ? '' : 'opacity-50'}`} />
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