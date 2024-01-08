import { useEffect, useState } from "react"
import { ISecurity } from "../../types/models.type"
import { getSecurityDetail } from "../../services/admin.service"
import Toast from "react-native-root-toast"
import { StyledActivityIndicator, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { SecurityEditModal } from "./components/SecurityEdit.modal"



export const SecurityList = () => {
    const [security, setSecurity] = useState<ISecurity>()
    const [editModal, setEditModal] = useState<boolean>(false)
    const [pageLoading, setPageLoading] = useState<boolean>(true)

    const getDetail = async () => {
        const response = await getSecurityDetail()
        if (response && response.error) {
            Toast.show(response.message)
            return
        }
        const data = {
            profile_rating: response.profile_rating.toString(),
            problem_report: response.problem_report.toString(),
            post: response.post.toString(),
            generate: response.generate.toString(),
            id: response.id.toString()
        }
        setSecurity(data)
        setPageLoading(false)
    }

    useEffect(() => {
        getDetail()
    }, [])
    return (
        <StyledView className="p-4">
            {
                pageLoading ? <StyledActivityIndicator /> :
                    <>
                        <StyledTouchableOpacity className="p-2 bg-white/10 rounded-lg flex items-center justify-center flex-row mb-4" onPress={() => setEditModal(true)}>
                            <Ionicons name="create-outline" size={18} color="white" />
                            <StyledText className="text-white">Edit</StyledText>
                        </StyledTouchableOpacity>

                        <StyledView className="mt-2 bg-white/10 p-4 flex items-center flex-row justify-between rounded-lg">
                            <StyledText className="text-white">Limit Profile Rating per day</StyledText>
                            <StyledText className="text-white font-bold">{security?.profile_rating}</StyledText>
                        </StyledView>
                        <StyledView className="mt-2 bg-white/10 p-4 flex items-center flex-row justify-between rounded-lg">
                            <StyledText className="text-white">Limit report problem per day</StyledText>
                            <StyledText className="text-white font-bold">{security?.problem_report}</StyledText>
                        </StyledView>
                        <StyledView className="mt-2 bg-white/10 p-4 flex items-center flex-row justify-between rounded-lg">
                            <StyledText className="text-white">Limit Post per day</StyledText>
                            <StyledText className="text-white font-bold">{security?.post}</StyledText>
                        </StyledView>
                        <StyledView className="mt-2 bg-white/10 p-4 flex items-center flex-row justify-between rounded-lg">
                            <StyledText className="text-white">Limit Generates per day</StyledText>
                            <StyledText className="text-white font-bold">{security?.generate}</StyledText>
                        </StyledView>
                        <SecurityEditModal modelState={editModal} setModelState={setEditModal} security={security} setSecurity={setSecurity} />
                    </>
            }
        </StyledView>
    )
}