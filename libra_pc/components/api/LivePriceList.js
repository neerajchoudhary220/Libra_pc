import React, { useEffect, useState } from "react";
import { View, Text, Button, ToastAndroid, FlatList } from "react-native";
import axios from "axios";
import { Table, Row, Rows } from 'react-native-table-component';
const header = ['Date', 'Name', 'Price (Kg)', 'Action'];

const base_url = 'http://192.168.43.30:8000/';
const ngrok_url = ' https://77b9-2409-4052-4d1b-4333-f8a5-c40c-d5de-9e3b.in.ngrok.io/';
const LivePriceList = () => {

    const [name, SetName] = useState();
    const [email, SetEmail] = useState();
    const [DATA, SetDATA] = useState([]);
    const [mobile, SetMobile] = useState();
    const header = ['Date', 'Name', 'Price (Kg)', 'Action'];

    const [count, SetCount] = useState(0);
    const [result, SetResult] = useState(0);
    const getData = () => {
        axios({
            method: 'get',
            url: base_url + "api/testing/list",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }).then(function (response) {

            var data = response.data.data;
            SetDATA(data);

        }).catch(function (error) {
            console.log(error);
        });
    }
    const [condition, setCondition] = useState(false);
    useEffect(() => {
        getData();
        // console.log(DATA);
    }, [condition]);

    const btnClick = () => {
        setCondition((condition) => !condition);
     
    }
    const MyData=[
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
    const renderItem = ({ item }) => (
        <View style={{backgroundColor:'orange', alignContent:'center',
        padding:5,
        marginVertical:5,
        borderRadius:10}}>
            <View style={{paddingVertical:10,paddingHorizontal:10}}>
                <Text style={{fontSize:18,fontWeight:'bold',color:'white',alignSelf:'flex-start',position:'absolute',marginTop:6}}>{item.name}</Text>
                <Text style={{fontSize:18, color:'white',alignSelf:'flex-end',fontWeight:'bold'}}>{item.price} Kg</Text>
                
            </View>
        </View>
      );
      const EndScroll=()=>{
        console.log("working");
      }
    return (<View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{marginHorizontal:5, paddingHorizontal:3, marginBottom:10}}>
        <FlatList data={DATA} keyExtractor={(key)=>key.id} renderItem={renderItem}
       
        onEndReached={EndScroll}
        onEndReachedThreshold ={0.1}
        showsVerticalScrollIndicator={false}></FlatList>
        </View>
           
        
    </View>)
}
export default LivePriceList