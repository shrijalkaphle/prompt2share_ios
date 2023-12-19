import { SearchScreenPage } from '../../pages/SearchScreen.page';
import { NotificationScreenPage } from '../../pages/NotificationScreen.page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PostScreen } from '../derived/PostScreen';
import { ProfileScreen } from '../derived/ProfileScreen';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
        <Tab.Navigator initialRouteName="PostList" screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'rgba(36,25,40,1)', height: 60 } }}>
            <Tab.Screen name="PostList" component={PostScreen} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={'white'}/>
                    )
                }
            }} />
            <Tab.Screen name="Search" component={SearchScreenPage} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'search' : 'search-outline'} size={22} color={'white'}/>
                    )
                }

            }} />
            <Tab.Screen name="Notification" component={NotificationScreenPage} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={22} color={'white'}/>
                    )
                }

            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={'white'}/>
                    )
                }

            }} />
        </Tab.Navigator>
    )
}