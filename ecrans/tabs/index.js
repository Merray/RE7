import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../home';
import Recettes from '../recettes';
import Profil from '../profil';
import { COULEURS } from '../../outils/constantes';
import Dashboard from '../home';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
<Tab.Navigator
  initialRouteName="tabs_dashboard"
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: COULEURS.blanc,
    tabBarInactiveTintColor: COULEURS.noir,
    tabBarStyle: {
      backgroundColor: COULEURS.main,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      paddingTop: 5
    },
    tabBarIconStyle: {
      marginTop: 7,
      marginBottom: -2,
    },
  }}
>
      <Tab.Screen
        name="tabs_dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tabs_recettes"
        component={Recettes}
        options={{
          tabBarLabel: 'Recettes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="grill"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tabs_profil"
        component={Profil}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cookie-settings"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
