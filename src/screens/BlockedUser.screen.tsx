import { useEffect, useState } from "react"
import { IUser } from "../types/models.type"
import { blockUser, blockUserList } from "../services/user.service"
import Toast from "react-native-root-toast"
import { StyledActivityIndicator, StyledImage, StyledText, StyledView } from "../helpers/NativeWind.helper"
import { AppBarComponent } from "../components/core/AppBarComponent"

export const BlockedUserScreen = ({ navigation,params }: any) => {

    const [blocked, setBlocked] = useState<IUser[]>([])
    const [pageLoading, setPageLoading] = useState<boolean>(true)

    const getData = async () => {
        const response = await blockUserList()
        if (response && response.error) {
            Toast.show(response.message)
            return
        }
        setBlocked(response.blocked)
        setPageLoading(false)
    }

    useEffect(() => {
        getData()
        navigation.addListener('focus', () => {
            setPageLoading(true)
            getData()
        });
    }, [params])

    const unblockUser = async (userId: string) => {
        const response = await blockUser({
            blockedUserId: parseInt(userId)
        })
        if (response && response.error) {
            Toast.show(response.message)
            return
        }
        
        setBlocked(blocked.filter((block: IUser) => parseInt(block.user_id) != parseInt(userId)))
    }

    return (
        <StyledView className="bg-background w-full h-full p-4">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledText className="text-white font-bold text-lg">Blocked User</StyledText>
            {
                pageLoading ? <StyledView className="mt-10"><StyledActivityIndicator size={"large"} /></StyledView> :

                    <>
                        <StyledText className="flex flex-wrap items-center justify-center">
                            {
                                blocked.map((user, index) =>
                                    <StyledView key={index} className="w-1/2 flex items-center justify-center">
                                        <StyledView className="w-40 h-44 bg-white/10 flex items-center justify-center px-6 py-2 m-3 rounded-lg">
                                            <StyledImage className="w-20 h-20 rounded-full" source={{ uri: user.profile ? user.profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} />
                                            <StyledText className="text-white mt-4 font-bold text-center">{user.name}</StyledText>
                                            <StyledText className="text-primary font-bold text-center mt-4 underline" onPress={() => unblockUser(user.user_id)}>Unblock</StyledText>
                                        </StyledView>
                                    </StyledView>
                                )
                            }
                        </StyledText>
                        {
                            blocked.length == 0 && <StyledView className="flex items-center justify-center h-16 w-full"><StyledText className="text-white font-bold text-lg">No Blocked User</StyledText></StyledView>
                        }
                    </>
            }
        </StyledView>
    )
}