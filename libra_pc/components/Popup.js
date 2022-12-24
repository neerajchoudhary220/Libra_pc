import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Buttons from "./Buttons";
import { Styles } from "./Styles/Styles";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: 'libra_price.db' });


import StaticData from "./StaticData";
const Popup = (props) => {
    const changePrice = (val) => {
        props.priceVal(val);

    }
    const changeItemName =(val)=>{
        props.ItemNameChange(val);
    }

    return (
        <Modal isVisible={props.visibility} animationIn='zoomIn' animationOut='zoomOut' statusBarTranslucent={true}
        backdropOpacity={0}>
            <View style={Styles('').model}>
                <View style={[Styles('').inputContainer, { alignSelf: 'center' }]}>
                    <View>
                        <Text style={Styles('').inputLabel}>Item Name</Text>
                        <TextInput style={[Styles('').MyTxtInput, { width: 180 }]}
                        onChangeText={changeItemName}>{props.itemName}</TextInput>
                    </View>
                    <View>
                        <Text style={Styles('').inputLabel}>Price (Kg)</Text>

                        <TextInput style={[Styles('').MyTxtInput,
                        { width: 130, marginLeft: 3 }]} keyboardType={'numeric'}
                            onChangeText={changePrice}
                        >{props.price}</TextInput>

                    </View>
                </View>
                <View style={[Styles('').container, { flexDirection: 'row', alignSelf: 'center' }]}>

                    <TouchableOpacity style={Styles({ btnColor: StaticData().AppColor }).btn} activeOpacity={0.6} onPress={props.updateBTN}>
                        <Text style={Styles('').btnTxt}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles({ btnColor: 'red' }).btn} activeOpacity={0.6} onPress={props.CancelFun}>
                        <Text style={Styles('').btnTxt}>Cancel</Text>
                    </TouchableOpacity>

                </View>
              
            </View>

        </Modal >
    );
}
export default Popup