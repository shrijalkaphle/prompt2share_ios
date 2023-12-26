import { Modal } from "react-native"
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image';

export const ImageModel = ({ modelState, setModelState, image }: any) => {
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
        <Modal
            visible={modelState}
            animationType="slide"
            transparent={true}>
                <StyledView className="h-full flex items-center bg-black/90 p-4">
                    <StyledView className="w-full flex items-end justify-end mt-4">
                        <StyledTouchableOpacity onPress={() => setModelState(false)}>
                            <Ionicons name="close" size={24} color="white"/>
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledView className="w-full flex items-center justify-center">
                    <Image source={image} style={{ width: '100%', height: '80%',borderRadius: 10 }} placeholder={blurhash} transition={500} contentFit="contain"/>
                    </StyledView>
                </StyledView>
            </Modal>
    )
}