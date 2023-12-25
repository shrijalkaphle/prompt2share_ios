import { AppBar } from "@react-native-material/core"
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
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

export const AppBarComponent = ({ navigation, hasBack, hasTitle, title }: any) => {
    const { authUser, onLogout } = useAuth();

    return (
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
                            <MenuOption onSelect={onLogout} text='Logout' customStyles={menuOptionStyles} />
                        </MenuOptions>
                    </Menu>
                </StyledView>
            </StyledView>
        </StyledView>

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