import { Ionicons } from "@expo/vector-icons"
import { StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"

export const FloatingButton = ({ navigation }: any) => {

    const [showCreateModel, setShowCreateModel] = useState<boolean>(false)
    return (
        <>
            <StyledTouchableOpacity className="h-14 w-14 rounded-full absolute bottom-4 right-4 bg-white z-10 flex items-center justify-center"  onPress={() => setShowCreateModel(!showCreateModel)}>
                <Ionicons name={ showCreateModel? 'close' : 'add'} size={22} color={'black'} />
            </StyledTouchableOpacity>

            <StyledView className={`z-10 absolute bottom-[88px] right-4 flex gap-y-4 ${showCreateModel ? '' : 'hidden'}`}>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('CreatePost') }}>
                    <Ionicons name={'text'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('ImageGenerate') }}>
                    <Ionicons name={'image'} size={22} color={'black'} />
                </StyledTouchableOpacity>
            </StyledView>
        </>
    )
}
