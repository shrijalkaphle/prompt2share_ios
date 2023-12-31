import { Ionicons } from "@expo/vector-icons"
import { StyledActivityIndicator, StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import Toast from "react-native-root-toast"
import { useEffect, useRef, useState } from "react"

export const DalleScreen = ({ route, navigation }: any) => {

    const { imageBase64 } = route.params
    const [imageGenerating, setImageGenerating] = useState<boolean>(false)

    const undoMask = () => {
        Toast.show('<Mask undo>')
        
    }

    const generateImage = () => {
        setImageGenerating(!imageGenerating)
        Toast.show('<Generate image>')
    }

    useEffect(() => {

    }, [])

    return (
        <StyledView className="w-full h-full bg-background flex items-center justify-center p-4">
            <StyledView className="h-full w-full relative flex items-center mt-20">
                <StyledView className="w-full flex flex-row items-center justify-between px-2">
                    <StyledTouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle" size={36} color="white" />
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity onPress={undoMask}>
                        <Ionicons name="arrow-undo" size={36} color="white" />
                    </StyledTouchableOpacity>
                </StyledView>
                <StyledImage className="rounded-3xl w-full h-4/5" source={{ uri: `data:image/jpg;base64,${imageBase64}` }} />
                


                <StyledView className="w-full flex flex-row items-center justify-center p-2">
                    <StyledTouchableOpacity className="border border-slate-300 py-4 rounded-full w-2/3 flex items-center justify-center" onPress={generateImage} >
                        {
                            imageGenerating ? <StyledActivityIndicator /> : <StyledText className="text-white font-bold text-xl">Generate</StyledText>
                        }
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}