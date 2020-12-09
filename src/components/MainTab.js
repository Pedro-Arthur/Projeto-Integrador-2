import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserArea from '../screens/UserArea';
import MenuOptions from '../screens/MenuOptions';
import Bag from '../screens/Bag';
import Profile from '../screens/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor='#fff'
            inactiveColor='#fff'
            labelStyle={{ fontSize: 12 }}
            barStyle={{ backgroundColor: '#f5872b' }}
        >
            <Tab.Screen
                name="Home"
                component={UserArea}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Icon name={'home'} size={27} style={{ color: '#fff' }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuOptions}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: () => (
                        <Icon name={'th-large'} size={27} style={{ color: '#fff' }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    color: "#fff",
                    tabBarLabel: 'Perfil',
                    tabBarIcon: () => (
                        <Icon name={'user'} size={27} style={{ color: '#fff' }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}