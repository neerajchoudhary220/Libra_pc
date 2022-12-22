import React, { useEffect } from "react";
import { openDatabase } from "react-native-sqlite-storage";
import Tabs from "./components/Tabs";
import SplashScreen from "react-native-splash-screen";

var db = openDatabase({ name: 'libra_price.db' });
function App() {
    useEffect(() => {
        SplashScreen.hide();
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='price_data'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS price_data', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS price_data(id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(20), price INT(10),\
                            isSelected VARCHAR(10) NOT NULL DEFAULT "false",\
                            created_at VARCHAR(20))',
                            []
                        );
                    }
                }
            );
        });


    }, []);

    return (<Tabs></Tabs>);
}
export default App