import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from 'react-native';
import { Styles } from "./Styles/Styles";
import StaticData from "./StaticData";
import Buttons from "./Buttons";
import { Picker } from "@react-native-picker/picker";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'libra_price.db' });

function Price(props) {
    const [price, setPrice] = useState();
    const [weight, setWeight] = useState("");
    const [rs, setRs] = useState();
    const [weightRs, setWeightRs] = useState();
    const [unit, setUnit] = useState('Gm');
    const [SelectData, SetSelectData] = useState();
    const [DATA, setData] = useState([]);

    useEffect(() => {
        PickerData();
        {
            if (DATA.length > 0) {
                setWeight(1);
                setPrice(price => DATA[0].price);
            }
        }
    }, []);
    const selectBtn = (id, IndexVal) => {
        var index_val = 0;
        if (IndexVal != 0) {
            index_val = IndexVal - 1;

          ;
            SetSelectData(id);
            var SelectedPrice = DATA[index_val].price;
            setPrice(SelectedPrice);
            setWeight(1);
            rsTxt.clear();
            wtTxt.clear();
            setUnit('Gm');
        }
       
    }
    const PickerData = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM price_data WHERE isSelected="true" ORDER BY item_name ASC', [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setData(temp);
                });

        });
    }
    PickerData();


    calculation = () => {

        //Rs
        if (price.length != 0 && weight.length != 0 && (rs == undefined || rs == '')
            && weightRs.length != 0) {
            setRs(((price * weightRs) / (weight * 1000)).toFixed(2));
        }
        //weight Rs
        if (price.length != 0 && weight.length != 0 && (weightRs == undefined || weightRs == '')
            && rs.length != 0) {
            var result = 0;
            result = ((rs * (weight * 1000)) / price).toFixed(2);
            setUnit('Gm');
            if (result >= 1000) {
                result = result / 1000;
                setUnit('Kg')
            }

            setWeightRs(result);
        }



    }
    const rst = () => {
        priceTxt.clear();
        weightTxt.clear();
        rsTxt.clear();
        wtTxt.clear();
        setUnit('Gm');
        setWeight("");
        setPrice("");
        SetSelectData("");

    }
    const clearWeightRs = () => {
        setWeightRs();
        wtTxt.clear();
    }
    const clearRs = () => {
        rsTxt.clear();
        setRs();
    }
    const SelectedData = () => {
        // if (DATA.length <= 0) {
        //     return <Picker.Item key="0" label="Pls Select Item Inside The Price List" value='0' style={{ color: 'red', fontFamily: StaticData().AppFontFamily }} />
        // }

        return DATA.map((l) => (
            <Picker.Item key={l.id} label={l.item_name + " (" + l.price + " Kg)"} value={l.id} style={{ fontFamily: StaticData().AppFontFamily }} />
        ));
    }
    return (
        <View style={Styles({ colorName: 'white' }).mainContainer}>
            <View style={Styles('').container}>
                <Text style={Styles('').title}>{StaticData().AppTittle}</Text>
            </View>
            <View style={Styles('').hr}>
            </View>
            <View style={{
                borderWidth: 1, borderColor: StaticData().AppColor, marginVertical: 5, marginHorizontal: 6,
                borderRadius: 8
            }}>
                <Picker style={{ marginVertical: 1 }}
                    selectedValue={SelectData}
                    onValueChange={(val, IndexVal) => { selectBtn(val, IndexVal) }}
                >
                    <Picker.Item key={0}  label={"Select"} style={{ fontFamily: StaticData().AppFontFamily }} />
                    {SelectedData()}

                </Picker>
            </View>


            <View style={Styles('').inputContainer}>
                <View style={Styles('').inputGroup}>
                    <Text style={Styles('').label}>Price</Text>
                    <TextInput style={Styles('').inputField} keyboardType='numeric' placeholder="0" ref={val => { priceTxt = val }}
                        onChangeText={value => { setPrice(value) }}>{price}</TextInput>
                </View>
                <View style={[Styles('').inputGroup, { marginLeft: 2 }]}>
                    <Text style={Styles('').label}>
                        Weight (Kg)
                    </Text>
                    <TextInput style={Styles('').inputField} keyboardType="numeric" placeholder="0" ref={val => { weightTxt = val }}
                        onChangeText={value => { setWeight(value) }}>{weight}</TextInput>
                </View>


            </View>

            <View style={Styles('').inputContainer}>
                {/* rs */}
                <View style={Styles('').inputGroup}>
                    <Text style={[Styles('').label, { color: 'red' }]}>Rs</Text>
                    <TextInput style={Styles('').inputField} keyboardType='numeric' placeholder="0"
                        ref={val => { rsTxt = val }} onChangeText={value => { setRs(value) }}
                        onKeyPress={clearWeightRs} onPressIn={clearWeightRs}>{rs}</TextInput>
                </View>

                {/* weight */}
                <View style={[Styles('').inputGroup, { marginLeft: 2 }]}>
                    <Text style={[Styles('').label, { color: 'red' }]}>Weight ({unit})</Text>
                    <TextInput style={Styles('').inputField} keyboardType='numeric' placeholder="0"
                        onPressIn={clearRs} onKeyPress={clearRs}
                        ref={val => { wtTxt = val }} onChangeText={value => { setWeightRs(value) }}>{weightRs}</TextInput>

                </View>
            </View>


            {/* button */}
            <View style={[Styles('').container, { flexDirection: 'row', alignSelf: 'center' }]}>

                <Buttons btnColor={StaticData().AppColor} functionName={calculation} btnName="Click"></Buttons>
                <Buttons btnColor='red' functionName={rst} btnName='Reset'></Buttons>
            </View>



        </View>

    );
}

export default Price
