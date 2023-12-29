import { Modal } from "react-native"
import { StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { deletePostById } from "../../services/post.service"
import Toast from "react-native-root-toast"


interface IDeleteModal {
    modelState: boolean
    setModelState: (value: boolean) => void
    postId: number
    removePost: (value: number) => void
}

export const DeleteModal = ({ modelState, setModelState, postId, removePost }: IDeleteModal) => {

    const triggerDelete = async () => {
        setModelState(false)
        
        const response = await deletePostById(postId)
        if(response && response.error) {
            Toast.show(response.message, {
                backgroundColor: 'red',
            })
            return
        }
        Toast.show(response.message)
        removePost(postId)
    }

    return (
        <Modal
            visible={modelState}
            animationType="slide"
            transparent={true}>
            <StyledView className="h-full flex items-center justify-center bg-black/60 p-4">

                <StyledView className="w-3/4 flex items-center bg-background rounded-3xl">
                    <StyledView className="p-4 py-6">
                        <StyledText className="text-white font-bold text-lg text-center">Are you sure?</StyledText>
                        <StyledText className="text-white text-center mt-6">Your post and all associated trophy and rewards will be deleted. This process cannot be reverted.</StyledText>
                    </StyledView>

                    <StyledView className="w-full border-t border-white/10 mt-1 flex flex-row items-center">
                        <StyledTouchableOpacity className="w-1/2 p-4" onPress={() => setModelState(false)}>
                            <StyledText className="text-white font-bold text-center">Cancel</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity className="w-1/2 p-4 border-l border-white/10" onPress={triggerDelete}>
                            <StyledText className="text-white font-bold text-center">Delete</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </Modal>
    )
}