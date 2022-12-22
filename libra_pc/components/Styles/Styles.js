import React from "react";
import { StyleSheet } from "react-native";
import StaticData from "../StaticData";
import FlatList from "../Myflatlist";
export const Styles = (props) => StyleSheet.create({
    mainContainer: {
        backgroundColor: props.colorName, flex: 1
    },
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    inputContainer: {
        marginVertical: 10,
        marginHorizontal: 6,
        flexDirection: 'row',
    },
    btn: {
        backgroundColor: props.btnColor,
        elevation: 10,
        borderRadius: 10,
        alignSelf: 'center',
        paddingVertical: 10,
        marginLeft: 10,
        paddingHorizontal: 50,
        fontFamily: StaticData().AppFontFamily,
    },
    btnTxt: {
        color: StaticData().AppBtnTxtColor
    },
    inputGroup: {
        borderColor: StaticData().AppColor,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        width: 190,

    },
    hr: {
        // flex:1,
        borderWidth: 2,
        borderColor: StaticData().AppColor,
        backgroundColor: StaticData().AppColor
    },
    title: {
        color: StaticData().AppColor,
        fontSize: 30,
        fontFamily: StaticData().AppFontFamily
    },
    inputField: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
        fontFamily: StaticData().AppFontFamily

    },


    label: {
        // marginHorizontal:10,
        alignSelf: 'center',
        fontFamily: StaticData().AppFontFamily

    },
    inputLabel: {
        fontFamily: StaticData().AppFontFamily,

    },
    MyTxtInput: {
        borderColor: StaticData().AppColor,
        borderWidth:1,
        width: 240,
        borderRadius: 10
    },
    deleteBtn:{
        marginTop:3,
        marginBottom:3,
        borderWidth:1,
        alignSelf:'center',
        borderColor:'red',
        paddingVertical:2,
        marginRight:2,
        paddingHorizontal:3,
        borderRadius:4,
    },
    model:{
        backgroundColor:'white',
        borderRadius:8,
        paddingHorizontal:10,
        paddingVertical:14,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
    },
  
})