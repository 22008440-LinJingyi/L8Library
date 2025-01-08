import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import AddBook from './AddBook';
import EditBook from './EditBook';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddBook" component={AddBook} />
                <Stack.Screen name="EditBook" component={EditBook} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
