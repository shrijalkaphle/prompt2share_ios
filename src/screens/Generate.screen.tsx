import { useEffect, useState } from "react";
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledScrollView, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-root-toast";
import { generateFeedPost, getPrompts } from "../services/openai.service";
import { ICreatePostProps } from "../types/services/post.type";
import { createPost } from "../services/post.service";
import { IPrompt } from "../types/models.type";
import { Keyboard, Platform } from "react-native";

export const GenerateScreen = ({ navigation }: any) => {

    const [generatedText, setGeneratedText] = useState<string[]>([]);
    const [generatePrompt, setGeneratePrompt] = useState<string>('');
    const [generateCategory, setGenerateCategory] = useState<string>('');

    const [creatingPost, setCreatingPost] = useState<boolean>(false)
    const [generatingText, setGeneratingText] = useState<boolean>(false)

    const [prompts, setPrompts] = useState<IPrompt[]>([])
    const [filteredPrompts, setFilteredPrompts] = useState<IPrompt[]>([])
    const [filterPrompt, setFilterPrompt] = useState<string>('')

    const filter = (filter: string) => {
        setFilterPrompt(filter)
        setFilteredPrompts(prompts.filter((prompt) => prompt.name.toLowerCase().includes(filter.toLowerCase())))
    }
    const generateText = async (category: string) => {
        Keyboard.dismiss()
        if (generatePrompt == '') {
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
        if (response && response.error)
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
        if (generatedText.length) {
            setCreatingPost(true)
            const props: ICreatePostProps = {
                title: generatePrompt,
                chunk: generatedText.join('\n\n'),
                category: generateCategory
            }

            const response = await createPost(props)
            if (response && response.error) {
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

    useEffect(() => {
        (async () => {
            const response = await getPrompts()
            if (response && response.error) {
                Toast.show(response.error)
                return
            }
            setPrompts(response.prompts)
            setFilteredPrompts(response.prompts)
        })()
    }, [])

    return (
        <StyledView className="w-full h-full bg-background">
            <StyledView className="flex">
                <StyledView className="w-full px-4 flex items-center justify-center mb-10">
                    <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 w-full ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`} placeholder="Enter your prompt" value={generatePrompt} onChange={(e) => setGeneratePrompt(e.nativeEvent.text)} placeholderTextColor={'white'} />
                    <StyledTouchableOpacity className="w-full bg-white/10 p-4 rounded-full flex items-center justify-center my-2" onPress={() => generateText('Write about')} disabled={generatingText}>
                        {generatingText ? <StyledActivityIndicator /> : <StyledText className="text-white">Generate</StyledText>}
                    </StyledTouchableOpacity>
                    <StyledView className={`w-full ${generatingText ? 'hidden' : ''}`}>
                        <StyledTextInput className="w-full px-3 py-2 text-white border-b border-slate-300 " placeholder="Search prompt" value={filterPrompt} onChange={(e) => filter(e.nativeEvent.text)} placeholderTextColor={'white'} />
                        <StyledScrollView horizontal={true} className="mt-4">
                            {
                                filteredPrompts.map((prompt, index) => {
                                    return (
                                        <StyledTouchableOpacity className="rounded-3xl w-fit p-3 text-white border-slate-300 border mx-1" onPress={() => generateText(prompt.name)} key={index} disabled={generatingText}>
                                            <StyledText className="text-white">{prompt.name}</StyledText>
                                        </StyledTouchableOpacity>
                                    )
                                })
                            }
                        </StyledScrollView>
                    </StyledView>
                </StyledView>
                <StyledView className="border border-slate-300 mx-2 rounded-lg h-1/2 relative p-4 mt-4">
                    <StyledScrollView className="mb-3">
                        {
                            generatedText.map((item, index) => (
                                <StyledText className="text-white text-base flex my-1" key={index}>{item}</StyledText>
                            ))
                        }
                    </StyledScrollView>
                    <StyledView className="absolute -top-7 left-0 right-0 flex flex-row items-center justify-between px-3">
                        <StyledTouchableOpacity onPress={copyToClipboard}>
                            <Ionicons name={'copy'} size={22} color={'white'} />
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity onPress={postToFeed} disabled={creatingPost}>
                            {creatingPost ?
                                <StyledActivityIndicator />
                                :
                                <Ionicons name={'send'} size={22} color={'white'} />
                            }
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
            {/* <StyledView className="w-full px-4 flex items-center justify-center mb-10">
                <StyledTextInput className={`text-white bg-white/10 rounded-lg my-2 px-4 w-full ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`} placeholder="Enter your prompt" value={generatePrompt} onChange={(e) => setGeneratePrompt(e.nativeEvent.text)} placeholderTextColor={'white'} />
                <StyledTouchableOpacity className="w-full bg-white/10 p-4 rounded-full flex items-center justify-center my-2" onPress={() => generateText('Write about')} disabled={generatingText}>
                    {generatingText ? <StyledActivityIndicator /> : <StyledText className="text-white">Generate</StyledText>}
                </StyledTouchableOpacity>
                <StyledView className={`w-full ${generatingText ? 'hidden' : ''}`}>
                    <StyledTextInput className="w-full px-3 py-2 text-white border-b border-slate-300 " placeholder="Search prompt" value={filterPrompt} onChange={(e) => filter(e.nativeEvent.text)} placeholderTextColor={'white'} />
                    <StyledScrollView horizontal={true} className="mt-4">
                        {
                            filteredPrompts.map((prompt, index) => {
                                return (
                                    <StyledTouchableOpacity className="rounded-3xl w-fit p-3 text-white border-slate-300 border mx-1" onPress={() => generateText(prompt.name)} key={index} disabled={generatingText}>
                                        <StyledText className="text-white">{prompt.name}</StyledText>
                                    </StyledTouchableOpacity>
                                )
                            })
                        }
                    </StyledScrollView>
                </StyledView>
            </StyledView> */}
        </StyledView>
    )
}