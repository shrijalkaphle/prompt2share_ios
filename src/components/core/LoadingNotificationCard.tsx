import Toast from "react-native-root-toast";
import { useAuth } from "../../contexts/AuthContext";
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useEffect } from "react";


export const LoadingNotificationCard = () => {

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
        <StyledView className={`w-full p-4 rounded-lg border-b border-white/10 flex flex-row gap-x-4 items-center`}>
            <Animated.View className="h-10 w-10 bg-slate-700 rounded-full" style={reanimatedStyle}></Animated.View>
            <Animated.View className="h-3 w-2/3 rounded-full bg-slate-700" style={reanimatedStyle}></Animated.View>
        </StyledView>
    )
}