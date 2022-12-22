import React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import { Styles } from './Styles/Styles';

function Buttons(props){
    return(<TouchableOpacity style={Styles({btnColor:props.btnColor}).btn} activeOpacity={0.6} onPress={props.functionName}
    disabled={props.btnDisable}>
    <Text style={Styles('').btnTxt}>{props.btnName}</Text>
</TouchableOpacity>)
}
export default Buttons

