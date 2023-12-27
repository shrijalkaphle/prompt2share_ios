import { useEffect, useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledActivityIndicator, StyledScrollView, StyledText, StyledView } from "../helpers/NativeWind.helper"
import { getBillingDetails } from "../services/auth.service"
import Toast from "react-native-root-toast"
import { IBought, IWithdraw } from "../types/models.type"
import { PaymentCard } from "../components/core/PaymentCard"
import { WithdrawCard } from "../components/core/WithdrawCard"

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
                        <StyledText key={index} className={`text-white text-xl font-bold w-1/2 text-center p-2 ${activeTab == tab.id ? 'border-b-2 border-white' : 'border-b border-slate-600'}`} onPress={() => setActiveTab(tab.id)}>{tab.label}</StyledText>
                    ))
                }
            </StyledView>
            {
                pageLoading ?
                    <StyledActivityIndicator size={"large"} className="mt-5"/>
                    :
                    <>
                        <StyledScrollView className={`w-full p-4 ${activeTab == 'token__bought' ? '' : 'hidden'}`}>
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
                        </StyledScrollView>

                        <StyledScrollView className={`w-full p-4 ${activeTab == 'token__withdraw' ? '' : 'hidden'}`}>
                            {
                                withdraws.map((withdraw, index) => (
                                    <WithdrawCard
                                        key={index}
                                        created_at={withdraw.created_at}
                                        amt={withdraw.amount}
                                        status={withdraw.status}
                                        sender_account={withdraw.sender_account}
                                        sender_receipt={withdraw.sender_receipt}
                                        bank_name={withdraw.bank_name}
                                        routing_name={withdraw.routing_number}
                                        account_num={withdraw.account_number}
                                    />
                                ))
                            }
                        </StyledScrollView>
                    </>
            }

        </StyledView>
    )
}