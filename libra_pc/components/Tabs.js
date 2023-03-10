import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Price from "./Price";
import Dboperation from "./Dboperation";

function PriceCalculator() {
    return (
        <Price></Price>
    )
}
function PriceList() {
    return (
        <Dboperation></Dboperation>
    )
}


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <NavigationContainer>

            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, }) => {
                    let iconName;
                    if (route.name == 'pc') {
                        iconName = focused ? require("./icons/calculator_active.png") : require("./icons/calculator.png");

                    }
                    else if (route.name == 'priceList') {
                        iconName = focused ? require("./icons/list_active.png") : require("./icons/list.png")


                    }
                    
                    return <Image source={iconName} style={{ width: 20, height: 20 }} />

                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray'
            })}>
                <Tab.Screen name="pc" component={PriceCalculator} options={{
                    title: 'Price Calculator',
                    headerShown: false,
                }} />
                <Tab.Screen name="priceList" component={PriceList} options={{
                    title: 'Price List',
                    headerShown: false

                }} />
            </Tab.Navigator>

        </NavigationContainer>
    );
}
export default Tabs
const St = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
    }
});