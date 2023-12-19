import { ResizeMode, Video } from "expo-av"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledText, StyledView } from "../helpers/NativeWind.helper"
import { useRef, useState } from "react"

export const GuideScreen = ({ navigation }: any) => {

    const video = useRef(null)
    const [status, setStatus] = useState({});

    return (
        <StyledView className="flex w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex items-center">
                <StyledText className="text-white text-2xl font-bold mt-4">App Guide</StyledText>
                <Video
                    ref={video}
                    style={{ flex: 1, alignSelf: 'stretch', width: '100%', height: 300, backgroundColor: '#000' }}
                    // className="w-full h-64 rounded-lg flex"
                    source={{
                        uri: 'https://www.prompttoshare.com/static/guide.mp4',
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                
            </StyledView>
        </StyledView>
    )
}