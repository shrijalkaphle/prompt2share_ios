import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper";
import { IUser } from "../../types/models.type";

interface ISearchUserCard {
    user: IUser,
    navigation: any
}

export const SearchUserCard = ({ user, navigation }: ISearchUserCard) => {

    const {name, user_id, profile, level, } = user
    return (
        <StyledTouchableOpacity onPress={() => navigation.navigate('User', { userId: user_id })}>
            <StyledView className="w-40 h-40 bg-white/10 flex items-center justify-center px-6 py-2 m-3 rounded-lg">
                <StyledImage className="w-20 h-20 rounded-full" source={{ uri: profile ? profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} />
                <StyledText className="text-white mt-4 font-bold text-center">{name}</StyledText>
                <StyledText className="text-white text-sm">Level: {level ? level : 0}</StyledText>
            </StyledView>
        </StyledTouchableOpacity>
    )
}