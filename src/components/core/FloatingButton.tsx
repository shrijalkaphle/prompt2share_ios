import { Ionicons } from "@expo/vector-icons"
import { StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import { useState } from "react"

export const FloatingButton = ({ navigation }: any) => {

    const [showCreateModel, setShowCreateModel] = useState<boolean>(false)
    return (
        <>
            <StyledTouchableOpacity className="h-14 w-14 rounded-full absolute bottom-[15px] bg-white z-10 flex items-center justify-center" onPress={() => setShowCreateModel(!showCreateModel)}>
                <Ionicons name={showCreateModel ? 'close' : 'add'} size={22} color={'black'} />
            </StyledTouchableOpacity>

            <StyledView className={`z-10 fixed inset-0 bottom-[70px] w-full h-full flex gap-y-4 items-center justify-end pb-2 ${showCreateModel ? '' : 'hidden'}`}>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('Generate') }}>
                    <Ionicons name={'language'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('CreatePost') }}>
                    <Ionicons name={'text'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('ImageGenerate') }}>
                    <Ionicons name={'image'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('Camera') }}>
                    <Ionicons name={'camera'} size={22} color={'black'} />
                </StyledTouchableOpacity>
            </StyledView>
        </>
    )
}
