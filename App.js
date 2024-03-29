

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import Home from './screens/Home';
import Login from './screens/Login';
import Registor from './screens/Registor';
import Report from './screens/Report';
import Salary from './components/salary'
import Setting from './screens/Setting'
import AddExpense from './screens/AddExpense';
const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Registor" component={Registor} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
          <Stack.Screen name="Salary" options={{ headerShown: false }} component={Salary} />

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
