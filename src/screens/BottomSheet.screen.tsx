import { useCallback, useMemo, useRef } from "react"
import { StyledSafeAreaView, StyledText, StyledView } from "../helpers/NativeWind.helper"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import {  gestureHandlerRootHOC } from "react-native-gesture-handler"
import { Button, Text } from "react-native"

export const BottomSheetScreen = gestureHandlerRootHOC(() => {
    const snapPoints = useMemo(() => ['10', '25', '50', '70%'], [])
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <BottomSheetModalProvider>
            <StyledSafeAreaView className="flex items-center justify-center h-full mt-10 bg-slate-400">
                <StyledText>BottomSheet</StyledText>
                <Button
                    onPress={handlePresentModalPress}
                    title="Present Modal"
                    color="black"
                />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <StyledView>
                        <Text>Awesome 🎉</Text>
                    </StyledView>
                </BottomSheetModal>
                
            </StyledSafeAreaView>
        </BottomSheetModalProvider>
    )
})