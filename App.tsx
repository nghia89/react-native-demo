import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DoubleTab from './screens/doubleTab';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tiktok from './screens/tiktok';
import Food from './screens/food';
import DoubleChatZalo from './screens/doubleChatZalo';
import { Onboarding } from './screens/onboarding';
import AddButton from './screens/components/addButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlatListAnimated from './screens/components/flatListAnimated';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  const [isOnboarding, setOnboarding] = useState(false)
  const navigationRef = useNavigationContainerRef()

  if (!isOnboarding) return <Onboarding handleOnboarding={() => setOnboarding(true)} />

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar />
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomStack} />
        <Stack.Screen name="FlatListAnimated" component={FlatListAnimated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomStack(props: any) {
  return <SafeAreaProvider>
    <Tab.Navigator>
      <Tab.Screen name="DoubleTab" component={DoubleTab} />
      <Tab.Screen name="DoubleChatZalo" component={DoubleChatZalo} />
      <Tab.Screen name="AddButton" component={() => null} options={{
        tabBarButton: () => <AddButton {...props} />
      }} />
      <Tab.Screen name="Tiktok" component={Tiktok} options={{ headerShown: false }} />
      <Tab.Screen name="Food" component={Food} options={{ headerShown: false }} />
    </Tab.Navigator>
  </SafeAreaProvider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
