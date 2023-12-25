import { StatusBar } from "expo-status-bar"
import { BottomTab } from "../components/core/BottomTab"
import { StyledView } from "../helpers/NativeWind.helper"


export const HomeScreen = () => {
    return (
        <StyledView className="flex w-full h-full">
            <StatusBar style="light" animated={true} />
            <BottomTab />
        </StyledView>
    )
}