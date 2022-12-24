import React, { useEffect, useState } from "react";
import { View, Text, Button, StatusBar, Image, TouchableOpacity } from 'react-native';

import database from '@react-native-firebase/database';
import ListModel from "./ListModel";

const ListData = ({ navigation }) => {
  const [ModelShow, SetModelShow] = useState(false);
  const ShowModelHandler = () => {
    SetModelShow(true);
  }
  const HideModel = () => {
    SetModelShow(false);
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} style={{ elevation: 0.8 }} onPress={ShowModelHandler}>
          <Image source={require('../icons/add.png')} style={{ height: 25, width: 25 }}></Image>

        </TouchableOpacity>
      ),
    })
  }, [navigation]);

  const DateHandler = () => {

  }
  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <ListModel visibility={ModelShow} CancelFun={HideModel}
        openDate={DateHandler}
      ></ListModel>
      <Text style={{ alignSelf: 'center' }}>Fire base screen</Text>
    </View>
  )
}

export default ListData