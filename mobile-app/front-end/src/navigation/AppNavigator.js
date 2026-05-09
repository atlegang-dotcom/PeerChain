import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectWalletScreen from '../screens/ConnectWalletScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0a0d0f' } }}>
      <Stack.Screen name="Connect" component={ConnectWalletScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}