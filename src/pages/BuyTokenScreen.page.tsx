import { StyledText, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent";

export const BuyTokenScreenPage = ({ navigation }: any) => {
    
    return (
        <StyledView className="flex w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true}/>
            <StyledView>
                <StyledText className="text-white text-2xl font-bold">Coming Soon</StyledText>
            </StyledView>
        </StyledView>
    )
}