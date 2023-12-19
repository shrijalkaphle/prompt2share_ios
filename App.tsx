
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AuthScreen } from './src/screens/Auth.screen';
import { HomeScreen } from './src/screens/Home.screen';
import { PurchaseScreen } from './src/screens/Purchase.screen';
import { BillingScreen } from './src/screens/Billing.screen';
import { GuideScreen } from './src/screens/Guide.screen';

const Stack = createNativeStackNavigator();

export default function App() {

  // const [user, setUser] = useState<IUser>();
  // const [initialRouteName, setInitialRouteName] = useState<string>('Home');

  // const validateUser = async () => {
  //   const _token = await AsyncStorage.getItem(AUTH_CONSTANTS.TOKENKEY)
  //   if (_token) {
  //     setInitialRouteName('Home')
  //     // call user detail
  //     me().then((response: IUserResponse) => {
  //       setUser(response)
  //     })
  //   }
  // }
  // useEffect(() => {
  //   validateUser()
  //   console.log('initial route', initialRouteName)
  // }, [])

  return (
    // <UserContext.Provider value={{ user, setUser }}>
    //   <MenuProvider>
    //     <RootSiblingParent>
    //       <NavigationContainer>
    //         <Stack.Navigator initialRouteName={initialRouteName}>
    //           <Stack.Screen name="Home" component={HomeScreenPage} options={{ headerShown: false }} />
    //           <Stack.Screen name="Login" component={LoginScreenPage} options={{ headerShown: false }} />
    //           <Stack.Screen name="Register" component={RegisterScreenPage} options={{ headerShown: false }} />
    //           <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreenPage} options={{ headerShown: false }} />
    //           <Stack.Screen name="BuyTokenScreen" component={BuyTokenScreenPage} options={{ headerShown: false }} />
    //         </Stack.Navigator>
    //       </NavigationContainer>
    //     </RootSiblingParent>
    //   </MenuProvider>
    // </UserContext.Provider>
    <AuthProvider>
      <RootSiblingParent>
        <MenuProvider>
          <Layout />
        </MenuProvider>
      </RootSiblingParent>
    </AuthProvider>
  );
}

export const Layout = () => {

  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>

      {authState?.authenticated ?
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PurchaseCoin" component={PurchaseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Billing" component={BillingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Guide" component={GuideScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      }
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  )
}