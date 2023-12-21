import { useState } from "react";
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledScrollView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";
import { generateFeedPost } from "../services/openai.service";
import { ICreatePostProps } from "../types/services/post.type";
import { createPost } from "../services/post.service";

export const GenerateScreen = ({ navigation }: any) => {

    const [generatedText, setGeneratedText] = useState<string[]>([]);
    const [generatePrompt, setGeneratePrompt] = useState<string>('');
    const [generateCategory, setGenerateCategory] = useState<string>('');

    const [creatingPost, setCreatingPost] = useState<boolean>(false)
    const [generatingText, setGeneratingText] = useState<boolean>(false)

    const generateButtons = [
        {
            name: 'Generate',
            onPress: () => {
                generateText('Write about')
            }
        },
        {
            name: 'Wite a instagram post',
            onPress: () => {
                generateText('Wite a instagram post')
            }
        },
        {
            name: 'Wite a tweet',
            onPress: () => {
                generateText('Wite a tweet')
            }
        },
        {
            name: 'Wite a facebook post',
            onPress: () => {
                generateText('Wite a facebook post')
            }
        },
        {
            name: 'Wite a linkedin post',
            onPress: () => {
                generateText('Wite a linkedin post')
            }
        }
    ]

    const generateText = async (category:string) => {
        if(generatePrompt == '') {
            Toast.show('Generate prompt cannot be empty!')
            return
        }
        const props = {
            category: category,
            prompt: generatePrompt
        }
        setGeneratingText(true)
        setGenerateCategory(category)
        
        const response = await generateFeedPost(props)
        if(response && response.error)
            Toast.show(response.error)
        else
            setGeneratedText(response.chunks.split('\n\n'))

        setGeneratingText(false)
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(generatedText.join('\n\n'))
        Toast.show('Copied to clipboard!',)
    }

    const postToFeed = async () => {
        if(generatedText.length) {
            setCreatingPost(true)
            const props: ICreatePostProps = {
                title: generatePrompt,
                chunk: generatedText.join('\n\n'),
                category: generateCategory
            }

            const response = await createPost(props)
            console.log(response)
            if(response && response.error){
                Toast.show(response.error)
                setCreatingPost(false)
            } else {
                setCreatingPost(false)
                navigation.navigate('Home', { screen: 'Profile' })
            }
        } else {
            Toast.show('Please generate text first!')
        }

        
    }

    return (
        <StyledView className="flex w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="border border-slate-300 mx-2 rounded-lg h-3/5 relative p-4">
                <StyledScrollView className="mb-3">
                    {
                        generatedText.map((item, index) => (
                            <StyledText className="text-white text-base flex my-1" key={index}>{item}</StyledText>
                        ))
                    }
                </StyledScrollView>

                {/* <StyledText className="text-white text-2xl font-bold mt-4">{generatePrompt}</StyledText> */}
                <StyledView className="absolute -bottom-7 left-0 right-0 flex flex-row items-center justify-between px-3">
                <StyledTouchableOpacity onPress={copyToClipboard}>
                    <Ionicons name={'copy'} size={22} color={'white'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress={postToFeed} disabled={creatingPost}>
                    {creatingPost?
                        <StyledActivityIndicator />
                        :
                        <Ionicons name={'send'} size={22} color={'white'} />
                    }
                </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            <StyledView className="w-full absolute right-0 bottom-2 left-0 px-4 flex items-center justify-center">
                <StyledTextInput className="rounded-2xl w-full px-3 py-1 text-gray-900 border-slate-300 bg-gray-300" placeholder="Write Text" value={generatePrompt} onChange={(e) => setGeneratePrompt(e.nativeEvent.text)} placeholderTextColor={'white'}/>
                <StyledScrollView horizontal={true} className="mt-4">
                    {
                        generateButtons.map((item, index) => {
                            return (
                                <StyledTouchableOpacity className="rounded-3xl w-fit p-3 text-white border-slate-300 border mx-1" onPress={() => item.onPress()} key={index} disabled={generatingText}>
                                    <StyledText className="text-white">{item.name}</StyledText>
                                </StyledTouchableOpacity>
                            )
                        })
                    }
                </StyledScrollView>
            </StyledView>
        </StyledView>
    )
}