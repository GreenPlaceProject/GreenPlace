import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../components/Login';
import Registration from '../components/Registration';
import Map from '../components/Map';
import AddLocation from '../components/AddLocation';
import AdminScreen from '../components/AdminScreen';
import CategoriesManagement from '../components/CategoriesManagement';

const NavigationStack = createStackNavigator({
    Login: { 
        screen: Login,
        navigationOptions:{ headerShown: false }
    },
    Registration: { 
        screen: Registration ,
        navigationOptions:{ headerShown: false }
    },
    Map: { 
        screen: Map,
        navigationOptions:{ headerShown: false }
    },
    AddLocation: { 
        screen: AddLocation,
        navigationOptions:{ headerShown: false }
    },
    AdminScreen: {
        screen: AdminScreen,
        navigationOptions: { headerShown: false}
    },
    CategoriesManagement: {
        screen: CategoriesManagement,
        navigationOptions: { headerShown: false }
    }
});



const Container = createAppContainer(NavigationStack);

export default Container; 