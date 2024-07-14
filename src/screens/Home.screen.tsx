import { StatusBar } from "expo-status-bar"
import { BottomTab } from "../components/core/BottomTab"
import { StyledView } from "../helpers/NativeWind.helper"
import { FloatingButton } from "../components/core/FloatingButton"


export const HomeScreen = ({navigation}: any) => {
    return (
        <StyledView className="flex w-full h-full">
            <FloatingButton navigation={navigation} />
            <StatusBar style="light"/>
            <BottomTab />
        </StyledView>
    )
}