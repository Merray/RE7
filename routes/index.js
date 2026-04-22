import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from '../ecrans/tabs';
import RecetteDetail from '../ecrans/recetteDetail';
import RecetteFormulaire from '../ecrans/recetteFormulaire';

const Stack = createNativeStackNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='dashboard' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" component={BottomTabs} />
        <Stack.Screen name="recetteDetail"
          component={RecetteDetail} options={{ headerShown: true }} />
          <Stack.Screen
          name="recetteFormulaire"
          component={RecetteFormulaire}
          options={{ headerShown: true, title: 'Ajouter une recette' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes