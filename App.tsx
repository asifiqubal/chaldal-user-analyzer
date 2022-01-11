import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Filter from "./src/compnents/analyzer";
import User from "./src/compnents/analyzer/user";
import {Routes} from "./src/compnents/navigation";

const Stack = createStackNavigator<Routes>();

/**
 */
const StackApp = () =>
{
    return (
        <Stack.Navigator screenOptions={({ route, navigation }) => ({
            headerShown: false,
        })}>
            <Stack.Screen name='Filter' component={Filter}/>
            <Stack.Screen name='User' component={User}/>
        </Stack.Navigator>
    )
}
export default function App() {
  return (
      <NavigationContainer>
          <StackApp />
      </NavigationContainer>
  );
}

