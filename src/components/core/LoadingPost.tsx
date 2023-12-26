import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { StyledView } from "../../helpers/NativeWind.helper"
import { useEffect } from "react"

export const LoadingPost = () => {
    const progress = useSharedValue(1)

    const reanimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [0, 1], [1, 0.3])
        return {
            opacity: opacity,
            // transform: [{ scale }]
        }
    })

    useEffect(() => {
        progress.value = withRepeat(withTiming(0, { duration: 1000, }), -1, true)
    }, [])

    return (
        <StyledView className="my-2 bg-white/10 rounded-lg p-4" >
            <Animated.View className="flex flex-row gap-x-4" style={reanimatedStyle}>
                <StyledView className="h-10 w-10 rounded-full bg-white/10"></StyledView>
                <StyledView className="h-10 w-2/3">
                    <StyledView className="text-lg font-bold text-white bg-white/10 w-full h-2 rounded-lg mt-1"></StyledView>
                    <StyledView className="text-lg font-bold text-white bg-white/10 w-2/3 h-2 rounded-lg mt-3"></StyledView>
                </StyledView>
            </Animated.View>
            <Animated.View className="my-4" style={reanimatedStyle}>
                <StyledView className="text-lg font-bold text-white bg-white/10 w-full h-2 rounded-lg mt-3"></StyledView>
                <StyledView className="text-lg font-bold text-white bg-white/10 w-full h-2 rounded-lg mt-3"></StyledView>
                <StyledView className="text-lg font-bold text-white bg-white/10 w-2/3 h-2 rounded-lg mt-3"></StyledView>

                <StyledView className="text-lg font-bold text-white bg-white/10 w-full h-2 rounded-lg mt-12"></StyledView>
                <StyledView className="text-lg font-bold text-white bg-white/10 w-full h-2 rounded-lg mt-3"></StyledView>
                <StyledView className="text-lg font-bold text-white bg-white/10 w-2/3 h-2 rounded-lg mt-3"></StyledView>
            </Animated.View>
        </StyledView>
    )
}