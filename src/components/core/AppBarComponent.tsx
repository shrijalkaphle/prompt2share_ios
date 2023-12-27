import { StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionCustomStyle,
} from 'react-native-popup-menu';
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { WithdrawModal } from "./WithdrawModal";
import { ReportProblemModel } from "./ReportProblemModel";

export const AppBarComponent = ({ navigation, hasBack, hasTitle, title }: any) => {
    const { authUser, onLogout } = useAuth();

    const [withdrawModalState, setWithdrawModalState] = useState<boolean>(false);
    const [reportProblemModalState, setReportProblemModalState] = useState<boolean>(false);

    return (
        <>
            <StyledView className="w-full h-24 flex flex-row items-end justify-center p-4 bg-background">
                <StyledView className="w-full flex flex-row items-center">
                    <StyledView className="w-1/3">
                        {hasBack &&
                            <StyledTouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={18} color="white" />
                            </StyledTouchableOpacity>
                        }
                    </StyledView>
                    <StyledView className="w-1/3 flex items-center justify-center">
                        {hasTitle &&
                            <StyledText className="text-white text-lg font-bold">{title}</StyledText>
                        }

                    </StyledView>
                    <StyledView className="w-1/3 flex items-end justify-center">
                        <Menu>
                            <MenuTrigger>
                                <StyledView className="h-8 w-8 rounded-full bg-red-300">
                                    <Image source={{ uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} className="w-full h-full rounded-full" />
                                </StyledView>
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: { marginTop: 50, backgroundColor: 'rgba(36,25,40,1)' } }}>
                                <MenuOption onSelect={() => navigation.navigate('Guide')} text='Guide' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={() => navigation.navigate('Billing')} text='Billing' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={() => navigation.navigate('Circle')} text='Circle' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={() => setReportProblemModalState(true)} text='Report Problem' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={() => setWithdrawModalState(true)} text='Withdraw' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={onLogout} text='Logout' customStyles={menuOptionStyles} />
                            </MenuOptions>
                        </Menu>
                    </StyledView>
                </StyledView>
            </StyledView>

            <WithdrawModal modelState={withdrawModalState} setModelState={setWithdrawModalState} availableAmount={authUser?.total_price} />
            <ReportProblemModel modelState={reportProblemModalState} setModelState={setReportProblemModalState} />
        </>

    )
}

const menuOptionStyles: MenuOptionCustomStyle = {
    optionWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    optionText: {
        color: 'white',
    }
}