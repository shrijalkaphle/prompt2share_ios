import { useEffect, useState } from "react";
import { StyledActivityIndicator, StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper";
import { INotification } from "../../types/models.type";
import { useAuth } from "../../contexts/AuthContext";
import { NotificationCard } from "../core/NotificationCard";
import { getUserNotification } from "../../services/auth.service";
import { LoadingNotificationCard } from "../core/LoadingNotificationCard";
import { FlatList } from "react-native";
import { FloatingButton } from "../core/FloatingButton";

export const NotificationScreen = ({navigation}: any) => {

    const [notifications, setNotifications] = useState<INotification[]>([])
    const [page, setPage] = useState<number>(1)
    const [dataLoading, setDataLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const getNotifications = async () => {
        let params = {
            page: page,
            perPage: 20
        }

        const response = await getUserNotification(params)
        if (response && response.error) {
            setDataLoading(false)
            return
        }
        if(notifications.length == 0)
            setNotifications(response.data)
        else
            setNotifications([...notifications, ...response.data])

        if(response.total_page > page) 
            setHasMore(true)
        else
            setHasMore(false)

        setDataLoading(false)
    }

    const updatePageCount = () => {
        if(!hasMore) return
        setPage(page + 1)
        setDataLoading(true)
    }

    useEffect(() => {
        getNotifications()
    }, [page])


    return (
        <StyledView className="bg-background h-full w-full relative">
            <FloatingButton navigation={navigation} />
            {/* <StyledActivityIndicator/> */}
            <StyledView className="p-1">
                {
                    notifications.length == 0 ? <LoadingNotificationCard /> :
                        <FlatList data={notifications} renderItem={({ item, index }) => 
                            <StyledView className={`${index == notifications.length-1 ? 'mb-24' : ''}`}>
                                <NotificationCard message={item.message} is_read={item.is_read} />
                            </StyledView>
                        } style={{ borderColor: 'white' }} onEndReached={updatePageCount}/>
                }
            </StyledView>

            <StyledView className={`absolute left-0 right-0 bottom-0 bg-black flex flex-row items-center justify-center rounded-t-xl ${dataLoading?'':'hidden' }`}>
                <StyledActivityIndicator />
                <StyledText className="ml-2 text-white">Loading</StyledText>
            </StyledView>
        </StyledView>
    )
}
