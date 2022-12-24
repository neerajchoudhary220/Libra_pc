import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListData from "./ListData";
import Fetch from "./Fetch";
import StaticData from "../StaticData";
function FetchFirebaseScreen({ navigation }) {
    return (
        <Fetch navigation={navigation}></Fetch>
    );
}
function ListDataScreen({ navigation }) {
    return (
        <ListData navigation={navigation}></ListData>
    )
}


const Tab = createNativeStackNavigator();
const NestedNav = () => {
    return (<Tab.Navigator>
        <Tab.Screen name="Fetch_Screen" component={FetchFirebaseScreen} options={{
            headerShown: false
        }} />
        <Tab.Screen name="ManageEntries" component={ListDataScreen} options={{
            title: 'Manage Entries',
            headerTitleStyle: { color: 'white', fontFamily: StaticData().AppFontFamily },
            headerStyle: { backgroundColor: 'orange' },
            headerTintColor: 'white',
           
        }} />

    </Tab.Navigator>);
}

export default NestedNav