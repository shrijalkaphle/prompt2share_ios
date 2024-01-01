import { useEffect, useState } from "react"
import { IUser } from "../types/models.type"
import { getCircleUsers } from "../services/user.service"
import Toast from "react-native-root-toast"
import { StyledActivityIndicator, StyledText, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { SearchUserCard } from "../components/core/SearchUserCard"

export const CircleScreen = ({ navigation, params }: any) => {

    const [circles, setCircles] = useState<IUser[]>([])
    const [pageLoading, setPageLoading] = useState<boolean>(true)

    const getData = async () => {
        const response = await getCircleUsers()
        if (response && response.error) {
            Toast.show(response.message)
            return
        }
        setCircles(response)
        setPageLoading(false)
    }

    useEffect(() => {
        getData()
    }, [params])

    return (
        <StyledView className="bg-background w-full h-full p-4">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledText className="text-white font-bold text-lg">Circles</StyledText>

            {
                pageLoading ? <StyledView className="mt-10"><StyledActivityIndicator size={"large"} /></StyledView> :

                    <>
                        <StyledText className="flex flex-wrap items-center justify-center">
                            {
                                circles.map((user, index) => <StyledView key={index} className="w-1/2 flex items-center justify-center"><SearchUserCard user={user} navigation={navigation} /></StyledView>)
                            }
                        </StyledText>
                        {
                            circles.length == 0 && <StyledView className="flex items-center justify-center h-16 w-full"><StyledText className="text-white font-bold text-lg">No Followed User</StyledText></StyledView>
                        }
                    </>
            }
            <StyledText className="flex flex-wrap items-center justify-center">

            </StyledText>
        </StyledView>
    )
}