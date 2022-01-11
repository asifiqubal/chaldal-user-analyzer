import React, {useEffect, useState} from 'react'
import {Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import ui from "../_cfg/ui";
import Header from "../_common/headr";
import {CustomDTP} from "../_common/custome_date_picker";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CheckBox from "../_common/check_box";
import {Routes, StackNavigationProps} from "../navigation";
import {FilteredUser, getAllUser, PrepUser} from "../_common/prepUser";
import FilterOption from "./filter_option";
import {CheckBoxData,} from "../_cfg/types";

let { width, height } = Dimensions.get('window')

interface FilterProps {

}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    top:{
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
})

const data =[
    {key:"actv",value:"actv", label:"Active",isSelected:false},
    {key:"sup-actv",value:"sup-actv", label:"Super Active",isSelected:false},
    {key:"brd",value:"brd", label:"Bored",isSelected:false},
]
const Filter = ({route,navigation}:StackNavigationProps<Routes,'Filter'>) =>{

    // console.log(new Date('2016-07-04'))


    console.log(navigation)
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={ui.color.white}
                barStyle={'dark-content'}
            />
            <Header />
            <View style={styles.top}>
                <Text style={{fontSize:24,fontWeight:'700',color:ui.text.primary}}>User Analyzer</Text>
                <Text style={{color:ui.text.light}}>Select filters to generate report</Text>
            </View>
            <FilterOption
                onSubmit={(props: { to: Date; from: Date; checkboxList: Array<CheckBoxData>; })=>{
                    console.log(props)
                    return navigation.navigate('User', {
                        dtEnd: props.to,
                        dtStart: props.from,
                        filterList: props.checkboxList
                    });
            }} checkboxList={data} from={new Date()} to={new Date()}/>

        </SafeAreaView>
    )
}

export default Filter
