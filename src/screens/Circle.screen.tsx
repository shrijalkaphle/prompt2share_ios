import { useEffect, useState } from "react"
import { IUser } from "../types/models.type"
import { getCircleUsers } from "../services/user.service"
import Toast from "react-native-root-toast"
import { StyledText, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { SearchUserCard } from "../components/core/SearchUserCard"

export const CircleScreen = ({ navigation }: any) => {

    const [circles, setCircles] = useState<IUser[]>([])

    const getData = async () => {
        const response = await getCircleUsers()
        if (response && response.error) {
            Toast.show(response.message)
            return
        }
        setCircles(response)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <StyledView className="bg-background w-full h-full p-4">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledText className="text-white font-bold text-lg">Circles</StyledText>
            <StyledText className="flex flex-wrap items-center justify-center">
                {
                    circles.map((user, index) => <StyledView key={index} className="w-1/2 flex items-center justify-center"><SearchUserCard user={user} navigation={navigation} /></StyledView>)
                }
            </StyledText>
        </StyledView>
    )
}