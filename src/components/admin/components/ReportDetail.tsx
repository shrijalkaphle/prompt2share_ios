import moment from "moment";
import { StyledText, StyledView } from "../../../helpers/NativeWind.helper";
import { IReport } from "../../../types/models.type";

export const ReportDetail = ({name, email, title, created_at, message}:IReport) => {

    return (
        <StyledView className="bg-white/10 rounded-lg my-1 px-4">
            <StyledView className="pt-4 pb-1 flex flex-row justify-between items-center border-b border-slate-600">
                <StyledView>
                    <StyledText className="text-white"><StyledText className=" font-bold">{name}</StyledText> . {email}</StyledText>
                    <StyledText className="text-white text-xs">{moment(created_at).format('MMM D, YYYY')}</StyledText>
                </StyledView>
                <StyledView>
                    <StyledText className="text-white text-xs"></StyledText>
                </StyledView>
            </StyledView>
            <StyledView className="py-4">
                <StyledText className="text-white font-bold">{title}</StyledText>
                <StyledText className="text-white">{message}</StyledText>
            </StyledView>
        </StyledView>
    )
}