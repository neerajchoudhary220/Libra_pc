import React from "react";
import { View, FlatList ,Text} from 'react-native';
const DATA = [
    {
        name: 'Neeraj',
        age: 24
    },
    {
        name: 'Girja',
        age: 20
    },
    {
        name: 'Girja',
        age: 20
    },
    {
        name: 'Girja',
        age: 20
    },
    {
        name: 'Girja',
        age: 20
    },
    {
        name: 'Girja',
        age: 20
    },
    {
        name: 'Girja',
        age: 20
    },
    
];
const MyItam = ({ item}) => (
    
      <Text style={{fontSize:30}}>{item.name} ({item.age})</Text>
    
  );
const Myflatlist = () => {

        const renderItem = ({ item }) => {
          return (
            <MyItam
              item={item}
            />
          )
        }
    return (
    <View style={{ flex: 1 }}>
        <Text>FlatList</Text>
        <FlatList data={DATA} renderItem={renderItem}></FlatList>
    </View>)
}
export default Myflatlist