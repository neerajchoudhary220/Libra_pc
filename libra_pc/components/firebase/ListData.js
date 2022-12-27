import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Modal from "react-native-modal";
import database from '@react-native-firebase/database';
import DatePicker from "react-native-date-picker";
import { Styles } from "../Styles/Styles";
import StaticData from "../StaticData";
// import ListModel from "./ListModel";

const ListData = ({ navigation }) => {
  const [ModelShow, SetModelShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [Dates, setDates] = useState(new Date());
  const [Amount, SetAmount] = useState(0);
  const [Description, SetDescription] = useState('');
  const [DATA, SetData] = useState(null);
  const [IsUpdate, SetIsUpdate] = useState(false);
  const [UpdateKey, SetUpdateKey] = useState();

  const DateFormat = (d) => {

    var timestamp = d.getTime();
    var toDate = new Date(timestamp).getDate();
    var toMonth = new Date(timestamp).getMonth() + 1;
    var toYear = new Date(timestamp).getFullYear();
    var finalDate = toDate + "/" + toMonth + "/" + toYear;

    return finalDate;
  }
  const ShowModelHandler = () => {
    SetModelShow(true);
  }
  const CancelBtnHandler = () => {
    SetModelShow(false);
    SetAmount('');
    SetDescription('');
    SetIsUpdate(false);
    SetUpdateKey('');
  }
  useEffect(() => {
    var timestamp = new Date().getTime();
    var toDate = new Date(timestamp).getDate();
    var toMonth = new Date(timestamp).getMonth() + 1;
    var toYear = new Date(timestamp).getFullYear();
    var finalDate = toDate + "/" + toMonth + "/" + toYear;
    setDates(finalDate);

    navigation.setOptions({

      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} style={{ elevation: 0.8, marginRight: 10 }} onPress={ShowModelHandler}>
          <Image source={require('../icons/add.png')} style={{ height: 25, width: 25 }}></Image>

        </TouchableOpacity>
      ),
    });
    ViewData();

  }, [navigation, ViewData]);



  const DateHandler = (date) => {
    setOpen(false);
    setDate(date);
    let final_date = DateFormat(date);
    setDates(final_date);

  }

  const AmountHandler = (val) => {
    SetAmount(val.trim());
  }
  const DescriptionHandler = (val) => {
    SetDescription(val);
  }
  const DeleteHandler = (indexVal) => {
    try {

      Alert.alert('Alert', `Are you sure to delete ${indexVal}`, [
        {
          text: 'Cancel',
          onPress: () => {

          }
        },
        {
          text: "Ok",
          onPress: async () => {
            try {
              const res = await database().ref(`entry/${indexVal}`).remove();
              ViewData();
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]);

    } catch (error) {
      console.log(error);
    }
  }

  const SaveHandler = async () => {

    try {
      if (Amount.valueOf() < 0 || Amount.valueOf() == '' || Amount.valueOf == undefined) {
        AmountTxt.focus();
      }
      else if (Description.valueOf().trim().length < 0 || Description.valueOf().trim().length == '' || Description.valueOf().trim().length == undefined) {
        DescriptionTxt.focus();
      }
      else {
        let d = Dates;
        let amt = Amount;
        let Desc = Description.valueOf().trim();

        indx = DATA.length;
        SetModelShow(false);
        SetModelShow((state) => {
          SetModelShow(state);
        })
        SetAmount('');
        SetDescription('');

        const res = await database().ref('entry/' + indx).set({
          date: d,
          amount: amt,
          desc: Desc
        });
        ViewData();
      }


    } catch (error) {
      console.log(error);
    }


  }
  const ViewData = async () => {


    try {
      database().ref('entry').once('value', temp => {
        // var tp = [];

        // console.log(temp.val());
        if (temp.val() == null) {
          SetData('');

        } else {

          fbObject = temp.val();
          var tp = [];
          Object.keys(fbObject).map((key, index) => {


            var a = fbObject[key];
            var obj = { "key": key };
            var re = Object.assign(obj, a);
            tp.push(re);
            SetData((DATA) => tp);


          });

        }


      });

    } catch (error) {
      console.log(error);
    }

  }
  const OnEndHandler = (val) => {
    // console.log("Working");
  }

  const EditHandler = async (key) => {
    try {
      SetModelShow(true);
      SetIsUpdate(true);
      SetUpdateKey(key);
      const res = await database().ref(`entry/${key}`).once('value', temp => {
        fbObject = temp.val();
        var tp = [];
        Object.keys(fbObject).map((key, index, value) => {
          tp.push(fbObject);
        });

        tp.map((l) => {
          SetAmount(l.amount);
          SetDescription(l.desc);
          setDates(l.date);
        });
      });
      // const res = await database.ref(`entry/${key}`).once(('value'))
    } catch (error) {
      console.log(error);
    }
  }

  const UpdateHandler = async (key) => {
    try {
      if (Amount.valueOf() < 0 || Amount.valueOf() == '' || Amount.valueOf == undefined) {
        AmountTxt.focus();
      }
      else if (Description.valueOf().trim().length < 0 || Description.valueOf().trim().length == '' || Description.valueOf().trim().length == undefined) {
        DescriptionTxt.focus();
      }
      else {
        let d = Dates;
        let amt = Amount;
        let Desc = Description.valueOf().trim();
        SetModelShow(false);
        SetModelShow((state) => {
        SetModelShow(state);
        })
        SetIsUpdate(false);
        

        const res = await database().ref(`entry/${key}`).update({
          date: d,
          amount: amt,
          desc: Desc
        });
        ViewData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const renderItem = (item) => {

    if (item.item != null && item.item.amount != undefined) {
      return (<View style={Styles('').card}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: StaticData().AppFontFamily }}>{item.item.date}</Text>

        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute' }}>
          <Text style={{ fontSize: 18, color: 'green', fontWeight: 'bold', fontFamily: StaticData().AppFontFamily }}>Debit: </Text>
          <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold', marginRight: 10, fontFamily: StaticData().AppFontFamily }}>Rs {item.item.amount}</Text>
        </View>
        <View style={{
          borderWidth: 0.5, borderColor: 'gray', borderRadius: 8,
          paddingHorizontal: 1, paddingVertical: 4, marginVertical: 5, paddingHorizontal: 4, minHeight: 70
        }}>
          <Text style={{ fontSize: 18, fontFamily: StaticData().AppFontFamily }}>{item.item.desc}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity style={[Styles('').deleteBtn, { borderColor: 'orange', elevation: 10, backgroundColor: 'white' }]} onPress={() => EditHandler(item.item.key)}>
            <Image source={require('../icons/edit_active.png')} style={{ width: 15, height: 15 }}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles('').deleteBtn, { elevation: 10, backgroundColor: 'white' }]} onPress={() => DeleteHandler(item.item.key)}>
            <Image source={require('../icons/trash.png')} style={{ width: 15, height: 15 }}></Image>
          </TouchableOpacity>

        </View>
      </View>);
    }

  }

  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Modal isVisible={ModelShow} animationIn='zoomIn' animationOut='zoomOut' statusBarTranslucent={true}
        backdropOpacity={0.2} backdropColor='gray'>
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
              } placeholder="Amount" keyboardType="numeric" onChangeText={AmountHandler} ref={(val) => AmountTxt = val}>
                {Amount}
              </TextInput>
            </View>


          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput style={Styles('').ListModelTextInput}
              placeholder="Description" multiline={true} onChangeText={DescriptionHandler}
              ref={(val) => DescriptionTxt = val}>{Description}
            </TextInput>
          </View>

          <View style={[Styles('').container, { flexDirection: 'row', alignSelf: 'center' }]}>


            {(!IsUpdate) ? <TouchableOpacity style={Styles({ btnColor: 'orange' }).btn} activeOpacity={0.6} onPress={SaveHandler}>
              <Text style={Styles('').btnTxt}>Save</Text>
            </TouchableOpacity>
              :
              <TouchableOpacity style={Styles({ btnColor: 'orange' }).btn} activeOpacity={0.6} onPress={() => UpdateHandler(UpdateKey)}>
                <Text style={Styles('').btnTxt}>Update</Text>
              </TouchableOpacity>
            }

            <TouchableOpacity style={Styles({ btnColor: 'red' }).btn} activeOpacity={0.6} onPress={CancelBtnHandler}>
              <Text style={Styles('').btnTxt}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
      <View>
        <FlatList
          data={DATA}
          keyExtractor={(key) => key.key}
          renderItem={item => renderItem(item)}
          onEndReachedThreshold={0.5}
          onEndReached={OnEndHandler}
        >

        </FlatList>
      </View>



    </View>
  )
}

export default ListData