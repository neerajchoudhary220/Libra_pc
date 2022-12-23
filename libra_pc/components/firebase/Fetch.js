import React, { useEffect } from "react";
import {View,Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Fetch=()=>{
    useEffect(()=>{
        getData();
    },[])

    const getData=async()=>{
        try {
        
        const data = await firestore().collection('testing').doc('0LKKYVUU2CVCJI6QJ3Z4').get();
        console.log(data);
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }
    return(
        <View style={{justifyContent:'center',alignContent:'center',flex:1}}>
            <Text style={{alignSelf:'center'}}>Firebase Data</Text>
        </View>
    )

}

export default Fetch