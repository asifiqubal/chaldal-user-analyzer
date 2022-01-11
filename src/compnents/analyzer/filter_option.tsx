import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ui from "../_cfg/ui";
import {CustomDTP} from "../_common/custome_date_picker";
import CheckBox from "../_common/check_box";
import React, {useState} from "react";
import {CheckBoxData} from "../_cfg/types";
let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    filterBox:{
        borderWidth:1,
        borderColor:ui.color.border_primary,
        width:width*.9,
        alignSelf:'center',
        padding:8,
        paddingBottom:16
    }
})

interface FilterOptionProps {
    from:Date,
    to:Date,
    checkboxList:Array<CheckBoxData>
    onSubmit:(data: {to:Date, from: Date, checkboxList:Array<CheckBoxData>})=>void
}
function FilterOption({checkboxList,from,to,onSubmit}:FilterOptionProps) {
    const [cbData, UpdateCBData] = useState(checkboxList)
    const [dtStart, SetDTStart] = useState(from)
    const [dtEnd, SetDTEnd] = useState(to)

    return(
        <View style={styles.filterBox}>
            <View style={{borderBottomColor:ui.color.border,borderBottomWidth:1.5}}>
                <Text style={{fontSize:22,color:ui.text.primary}}>Date</Text>
            </View>
            <View style={{marginVertical:8,paddingVertical:8,}}>
                <View style={{flexDirection:'row',alignItems:'center',marginVertical:8}}>
                    <Text style={{width:40,color:ui.text.primary_light}}>From</Text>
                    <CustomDTP value={dtStart} onChange={(data: React.SetStateAction<Date>)=>SetDTStart(data)}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginVertical:4}}>
                    <Text style={{width:40,color:ui.text.primary_light}}>To</Text>
                    <CustomDTP value={dtEnd} onChange={(data: React.SetStateAction<Date>)=> {
                        // console.log("dtChange",data)
                        SetDTEnd(data)
                    }}/>
                </View>
            </View>
            <View style={{borderBottomColor:ui.color.border,borderBottomWidth:1.5}}>
                <Text style={{fontSize:22,color:ui.text.primary}}>Status</Text>
            </View>
            <CheckBox data={cbData} onChange={(data)=>UpdateCBData(data)}/>
            <TouchableOpacity
                onPress={()=>{
                    console.log(dtStart)
                    onSubmit({to:dtEnd,from:dtStart,checkboxList:cbData})
                }}
                style={{height:50,width:150,backgroundColor:ui.color.primary,borderRadius:8,alignItems:'center',justifyContent:'center',alignSelf:'center'}}
            >
                <Text style={{color:ui.text.white}}>Generate</Text>
            </TouchableOpacity>
        </View>
    )
}
export default FilterOption
