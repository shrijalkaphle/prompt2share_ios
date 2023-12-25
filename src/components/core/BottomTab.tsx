import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PostScreen } from '../derived/PostScreen';
import { ProfileScreen } from '../derived/ProfileScreen';
import { NotificationScreen } from '../derived/NotificationScreen';
import { SearchScreen } from '../derived/SearchScreen';
import { AppBarComponent } from './AppBarComponent';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
        <Tab.Navigator initialRouteName="PostList" 
            screenOptions={{ 
                tabBarStyle: { 
                    backgroundColor: 'rgba(36,25,40,1)', 
                    borderColor: 'rgba(36,25,40,1)' 
                },
                header(props) {
                    return <AppBarComponent {...props} />
                },
                // headerStyle: { 
                //     backgroundColor: 'rgba(36,25,40,1)', 
                //     borderColor: 'rgba(36,25,40,1)',
                //     elevation: 0
                // },
                headerTintColor: 'white' 
            }}>
            <Tab.Screen name="PostList" component={PostScreen} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={'white'} />
                    )
                },
                unmountOnBlur: true
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'search' : 'search-outline'} size={22} color={'white'} />
                    )
                },
                unmountOnBlur: true

            }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={22} color={'white'} />
                    )
                },
                unmountOnBlur: true

            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                title: '',
                tabBarIcon: ({ color, size, focused }) => {
                    return (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={'white'} />
                    )
                },
                unmountOnBlur: true

            }} />
        </Tab.Navigator>
    )
}