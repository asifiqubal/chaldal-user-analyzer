import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ui from "../_cfg/ui";
import {CheckBoxData} from "../_cfg/types";

interface CheckBoxProps {
    data:Array<CheckBoxData>,
    onChange: (data:Array<CheckBoxData>)=>void
}
function CheckBox({data,onChange}:CheckBoxProps) {
    const [items,SetItems] = useState(data)

    useEffect(()=>{
        SetItems(data)
    },[data])
    useEffect(()=>{
        onChange(items)
    },[items])

    return(
        <View>
            <FlatList
                data={data}
                // @ts-ignore
                renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity
                            onPress={()=>{
                                SetItems(prevState => {
                                    prevState[index] = {...item, isSelected: !item.isSelected};
                                    return [...prevState]
                                })
                            }}
                            style={{flexDirection:'row',paddingVertical:4}}>
                            <MaterialCommunityIcons
                                name={item.isSelected?"checkbox-marked":"checkbox-blank-outline"}
                                size={24}
                                color={item.isSelected?ui.color.primary:ui.color.primary_light} />
                            <Text style={{marginHorizontal:4}}>{item.label}</Text>

                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )

}
export default CheckBox
