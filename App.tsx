import 'react-native-gesture-handler';
import 'expo-dev-client';
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
import { GenerateScreen } from './src/screens/Generate.screen';
import { CameraScreen } from './src/screens/Camera.screen';
import { DalleScreen } from './src/screens/Dalle.screen';
import { ImageGenerateScreen } from './src/screens/ImageGenerate.screen';
import { CreatePostScreen } from './src/screens/CreatePost.screen';
import { EditProfileScreen } from './src/screens/EditProfile.screen';
import { UserScreen } from './src/screens/User.screen';
import { CircleScreen } from './src/screens/Circle.screen';
import { CheckoutScreen } from './src/screens/Checkout.screen';
import { BlockedUserScreen } from './src/screens/BlockedUser.screen';

import { withIAPContext } from "react-native-iap";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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

  const { authState } = useAuth();
  const screens = [
    {
      name: 'Home',
      component: HomeScreen
    },
    {
      name: 'PurchaseCoin',
      component: withIAPContext(PurchaseScreen)
    },
    {
      name: 'Billing',
      component: BillingScreen
    },
    {
      name: 'Guide',
      component: GuideScreen
    },
    {
      name: 'Generate',
      component: GenerateScreen
    },
    {
      name: 'Camera',
      component: CameraScreen
    },
    {
      name: 'DALLE',
      component: DalleScreen
    },
    {
      name: 'ImageGenerate',
      component: ImageGenerateScreen
    },
    {
      name: 'CreatePost',
      component: CreatePostScreen
    },
    {
      name: 'EditProfile',
      component: EditProfileScreen
    },
    {
      name: 'User',
      component: UserScreen
    },
    {
      name: 'Circle',
      component: CircleScreen
    },
    {
      name: 'Checkout',
      component: CheckoutScreen
    },
    {
      name: 'BlockedUser',
      component: BlockedUserScreen
    },
  ]
  return (
    <NavigationContainer>

      {authState?.authenticated ?
        <Stack.Navigator>
          {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PurchaseCoin" component={PurchaseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Billing" component={BillingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Guide" component={GuideScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Generate" component={GenerateScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DALLE" component={DalleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ImageGenerate" component={ImageGenerateScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Circle" component={CircleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BlockedUser" component={BlockedUserScreen} options={{ headerShown: false }} /> */}
          {screens.map((screen, index) => (
            <Stack.Screen name={screen.name} component={screen.component} options={{ headerShown: false }} key={index} />
          ))}
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  )
}