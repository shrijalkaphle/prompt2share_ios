import { useEffect } from "react"
import { StyledImage, StyledText, StyledView } from "../../helpers/NativeWind.helper"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { useAuth } from "../../contexts/AuthContext"
import moment from "moment"


const AnimatedView = Animated.View
export const PostProcessing = ({post}:any) => {
    const { authUser } = useAuth();
    const progress = useSharedValue(1)

    const reanimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [0, 1], [1, 0.3])
        return {
            opacity: opacity,
        }
    })

    const dateFormat = () => {
        return moment(post.created_at).format('MMM D, YYYY');
    }

    useEffect(() => {
        progress.value = withRepeat(withTiming(0, { duration: 1000, }), -1, true)
    }, [])
    
    return (
        <StyledView className="w-full bg-white/10 py-2 px-4 rounded-lg">
            <StyledView className="flex flex-row justify-between">
                    <StyledView className="flex flex-row">
                        <StyledImage source={{ uri: authUser?.profile ? authUser?.profile : 'https://bootdey.com/img/Content/avatar/avatar7.png' }} className="h-10 w-10 rounded-full" />
                        <StyledView className="ml-4">
                            <StyledText className="text-lg font-base text-white">{authUser?.name}</StyledText>
                            <StyledText className="text-xs font-bold text-white">{dateFormat()}</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            <StyledView className="my-2">
                <AnimatedView className="w-full h-2 bg-white/10 my-2 rounded-2xl" style={reanimatedStyle}></AnimatedView>
                <AnimatedView className="w-full h-2 bg-white/10 my-2 rounded-2xl" style={reanimatedStyle}></AnimatedView>
            </StyledView>
        </StyledView>
    )
}