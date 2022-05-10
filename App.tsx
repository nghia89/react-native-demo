import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DoubleTab from './screens/doubleTab';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tiktok from './screens/tiktok';
import Food from './screens/food';
import DoubleChatZalo from './screens/doubleChatZalo';
import { Onboarding } from './screens/onboarding';
import AddButton from './screens/components/addButton';


const Tab = createBottomTabNavigator();

export default function App() {
  const [isOnboarding, setOnboarding] = useState(false)

  if (!isOnboarding) return <Onboarding handleOnboarding={() => setOnboarding(true)} />

  return (
    <NavigationContainer>
      <StatusBar />
      <Tab.Navigator

      >
        <Tab.Screen name="DoubleTab" component={DoubleTab} />
        <Tab.Screen name="DoubleChatZalo" component={DoubleChatZalo} />
        <Tab.Screen name="AddButton" component={() => null} options={{
          tabBarButton: (props) => <AddButton {...props} />
        }} />
        <Tab.Screen name="Tiktok" component={Tiktok} options={{ headerShown: false }} />
        <Tab.Screen name="Food" component={Food} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
