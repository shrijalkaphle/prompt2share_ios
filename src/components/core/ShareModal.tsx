import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Ref, RefObject, useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IShareModal {
    ref: RefObject<BottomSheetMethods>
}

export const ShareModal = ({ref} : IShareModal) => {
    const snapPoints = useMemo(() => ['50', '70%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleClosePress = () => {
        ref.current?.close();
    }

    const handleOpenPress = () => {
        ref.current?.expand();
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </GestureHandlerRootView >
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });