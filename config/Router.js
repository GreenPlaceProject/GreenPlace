import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../components/Login';
import registration from '../components/registration';
import Map from '../components/Map';
import AddLocation from '../components/AddLocation';

const NavigationStack = createStackNavigator({
    Login: { 
        screen: Login,
        navigationOptions:{ headerShown: false }
    },
    registration: { 
        screen: registration ,
        //navigationOptions:{ headerShown: false }
    },
    Map: { 
        screen: Map,
        //navigationOptions:{ headerShown: false }
    },
    AddLocation: { 
        screen: AddLocation,
        navigationOptions:{ headerShown: false }
    },
});



const Container = createAppContainer(NavigationStack);

export default Container; 