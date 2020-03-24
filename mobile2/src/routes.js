import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SingIn from './screens/SingIn';
import SingUp from './screens/SingUp';

import SelectProvider from '~/screens/New/SelectProvider';
import SelectDateTime from '~/screens/New/SelectDateTime';
import Confirm from '~/screens/New/Confirm';

import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';

export default (signed = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sing: createSwitchNavigator({ SingIn, SingUp }),
                App: createBottomTabNavigator(
                    {
                        Dashboard,
                        New: {
                            screen: createStackNavigator(
                                {
                                    SelectProvider,
                                    SelectDateTime,
                                    Confirm,
                                },
                                {
                                    defaultNavigationOptions: {
                                        headerTransparent: true,
                                        headerTintColor: '#fff',
                                        headerLeftContainerStyle: {
                                            marginLeft: 20,
                                        },
                                    },
                                }
                            ),
                            navigationOptions: {
                                tabBarVisible: false,
                                tabBarLabel: 'Agendar',
                                tabBarIcon: ({ tintColor }) => (
                                    <Icon
                                        name="add-circle-outline"
                                        size={20}
                                        color={tintColor}
                                    />
                                ),
                            },
                        },
                        Profile,
                    },
                    {
                        resetOnBlur: true,
                        tabBarOptions: {
                            style: {
                                backgroundColor: '#8d41a8',
                            },
                            activeTintColor: '#fff',
                            inactiveTintColor: 'rgba(255,255,255,0.6)',
                            keyboardHidesTabBar: true,
                        },
                    }
                ),
            },
            {
                initialRouteName: signed ? 'App' : 'Sing',
            }
        )
    );
