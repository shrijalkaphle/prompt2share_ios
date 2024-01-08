import moment from "moment";
import { StyledText, StyledTouchableOpacity, StyledView } from "../../../helpers/NativeWind.helper";
import { IPost } from "../../../types/models.type";
import { Ionicons } from "@expo/vector-icons";
import { deletePostByAdmin } from "../../../services/admin.service";
import Toast from "react-native-root-toast";

interface IFeedDetail {
    post: IPost
    removePost: (postId: string) => void
}

export const FeedDetail = ({post, removePost}:IFeedDetail) => {

    const {id, user, title, created_at,} = post
    const deletePost = async (id: string) => {

        const response = await deletePostByAdmin(id)
        if(response && response.error) {
            Toast.show(response.message)
            return
        }
        Toast.show(response.message)
        removePost(id)
    }

    return (
        <StyledView className="bg-white/10 rounded-lg my-1 px-4">
            <StyledView className="pt-4 pb-1 flex flex-row justify-between border-b border-slate-600">
                <StyledView>
                    <StyledText className="text-white"><StyledText className=" font-bold">{user?.name}</StyledText> . {user?.email}</StyledText>
                    <StyledText className="text-white text-xs">{moment(created_at).format('MMM D, YYYY')}</StyledText>
                </StyledView>
                <StyledView>
                    <StyledTouchableOpacity>
                        <Ionicons name="trash" size={14} color="white" onPress={() => deletePost(id)}/>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            <StyledView className="py-4">
                <StyledText className="text-white font-bold">{title}</StyledText>
            </StyledView>
        </StyledView>
    )
}