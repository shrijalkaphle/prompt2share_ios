import { StyledImage, StyledText, StyledView } from "../../helpers/NativeWind.helper";
import { IUser } from "../../types/models.type";

export const SearchUserCard = ({ name, level, profile}: IUser) => {
    return (
        <StyledView className="w-fit h-fit bg-white/10 flex items-center justify-center px-6 py-2 mx-3 rounded-lg">
            <StyledImage className="w-20 h-20 rounded-full" source={{ uri: profile ? profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} />
            <StyledText className="text-white mt-4 text-lg font-bold">{name}</StyledText>
            <StyledText className="text-white">Level: {level}</StyledText>
        </StyledView>
    )
}