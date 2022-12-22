import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { Table, Row, Rows } from 'react-native-table-component';
    const header = ['Date','Name', 'Price (Kg)', 'Action'];

const base_url = 'http://192.168.43.30:8000/';
const ngrok_url =' https://77b9-2409-4052-4d1b-4333-f8a5-c40c-d5de-9e3b.in.ngrok.io/';
const LivePriceList = () => {

    const [name,SetName]=useState();
    const [email,SetEmail] = useState();
    const[DATA,SetDATA] = useState([]);
    const [mobile,SetMobile] =useState();
    const header = ['Date','Name', 'Price (Kg)', 'Action'];

    const getData=()=>{
        axios({
            method: 'get',
            url: base_url+"api/testing/list",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }).then(function (response) {
            
        var data = response.data.data;
        console.log("DATA:",data);
            SetName(data.name);
            SetName((state)=>{
                SetName(state);
            });
            SetMobile(data.mobile);
            SetMobile((state)=>{
                SetMobile(state);
            });
            SetEmail(data.email);
            SetEmail((state)=>{
                SetEmail(state);
            })

        }).catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {
       getData();
    },[]);
  
   
    return (<View style={{ alignContent: 'center', flex: 1, justifyContent: "center" }}>
        <Text style={{ alignSelf: 'center' }}>Name: {name}{"\n"}
         Mobile:{mobile}{"\n"}Email:{email}</Text>
    </View>)
}
export default LivePriceList