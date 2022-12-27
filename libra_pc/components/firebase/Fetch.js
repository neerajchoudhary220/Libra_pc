import React, { useEffect, useState } from "react";
import {View,Text,Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Buttons from "../Buttons";

const Fetch=(props)=>{
    const [MyData,SetMyData] = useState(null);
    const[RealData,SetMyRealData] = useState(null);
    useEffect(()=>{
        getData();
        getRealTimeData();
    },[])

    //firestore data getting
    const getData=async()=>{
        try {
        
        const data = await firestore().collection('testing').doc('0LKKYVUU2CVCJI6QJ3Z4').get();
        // console.log(data);
        SetMyData(data._data);
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    //realtime data get
const getRealTimeData =async()=>{
    try {
        const data = await database().ref('Users/1').once('value');
        // console.log("Realtime data",data);
        
    } catch (error) {
        console.log(error);
    }
}
const GoToListScreen=()=>{
    // return props.navigation.navigate('Fetch_Screen');
       return props.navigation.navigate('ManageEntries');

}
    return(
        <View style={{flex:1}}>
           {/* <StatusBar hidden/> */}
            <Text style={{alignSelf:'center'}}>Name:{MyData?MyData.name:"Loading..."}</Text>
            <Text style={{alignSelf:'center'}}>Age:{MyData?MyData.age:"Loading..."}</Text>
            <Text style={{alignSelf:'center'}}>Fruits:{MyData?MyData.fruits.map(l => ` ${l},`):"Loading..."}</Text>
            <View style={{borderBottomWidth:1,  borderBottomColor:'black', width:'100%', marginTop:2}}></View>
            <Text style={{fontSize:20, fontWeight:'bold', alignSelf:'center', color:'red'}}>RealTime data</Text>
            <Buttons functionName={GoToListScreen} btnName={'Manage Entries'} btnColor="orange"></Buttons>
            

            
        </View>
    )

}

export default Fetch