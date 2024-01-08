import { Switch } from "react-native"
import { useState } from "react";
import { StyledText, StyledView } from "../../../helpers/NativeWind.helper";
import { IUser } from "../../../types/models.type";
import { updateBlockStatus } from "../../../services/admin.service";

export const UserDetail = (_user: IUser) => {
    const [user, setUser] = useState<IUser>(_user)
    const { name, email, email_verified_at, token_balance, is_blocked, user_id } = user;


    const [isEnabled, setIsEnabled] = useState(is_blocked ? false : true);

    
    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState);
        const response = await updateBlockStatus({user_id: user_id})
        setUser(response.user)
    };

    const status = () => {
        if (email_verified_at) {
            if(is_blocked) {
                return 'blocked'
            } else {
                return 'active'
            }
        } else {
            return 'un-verified'
        }
    }
    return (
        <StyledView className="bg-white/10 rounded-lg my-1">
            <StyledView className="p-4 flex flex-row justify-between items-center">
                <StyledView>
                <StyledText className="text-white font-bold">{name}</StyledText>
                <StyledText className="text-white text-sm">{email}</StyledText>
                <StyledText className="text-white text-sm">Balance: {token_balance}</StyledText>
                <StyledText className={`text-white text-sm`}>Status: 
                    <StyledText className={`capitalize
                        ${status() == 'un-verified' && 'text-yellow-500'}
                        ${status() == 'active' && 'text-green-500'}
                        ${status() == 'blocked' && 'text-red-500'}
                        `}> {status()} </StyledText>
                </StyledText>
                </StyledView>
                
                <Switch trackColor={{false: '#dc3545', true: '#198754'}} thumbColor={isEnabled ? '#adb5bd' : '#adb5bd'} ios_backgroundColor="#dc3545" onValueChange={toggleSwitch} value={isEnabled} disabled={email_verified_at ? false : true}/>
            </StyledView>
        </StyledView>
    )
}