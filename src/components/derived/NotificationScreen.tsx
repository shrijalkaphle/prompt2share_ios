import { useEffect, useState } from "react";
import { StyledImage, StyledScrollView, StyledText, StyledTouchableOpacity, StyledView } from "../../helpers/NativeWind.helper";
import { INotification } from "../../types/models.type";
import { useAuth } from "../../contexts/AuthContext";
import { NotificationCard } from "../core/NotificationCard";
import { getUserNotification } from "../../services/auth.service";
import { LoadingNotificationCard } from "../core/LoadingNotificationCard";

export const NotificationScreen = () => {

    const [notifications, setNotifications] = useState<INotification[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageLoading, setPageLoading] = useState<boolean>(true)

    const getNotifications = async () => {
        const params = {
            page: page,
            perPage: 20
        }

        const response = await getUserNotification(params)
        if (response && response.error) {
            console.log(response.error)
            setPageLoading(false)
            return
        }
        setNotifications([...notifications, ...response.data])
        setPageLoading(false)
    }

    useEffect(() => {
        getNotifications()
    }, [page])

    return (
        <StyledScrollView className="bg-background p-1">

            {
                pageLoading ? <LoadingNotificationCard /> :
                    <>
                        {
                            notifications.map((notification: INotification, index: number) => (
                                <NotificationCard key={index} message={notification.message} is_read={notification.is_read} />
                            ))
                        }
                    </>
            }
        </StyledScrollView>
    )
}