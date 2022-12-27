import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { Styles } from "../Styles/Styles";
import DatePicker from "react-native-date-picker";
import StaticData from "../StaticData";
import database from '@react-native-firebase/database';

const ListModel = (props) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [Dates, setDates] = useState(new Date());
    const [Amount, SetAmount] = useState(0);
    const [Description, SetDescription] = useState('');
    const DateFormat = (d) => {

        var timestamp = d.getTime();
        var toDate = new Date(timestamp).getDate();
        var toMonth = new Date(timestamp).getMonth() + 1;
        var toYear = new Date(timestamp).getFullYear();
        var finalDate = toDate + "/" + toMonth + "/" + toYear;

        return finalDate;
    }
    useEffect(() => {
        var timestamp = new Date().getTime();
        var toDate = new Date(timestamp).getDate();
        var toMonth = new Date(timestamp).getMonth() + 1;
        var toYear = new Date(timestamp).getFullYear();
        var finalDate = toDate + "/" + toMonth + "/" + toYear;
        setDates(finalDate);

    }, []);
    const DateHandler = (date) => {

        setOpen(false);
        setDate(date);

        setDates(DateFormat(date));


    }

    const AmountHandler = (val) => {
        SetAmount(val.trim());
        props.amount(val.trim)
    }
    const DescriptionHandler = (val) => {
        SetDescription(val);
    }

    const SaveHandler = async () => {
        try {
            if (Amount.valueOf() < 0 || Amount.valueOf() == '' || Amount.valueOf == undefined) {
                AmountTxt.focus();
            }
            else if (Description.valueOf().trim().length < 0 || Description.valueOf().trim().length == '' || Description.valueOf().trim().length == undefined) {
                DescriptionTxt.focus();
            }
            else{
                let d = Dates;
                let amt = Amount;
                let Desc = Description.valueOf().trim();
          
            }

        } catch (error) {
            console.log(error);
        }

    }
    return (

        <Modal isVisible={props.visibility} animationIn='zoomIn' animationOut='zoomOut' statusBarTranslucent={true}
            backdropOpacity={0}>
            <View style={Styles('').model}>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        backgroundColor: StaticData().AppColor,
                        elevation: 10,
                        borderRadius: 5,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 3,
                        paddingVertical: 2,
                        marginLeft: 2,
                        fontFamily: StaticData().AppFontFamily,


                    }} activeOpacity={0.6} onPress={() => setOpen(true)}>
                        <Image source={require('../icons/calendar.png')}></Image>

                    </TouchableOpacity>
                    <Text style={{ elevation: 10, paddingLeft: 2, marginLeft: 10 }}>{Dates}</Text>
                    <DatePicker
                        modal
                        minimumDate={new Date("2022-01-01")}
                        maximumDate={new Date(new Date())}
                        mode="date"
                        open={open}
                        date={date}
                        onConfirm={DateHandler}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <View style={{ marginLeft: '35%' }}>
                        <TextInput style={
                            [
                                Styles('').ListModelTextInput,
                                {
                                    textAlign: 'center', height: 40, width: 100, marginTop: -10, marginVertical: 5
                                }
                            ]
                        } placeholder="Amount" keyboardType="numeric" onChangeText={AmountHandler} value={Amount} ref={(val) => AmountTxt = val}>
                        </TextInput>
                    </View>


                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput style={Styles('').ListModelTextInput}
                        placeholder="Description" multiline={true} onChangeText={DescriptionHandler} value={Description}
                        ref={(val) => DescriptionTxt = val}>
                    </TextInput>
                </View>
                <View style={[Styles('').container, { flexDirection: 'row', alignSelf: 'center' }]}>
                    <TouchableOpacity style={Styles({ btnColor: 'orange' }).btn} activeOpacity={0.6} onPress={SaveHandler}>
                        <Text style={Styles('').btnTxt} onPress={SaveHandler}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles({ btnColor: 'red' }).btn} activeOpacity={0.6} onPress={props.CancelFun}>
                        <Text style={Styles('').btnTxt}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal >

    );
}
export default ListModel