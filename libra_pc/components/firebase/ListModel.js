import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from "react-native-modal";
import { Styles } from "../Styles/Styles";
import DatePicker from "react-native-date-picker";
import StaticData from "../StaticData";
const ListModel = (props) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [Dates, setDates] = useState(new Date());
    const DateFormat = (d) => {
        var timestamp = d.getTime();
        var toDate = new Date(timestamp).getDate();
        var toMonth = new Date(timestamp).getMonth()+1;
        var toYear = new Date(timestamp).getFullYear();
        var finalDate = toDate + "/" + toMonth + "/" + toYear;
        console.log(finalDate);
        return finalDate;
    }
    useEffect(() => {
        setDates(DateFormat(Dates));
    }, []);
    const DateHandler = (date) => {

        setOpen(false);
        setDate(date);

        setDates(DateFormat(date));

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
                </View>
                <View style={[Styles('').container, { flexDirection: 'row', alignSelf: 'center' }]}>
                    <TouchableOpacity style={Styles({ btnColor: 'red' }).btn} activeOpacity={0.6} onPress={props.CancelFun}>
                        <Text style={Styles('').btnTxt}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>

    );
}
export default ListModel