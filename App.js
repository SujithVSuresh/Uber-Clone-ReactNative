//import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';



export default function App() {
  const Stack = createNativeStackNavigator();

  //safeareaprovider here is used to avoid icons moving out of safer areas.
  return (
  <Provider store={store}>
    <NavigationContainer>
    <SafeAreaProvider>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={-60}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
   
  );
}


