import { useEffect, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { getBillingDetails } from "../services/auth.service"
import Toast from "react-native-root-toast"
import { IBought, IWithdraw } from "../types/models.type"
import { PaymentCard } from "../components/core/PaymentCard"
import { WithdrawCard } from "../components/core/WithdrawCard"
import { FlatList } from "react-native"

export const BillingScreen = ({ navigation }: any) => {

    const tabs = [
        {
            "label": "Token Bought",
            "id": "token__bought"
        },
        {
            "label": "Token Withdraw",
            "id": "token__withdraw"
        }
    ]
    const [boughts, setBoughts] = useState<IBought[]>([])
    const [withdraws, setWithdraws] = useState<IWithdraw[]>([])
    const [pageLoading, setPageLoading] = useState<boolean>(true)

    const getBillingInfo = async () => {
        const response = await getBillingDetails()
        if (response && response.error) {
            Toast.show(response.error)
            setPageLoading(false)
            return
        }

        const { bought, withdraw } = response
        setBoughts(bought)
        setWithdraws(withdraw)
        setPageLoading(false)
    }
    useEffect(() => {
        getBillingInfo()
    }, [])

    const [activeTab, setActiveTab] = useState<string>('token__bought')

    return (
        <StyledView className="flex w-full h-full bg-background ">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView className="flex flex-row items-center w-full mt-5">
                {
                    tabs.map((tab, index) => (
                        <StyledTouchableOpacity key={index} className={`w-1/2 text-center p-2 border-b-2 flex items-center ${activeTab == tab.id ? 'border-white' : 'border-slate-600'}`} onPress={() => setActiveTab(tab.id)}>
                            <StyledText className={`text-white font-bold`}>{tab.label}</StyledText>
                        </StyledTouchableOpacity>
                        
                    ))
                }
            </StyledView>
            {
                pageLoading ?
                    <StyledActivityIndicator size={"large"} className="mt-5" />
                    :
                    <>
                        {/* <StyledScrollView className={`w-full p-4 ${activeTab == 'token__bought' ? '' : 'hidden'}`}>
                            {
                                boughts.map((bought, index) => (
                                    <PaymentCard
                                        key={index}
                                        date={bought.created_at}
                                        amount={bought.price}
                                        qty={bought.qty}
                                        payment_type={bought.payment_type}
                                    />
                                ))
                            }
                        </StyledScrollView> */}
                        <StyledView>
                            <FlatList
                                data={boughts}
                                renderItem={({ item, index }) => (
                                    <StyledView className={`px-4 mt-1 ${index == boughts.length - 1 ? 'mb-14' : ''} ${activeTab == 'token__bought' ? '' : 'hidden'}`}>
                                        <PaymentCard
                                            key={index}
                                            date={item.created_at}
                                            amount={item.price}
                                            qty={item.qty}
                                            payment_type={item.payment_type}
                                        />
                                    </StyledView>
                                )}
                            />
                        </StyledView>

                        <FlatList
                            data={withdraws}
                            renderItem={({ item, index }) => (
                                <StyledView className={`px-4 mt-1 ${index == withdraws.length - 1 ? 'mb-14' : ''} ${activeTab == 'token__withdraw' ? '' : 'hidden'}`}>
                                    <WithdrawCard
                                        key={index}
                                        {...item}
                                    />
                                </StyledView>
                            )}
                        />
                    </>
            }

        </StyledView>
    )
}