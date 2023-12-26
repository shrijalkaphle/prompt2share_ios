
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
import { GenerateScreen } from './src/screens/Generate.screen';
import { CameraScreen } from './src/screens/Camera.screen';
import { DalleScreen } from './src/screens/Dalle.screen';
import { ImageGenerateScreen } from './src/screens/ImageGenerate.screen';
import { CreatePostScreen } from './src/screens/CreatePost.screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { EditProfileScreen } from './src/screens/EditProfile.screen';
import { UserScreen } from './src/screens/User.screen';
import { AppBarComponent } from './src/components/core/AppBarComponent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <StripeProvider
        publishableKey="pk_test_51Ncp0QJfXV5x0h2XFAFUVIzEv9yrEIrDHzFOrBrWxjqvIamPcapkQ52Cym6O10Cnul5FpymRdJrXZlaJwIbATuEd00uOkrQkVQ"
        merchantIdentifier="merchant.prompttoshate.prompttoshare">
        <RootSiblingParent>
          <MenuProvider>
            <Layout />
          </MenuProvider>
        </RootSiblingParent>
      </StripeProvider>
    </AuthProvider>
  );
}

export const Layout = () => {

  const { authState } = useAuth();
  return (
    <NavigationContainer>

      {authState?.authenticated ?
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
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