import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Ref, RefObject, useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet,Text, Button, GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView, gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { StyledSafeAreaView, StyledText, StyledView } from '../../helpers/NativeWind.helper';


export const ShareModal = gestureHandlerRootHOC(() => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50', '70%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
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
