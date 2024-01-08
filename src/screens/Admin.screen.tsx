import { useState } from "react"
import { AppBarComponent } from "../components/core/AppBarComponent"
import { StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../helpers/NativeWind.helper"
import { UserList } from "../components/admin/User.list";
import { OrderList } from "../components/admin/Order.list";
import { WithdrawList } from "../components/admin/Withdraw.list";
import { PromptList } from "../components/admin/Prompt.list";
import { NoticeList } from "../components/admin/Notice.list";
import { ReportList } from "../components/admin/Report.list";
import { FeedList } from "../components/admin/Feed.list";
import { SecurityList } from "../components/admin/Security.list";

export const AdminScreen = ({ navigation }: any) => {
    const tabs = ["users", "orders", "withdraws", "prompts", "notice",  "report", "feeds", "security"]; //"promoted ads",
    const [activeTab, setActiveTab] = useState<string>("report")
    return (
        <StyledView className="w-full h-full bg-background">
            <AppBarComponent navigation={navigation} hasBack={true} />
            <StyledView>
                <StyledScrollView horizontal={true} className="border-b-0.5 border-slate-400">
                    {
                        tabs.map((tab, index) => {
                            return (
                                <StyledTouchableOpacity className={`px-6 p-2 mx-2 border-b-2 ${activeTab === tab ? 'border-white' : 'border-transparent'}`} key={index} onPress={() => setActiveTab(tab)}>
                                    <StyledText className="text-white font-bold capitalize">{tab}</StyledText>
                                </StyledTouchableOpacity>
                            )
                        })
                    }
                </StyledScrollView>
            </StyledView>
            <StyledView className="h-4/5">
                { activeTab === "users" ? <UserList /> : null }
                { activeTab === "orders" ? <OrderList /> : null }
                { activeTab === "withdraws" ? <WithdrawList /> : null }
                { activeTab === "prompts" ? <PromptList /> : null }
                { activeTab === "notice" ? <NoticeList /> : null }
                { activeTab === "report" ? <ReportList /> : null }
                { activeTab === "feeds" ? <FeedList /> : null }
                { activeTab === "security" ? <SecurityList /> : null }
            </StyledView>
        </StyledView>
    )
}