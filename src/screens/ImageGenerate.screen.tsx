import { useState } from "react";
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import Toast from "react-native-root-toast";
import { generateFeedPost, generateImages } from "../services/openai.service";
import { GalleryView } from "../components/core/GalleryView";
import { Keyboard } from "react-native";

export interface IGeneratedImage {
    uri: string,
    id: number 
}

export const ImageGenerateScreen = ({ navigation }: any) => {

    const [generatedImage, setGeneratedImage] = useState<IGeneratedImage[]>([]);
    const [generatePrompt, setGeneratePrompt] = useState<string>('');
    const [generating, setGenerating] = useState<boolean>(false);

    const generateImage = async () => {
        if(generatePrompt == '') {
            Toast.show('Generate prompt cannot be empty!')
            return
        }
        Keyboard.dismiss()
        setGenerating(true)
        const props = {
            prompt: generatePrompt
        }
        const response = await generateImages(props)
        // console.log(response)
        if(response && response.error) {
            Toast.show(response.error)
            setGenerating(false)
            return
        }
        setGeneratedImage(response)
        setGenerating(false)
    }
    return (
        <StyledView className="flex w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="p-4">
                <StyledTextInput className="border border-slate-300 p-3 rounded-full text-white" value={generatePrompt} onChangeText={(e) => setGeneratePrompt(e)} onSubmitEditing={generateImage} autoCapitalize="none" placeholder="Enter your prompt" />
                <StyledTouchableOpacity className="w-full bg-white/10 p-4 rounded-full flex items-center justify-center mt-2" onPress={generateImage} disabled={generating}>
                    {
                        generating ? <StyledActivityIndicator /> : <StyledText className="text-white">Generate</StyledText>
                    }
                </StyledTouchableOpacity>
            </StyledView>
            {
                generatedImage.length > 0 && <GalleryView images={generatedImage} prompt={generatePrompt} navigation={navigation} />
            }
            


        </StyledView>
    )
}