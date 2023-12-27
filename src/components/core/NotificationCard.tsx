import Toast from "react-native-root-toast";
import { useAuth } from "../../contexts/AuthContext";
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"

interface INotificationCardProps {
    message: string
    is_read: boolean
}

export const NotificationCard = ({ message, is_read }: INotificationCardProps) => {

    const markAsRead = () => {
        Toast.show('marked as read')
    }

    const { authUser } = useAuth();
    return (
        // <StyledTouchableOpacity className={`w-full p-4 rounded-lg border-b border-white/10 flex flex-row gap-x-4 items-center ${is_read ? '' : 'bg-white/10'}`} onPress={markAsRead}>
        //     <StyledView className="h-10 w-10 bg-slate-700 rounded-full" >
        //         <StyledImage source={{ uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} className="h-full w-full rounded-full" />
        //     </StyledView>
        //     <StyledText className={`text-white text-lg ${is_read ? 'font-medium' : 'font-semibold'} `}>{message}</StyledText>
        // </StyledTouchableOpacity>
        <StyledView className="flex flex-row items-center p-4">
            <StyledView className="h-10 w-10 bg-slate-700 rounded-full " >
                <StyledImage source={{ uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} className="h-full w-full rounded-full" />
            </StyledView>
            <StyledText className={`text-white ml-4 ${is_read ? 'font-medium' : 'font-semibold'} `}>{message}</StyledText>
        </StyledView>
    )
}