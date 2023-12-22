import { AppBar } from "@react-native-material/core"
import { StyledImage, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionCustomStyle,
} from 'react-native-popup-menu';
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export const AppBarComponent = ({ navigation, hasBack }: any) => {
    const { authUser, onLogout } = useAuth();

    return (
        <>
            <AppBar
                title=""
                style={{ backgroundColor: "rgba(36,25,40,1)", elevation: 1, height: 80 }}
                leading={props => (hasBack ? <StyledView className="h-10 w-10 mt-16 ml-2 flex justify-center">
                    <StyledTouchableOpacity onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back" size={24} color={'white'}/>
                    </StyledTouchableOpacity>
                </StyledView> : null)}
                trailing={props => (
                    <>
                        <Menu>
                            <MenuTrigger>
                                <StyledView className="h-8 w-8 bg-slate-700 rounded-full mt-14 mr-4" >
                                    <StyledImage source={{ uri: authUser?.profile ? authUser?.profile : "https://bootdey.com/img/Content/avatar/avatar7.png" }} className="h-full w-full rounded-full" />
                                </StyledView>
                            </MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: { marginTop: 100, backgroundColor: 'rgba(36,25,40,1)' } }}>
                                <MenuOption onSelect={() => navigation.navigate('Guide')} text='Guide' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={() => navigation.navigate('Billing')} text='Billing' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={onLogout} text='Logout' customStyles={menuOptionStyles} />
                                <MenuOption onSelect={() => navigation.navigate('DALLE')} text='DAlle' customStyles={menuOptionStyles} />
                            </MenuOptions>
                        </Menu>
                    </>
                )}
            />


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