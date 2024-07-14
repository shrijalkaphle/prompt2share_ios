import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PostScreen } from '../derived/PostScreen';
import { ProfileScreen } from '../derived/ProfileScreen';
import { NotificationScreen } from '../derived/NotificationScreen';
import { SearchScreen } from '../derived/SearchScreen';
import { AppBarComponent } from './AppBarComponent';
import { View } from 'react-native';
import { FloatingButton } from './FloatingButton';
import { StyledTouchableOpacity, StyledView } from '../../helpers/NativeWind.helper';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

export const BottomTab = ({ navigation }: any) => {
    const [showCreateModel, setShowCreateModel] = useState<boolean>(false)
    return (
        <>
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
                <Tab.Screen name="FloatingButton" component={SearchScreen} options={{
                    title: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            // <FloatingButton navigation={navigation}/>
                            <StyledTouchableOpacity className={`h-14 w-14 rounded-full absolute bottom-[15px] bg-white flex items-center justify-center ${showCreateModel ? 'hidden' : 'z-10'}`} onPress={() => setShowCreateModel(!showCreateModel)}>
                                <Ionicons name={showCreateModel ? 'close' : 'add'} size={22} color={'black'} />
                            </StyledTouchableOpacity>
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

            <StyledView className={`z-10 absolute inset-0 w-full h-full flex gap-y-4 items-center justify-end pb-[10px] bg-black/50 ${showCreateModel ? '' : 'hidden'}`}>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('Generate') }}>
                    <Ionicons name={'language'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('CreatePost') }}>
                    <Ionicons name={'text'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('ImageGenerate') }}>
                    <Ionicons name={'image'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => { setShowCreateModel(!showCreateModel); navigation.push('Camera') }}>
                    <Ionicons name={'camera'} size={22} color={'black'} />
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center" onPress={() => setShowCreateModel(!showCreateModel)}>
                                <Ionicons name={showCreateModel ? 'close' : 'add'} size={22} color={'black'} />
                            </StyledTouchableOpacity>
            </StyledView>
        </>
    )
}