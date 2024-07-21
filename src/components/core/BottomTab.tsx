import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PostScreen } from '../derived/PostScreen';
import { ProfileScreen } from '../derived/ProfileScreen';
import { SearchScreen } from '../derived/SearchScreen';
import { AppBarComponent } from './AppBarComponent';
import { StyledTouchableOpacity, StyledView } from '../../helpers/NativeWind.helper';
import { CameraScreen } from '../../screens/Camera.screen';
import { GenerateScreen } from '../../screens/Generate.screen';

const Tab = createBottomTabNavigator();

export const BottomTab = ({navigateToCameraPage}: any) => {
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
                <Tab.Screen name="Camera" component={CameraScreen} options={{
                    title: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <StyledTouchableOpacity className='h-14 w-14 absolute bottom-2 rounded-full z-10 flex items-center justify-center' onPress={navigateToCameraPage}>
                                <StyledView className="h-14 w-14 rounded-full bg-white z-10 flex items-center justify-center">
                                <Ionicons name="camera-outline" size={22} color={'black'} />
                            </StyledView>
                            </StyledTouchableOpacity>
                        )
                    },
                    unmountOnBlur: true
                }} />
                <Tab.Screen name="Generate" component={GenerateScreen} options={{
                    title: '',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name={focused ? 'language' : 'language-outline'} size={22} color={'white'} />
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
        </>
    )
}