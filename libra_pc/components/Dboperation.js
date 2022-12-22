import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, Image, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { Styles } from "./Styles/Styles";
import Buttons from "./Buttons";
import StaticData from "./StaticData";
import { Table, Row, Rows } from 'react-native-table-component';
import Popup from "./Popup";
import CheckBox from '@react-native-community/checkbox';


var db = openDatabase({ name: 'libra_price.db' });

const Dboperation = () => {

    const [price, setPrice] = useState(0);
    const [items, setItem] = useState();
    let [dataitem, setDataItem] = useState([]);
    const header = ['Date','Name', 'Price (Kg)', 'Action'];
    const [ModelVisibility, SetModelVisibility] = useState(false);
    const [EditPrice, SetEditPrice] = useState(0);
    const [EditItemName, SetEditItemName] = useState();
    const [onChangePrice, SetOnChangePrice] = useState(0);
    const [onChangeItemName, SetOnChangeItemName] = useState();
    const [Msg, SetMsg] = useState();
    const [AddNewItemBtnDisabled, SetAddNewItemBtnDisabled] = useState(true);
    const [AddNewItemBtnDisabledColor, SetAddNewItemBtnDisabledColor] = useState(StaticData().Disabled_color);
    // const [SelectData, SetSelectData] = useState();
    // const [DATA, setData] = useState([]);

    const [ItemId, SetItemId] = useState();
// const PickerData =()=>{
//     db.transaction((tx) => {
//         tx.executeSql('SELECT * FROM price_data WHERE isSelected="true" ORDER BY item_name ASC', [],
//             (tx, results) => {
//                 var temp = [];
//                 for (let i = 0; i < results.rows.length; ++i)
//                     temp.push(results.rows.item(i));
//                 setData(temp);
//             });

//     });
// }
    //Add New Item Btn Disable
    const AddNewItemBtnDisable = () => {
        SetAddNewItemBtnDisabled(true);
        SetAddNewItemBtnDisabledColor(StaticData().Disabled_color);
    }
    //Add New Item Btn Enable

    const AddNewItemBtnEnable = () => {
        SetAddNewItemBtnDisabled(false);
        SetAddNewItemBtnDisabledColor(StaticData().AppColor);
    }
    useEffect(() => {
        ViewFun();
        SetMsg('Item Updated Successfully');
        AddNewItemBtnDisable();
      
       
    }, []);

    const ViewFun = () => {
        
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM price_data ORDER BY id DESC', [],
                (tx, results) => {
                    
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setDataItem(temp);
                });
              
        });
        
       

    }

    const saveData = () => {

        // insert data
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO price_data (item_name, price,created_at) VALUES (?,?,CURRENT_TIMESTAMP)',
                [items, price],

                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        ToastAndroid.show("Saved !", ToastAndroid.SHORT);

                    } else {
                        ToastAndroid.show("Failed !", ToastAndroid.SHORT);
                    }
                },
                (error)=>{
                    if(error.code == 0){
                        ToastAndroid.show(items+" is already added !",ToastAndroid.SHORT);
                    }
                }
                
                );
        })
        clear();
        AddNewItemBtnDisable();
       
        ViewFun();

    }
    //delete table data
    const DeletePriceData = () => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM price_data where id IS NOT NULL', [],
                (tx, results) => {
                    if (results.rowsAffected >= 0) {
                        ToastAndroid.show('Deleted success', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Failed', ToastAndroid.SHORT);
                    }
                });
        });
        ViewFun();
    }

    //delete specific data from table 
    const deleteItem = (id) => {

        db.transaction((tx) => {
            tx.executeSql('DELETE FROM price_data WHERE id=?', [id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        ToastAndroid.show('Deleted success', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Failed', ToastAndroid.SHORT);
                    }
                }
            );

        });
        ViewFun();

    }

    const SelectBtn = (val, id) => {
        db.transaction((tx) => {
            let SelectVal = "false";
            if (val == 1) {
                SelectVal = "true";
                ToastAndroid.show('Item Added In Picker', ToastAndroid.SHORT);

            } else {
                SelectVal = "false";
            }
            tx.executeSql('UPDATE price_data SET isSelected=? WHERE id=?',[SelectVal, id]);
            
        });
        ViewFun();
    }
    const dateFormat=(timestamp)=>{
    var toDate = new Date(timestamp).getDate();
    var toMonth = new Date(timestamp).getMonth()+1;
    var toYear = new Date(timestamp).getFullYear();

    return toDate+"/"+toMonth+"/"+toYear;

    }
    let listItemView = (item, index) => {

        const data = [
            [
                // index + 1, 
                dateFormat(new Date(item.created_at).getTime()),
                item.item_name, item.price + ' Rs/Kg',
            <View>
                <View style={{ flexDirection: 'row' }}>
                <CheckBox
                        disabled={false}
                        
                        value={(item.isSelected != 'false')}
                        onValueChange={(val) => SelectBtn(val, item.id, item.isSelected)}
                        tintColors={{ true: StaticData().AppColor, false: StaticData().AppColor }}
                    />
                    <TouchableOpacity style={[Styles('').deleteBtn, { borderColor: 'orange' }]} onPress={() => ShowModel(item.id, item.price, item.item_name)}>
                        <Image source={require('./icons/edit_active.png')} style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={Styles('').deleteBtn} onPress={() => deleteItem(item.id)}>
                        <Image source={require('./icons/trash.png')} style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>


                </View>
            </View>
            ]
        ];
        return (
            <Rows data={data}
                style={{ borderTopWidth: 1, borderColor: StaticData().AppColor, paddingHorizontal: 5 }}
                textStyle={{ alignSelf: 'flex-start', fontSize: 15 }} />

        );
    };
    //clear input field
    const clear = () => {
        setItem();
        setPrice();
        itemTxt.clear();
        itemPrice.clear();
      
       
       

    }

    //show model
    const ShowModel = (id, price, name) => {
        SetModelVisibility(true);
        SetEditPrice(price);
        SetEditItemName(name);
        SetItemId(id);
        SetOnChangeItemName(name);
        SetOnChangePrice(price);

    }
  
    const EnterItemName = (val) => {
        setItem(val);
        if (price != undefined) {
            if (val.length > 0 && price.length > 0) {
                AddNewItemBtnEnable();

            } else {
                AddNewItemBtnDisable();
            }
        }

    }

    const EnterPrice = (val) => {
        setPrice(val);
        if (items != undefined) {
            if (val.length > 0 && items.length > 0) {
                AddNewItemBtnEnable();

            } else {
                AddNewItemBtnDisable();
            }
        }

    }

    const updateBtn = (id) => {

        db.transaction((tx) => {
            tx.executeSql('UPDATE price_data SET item_name=?, price=? where id=?',
                [onChangeItemName, onChangePrice, id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {

                        SetMsg('Item Updated Successfully');
                    } else {
                        SetMsg('Error');


                    }
                });
        }
        );
        ToastAndroid.show(Msg, ToastAndroid.SHORT);
        ViewFun();
        SetModelVisibility(false);
    }
    const getPriceData = (price) => {
        SetOnChangePrice(price);
    }
    const getItemNameData = (itemName) => {
        SetOnChangeItemName(itemName);
    }

    return (

        <View style={{ flex: 1, paddingVertical: 20 }}>
            <Popup visibility={ModelVisibility} CancelFun={() => SetModelVisibility(false)}
                itemName={EditItemName} price={EditPrice}
                updateBTN={() => updateBtn(ItemId)}
                ItemId={ItemId}
                priceVal={getPriceData}
                ItemNameChange={getItemNameData}

            ></Popup>
            <View style={[Styles('').inputContainer]}>
                <View>
                    <Text style={Styles('').inputLabel}>Item Name</Text>
                    <TextInput style={Styles('').MyTxtInput} onChangeText={EnterItemName}
                        placeholder='Item Name' ref={val => { itemTxt = val }}

                    ></TextInput>
                </View>
                <View>
                    <Text style={Styles('').inputLabel}>Price (Kg)</Text>

                    <TextInput style={[Styles('').MyTxtInput, { width: 137, marginLeft: 2 }]}
                        keyboardType={'numeric'} onChangeText={EnterPrice} placeholder='0'
                        ref={val => { itemPrice = val }}></TextInput>
                </View>
            </View>
            <View style={[Styles('').container, { flexDirection: 'row', alignSelf: 'center' }]}>

                <Buttons btnColor={AddNewItemBtnDisabledColor} btnName={'Add New Item'} functionName={saveData} btnDisable={AddNewItemBtnDisabled}></Buttons>


            </View>

            <Table style={{ marginBottom: 50, paddingHorizontal: 5 }}>
                <Row data={header}
                    style={{ height: 40, backgroundColor: 'orange', paddingHorizontal: 2 }}
                    textStyle={{
                        color: 'white', alignSelf: 'flex-start',
                        fontSize: 18
                    }} />

                <FlatList data={dataitem}
                    style={{ marginBottom: 5 }}
                    renderItem={({ item, index }) =>
                        listItemView(item, index)}
                >
                </FlatList>
              

            </Table>
        </View>



    )
}
export default Dboperation
