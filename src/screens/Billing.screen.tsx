import { useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledScrollView, StyledText, StyledView } from "../helpers/NativeWind.helper"

export const BillingScreen = ({ navigation }: any) => {

    const tabs = [
        {
            "label": "Token Bought",
            "id": "token__bought"
        },
        {
            "label": "Token Withdraw",
            "id": "token__withdraw"
        }
    ]

    const [activeTab, setActiveTab] = useState<string>('token__bought')

    return (
        <StyledView className="flex w-full h-full bg-background ">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-row items-center w-full mt-5">
                {
                    tabs.map((tab, index) => (
                        <StyledText key={index} className={`text-white text-2xl font-bold w-1/2 text-center p-2 ${activeTab == tab.id ? 'border-b-[4px] border-white' : 'border-b border-slate-600'}`} onPress={() => setActiveTab(tab.id)}>{tab.label}</StyledText>
                    ))
                }
            </StyledView>
            <StyledScrollView className={`w-full p-4 ${activeTab == 'token__bought' ? '' : 'hidden'}`}>
                <StyledView className="w-full bg-white/10 p-4 flex flex-row justify-between">
                    <StyledText className="text-white text-2xl font-bold">date</StyledText>
                    <StyledText className="text-white text-xl font-bold">coin</StyledText>
                    <StyledText className="text-white text-2xl font-bold">amount</StyledText>
                </StyledView>
            </StyledScrollView>

            <StyledScrollView className={`w-full p-4 ${activeTab == 'token__withdraw' ? '' : 'hidden'}`}>
                <StyledView className="w-full bg-white/10 p-4">
                    <StyledText className="text-white text-2xl font-bold">Coming Soon</StyledText>
                </StyledView>
            </StyledScrollView>

        </StyledView>
    )
}