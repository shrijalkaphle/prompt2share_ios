import { AppBarComponent } from "../components/core/AppBarComponent"
import { BottomTab } from "../components/core/BottomTab"
import { FloatingButton } from "../components/core/FloatingButton"
import { StyledText, StyledView } from "../helpers/NativeWind.helper"


export const HomeScreen = ({ navigation }: any) => {
    return (
        <StyledView className="flex w-full h-full">
            <AppBarComponent navigation={navigation}/>
            {/* <FloatingButton navigation={navigation}/> */}
            <BottomTab />
        </StyledView>
    )
}