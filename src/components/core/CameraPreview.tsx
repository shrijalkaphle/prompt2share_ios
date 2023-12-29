import { StyledActivityIndicator, StyledImage, StyledText, StyledTextInput, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Canvas, RoundedRect, SkiaDomView } from "@shopify/react-native-skia"
import { useRef, useState } from "react"
import Toast from "react-native-root-toast"
import { editImage } from "../../services/openai.service"
import { IGeneratedImage } from "../../screens/ImageGenerate.screen"
import { GalleryView } from "./GalleryView"
import { manipulateAsync } from 'expo-image-manipulator';
import { Platform } from "react-native"

interface ICameraPreview {
    navigation: any
    photo: any
    setPhoto: any
}

interface IPath {
    xAxis: number
    yAxis: number
}

export const CameraPreview = ({ navigation, photo, setPhoto }: ICameraPreview) => {

    const canvasRef = useRef<SkiaDomView>(null)
    const canvasViewRef = useRef(null)
    const [imageGenerating, setImageGenerating] = useState<boolean>(false)
    const [paths, setPaths] = useState<IPath[]>([]);
    const [prompt, setPrompt] = useState<string>('')
    const [generatedImages, setGeneratedImages] = useState<IGeneratedImage[]>([])

    const undoMask = () => {
        if (canvasRef.current) setPaths([])
        Toast.show('Mask cleared')
    }

    const generateImage = async () => {
        if(!prompt) {
            Toast.show('Prompt cannot be empty', {
                backgroundColor: 'red'
            })
            return
        }
        setImageGenerating(true)
        const image = canvasRef.current?.makeImageSnapshot()
        if (!image) {
            Toast.show('Cannot get masked image', {
                containerStyle: {
                    backgroundColor: 'red',
                }
            })
            return
        }

        const bytes = image.encodeToBase64();
        const { base64 } = await manipulateAsync(photo.uri, [], { compress: 1, base64: true })
        const props = {
            prompt: prompt,
            mask: bytes,
            original: base64 ? base64 : ''
        }

        const response = await editImage(props)
        if (response && response.error) {
            Toast.show(response.error)
            return
        }
        setGeneratedImages(response.data)
        setImageGenerating(false)


    }

    const appendMask = (e: any) => {
        const xAxis = e[0][0].x
        const yAxis = e[0][0].y
        setPaths([...paths, { xAxis, yAxis }])
    }

    return (
        <StyledView className="h-full w-full flex items-center bg-background">
            {
                generatedImages.length > 0 ?
                    <StyledView className="w-full mt-10">
                        <GalleryView images={generatedImages} prompt={prompt} navigation={navigation} setImage={setGeneratedImages}/>
                    </StyledView> 
                :
                    <>
                        <StyledView className="w-full flex flex-row items-center justify-center px-4 mt-16">
                            <StyledTextInput className={`text-white bg-white/10 rounded-lg mt-1 px-4 w-full ${Platform.OS === 'ios' ? 'py-4' : 'py-2'}`}
                                placeholder="Enter prompt" placeholderTextColor={"white"} onChange={(e) => setPrompt(e.nativeEvent.text)} value={prompt} returnKeyType="done" autoCapitalize="none"/>
                        </StyledView>
                        <StyledView className="w-full flex flex-row items-center justify-center px-4">
                            <StyledTouchableOpacity className="w-full bg-white/10 py-3 rounded-lg flex items-center justify-center mt-1" onPress={generateImage} >
                                {
                                    imageGenerating ? <StyledActivityIndicator /> : <StyledText className="text-white font-bold my-0.5">Generate</StyledText>
                                }
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledText className="my-1 text-white text-xs font-bold text-center px-4">The prompt should describe the full new image, not just the erased area.</StyledText>
                        <StyledView className="w-full flex flex-row items-center justify-between px-4">
                            <StyledTouchableOpacity className="border border-slate-300 py-2 px-4 rounded-full" onPress={() => setPhoto(undefined)}>
                                <StyledText className="text-white">Select another</StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity className="border border-slate-300 py-2 px-4 rounded-full" onPress={undoMask}>
                                <StyledText className="text-white">Undo Mask</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="w-full p-2 relative h-2/3 -mt-1" ref={canvasViewRef}>
                            <StyledImage source={{ uri: photo.uri }} className="w-full h-full rounded-2xl" />
                            <Canvas style={{ flex: 1, width: '100%', aspectRatio: 1, backgroundColor: 'transparent', overflow: 'hidden', position: 'absolute', top: 8, left: 8, right: 8, bottom: 8,  }} onTouch={appendMask} ref={canvasRef} mode="continuous" id="canvas">
                                {paths.map((path, index) => (
                                    <RoundedRect key={index} x={path.xAxis} y={path.yAxis} width={20} height={20} color="#ffeeff" r={25} />
                                ))}
                            </Canvas>
                        </StyledView>
                        
                    </>
            }
        </StyledView>
    )
}