import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: 'libra_price.db' });

const DataPicker = (props) => {
    const [SelectData, SetSelectData] = useState();
    const [DATA, setData] = useState([]);

    // useEffect(() => { 
        
    // }, [])

    const selectBtn = (id) => {
        SetSelectData(id);
    }
    return (<View>
        <Picker style={{ marginVertical: 10 }}
            selectedValue={SelectData}
            onValueChange={(val) => { selectBtn(val) }}
        >
            {
                props.map((l) => (
                    <Picker.Item label={l.name} value={l.id} />
                ))
            }
        </Picker>
    </View>)
}

export default DataPicker