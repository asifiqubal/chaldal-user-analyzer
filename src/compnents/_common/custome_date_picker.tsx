import React, {useEffect, useRef, useState} from 'react';
import {View, Button, Platform, Text, TouchableOpacity, Animated, Modal, Dimensions, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ui from "../_cfg/ui";
import {DateFormatFM} from "./DTUtils";
let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    modalBody: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width,
        height,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    center:{
        justifyContent:'center',
        alignItems:'center'
    },
})
interface CustomDTPProps {
    value:Date,
    onChange:(data:Date)=>void
}
export const CustomDTP = ({onChange,value}:CustomDTPProps) => {
    const [date, setDate] = useState(value);
    const [show, setShow] = useState(false);

    const onSelect = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        onChange(currentDate)
    };

    const animation =  useRef(new Animated.Value(0)).current;


    const toggleModal = (visibility: boolean) => {
        if (visibility) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(
                ()=>setShow(false)
            );
        }
    };
    const onSetModal = animation.interpolate({
        inputRange:[0,1],
        outputRange:[height,0],
        extrapolate:'clamp'
    })
    const open = {
        transform:[
            {translateY:onSetModal}
        ]
    }
    useEffect(()=>{
        toggleModal(show)
    },[show])

    return (
        <View style={{height:40,flex:1}}>
            <TouchableOpacity
                onPress={()=>setShow(true)}
                style={{height:40,justifyContent:'center',flex:1,borderWidth:1,borderColor:ui.color.border_primary,padding:8}}>
                <Text>{DateFormatFM(date)}</Text>
            </TouchableOpacity>
            {show && Platform.OS === 'android'&& (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display="spinner"
                    // @ts-ignore
                    onChange={(event: any, selectedDate: Date)=>onSelect(event,selectedDate)}
                />
            )}
            {show && Platform.OS === 'ios'&& (
                <Modal transparent visible={show && Platform.OS === 'ios'} onRequestClose={()=>toggleModal(false)}>
                    <Animated.View style={[styles.modalBody, open]} >
                        <View style={{backgroundColor:ui.color.white,width:'100%',}}>
                            <View style={{height:40,width:'100%',backgroundColor:ui.color.white,flexDirection:'row',paddingHorizontal:16,paddingVertical:8,justifyContent: 'space-between',
                                alignItems: 'center',}}>

                                <TouchableOpacity onPress={()=>toggleModal(false)} style={{height:40,justifyContent:'center',padding:8}}>
                                    <Text style={{color:ui.text.error}}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>toggleModal(false)} style={{height:40,justifyContent:'center',padding:8}}>
                                    <Text style={{color:ui.text.primary}}>Done</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{width:'100%',backgroundColor:ui.color.white}}>
                                <DateTimePicker
                                    value={date}
                                    mode={'date'}
                                    display="spinner"
                                    textColor={ui.color.black}
                                    // @ts-ignore
                                    onChange={onSelect}
                                />

                            </View>
                        </View>
                    </Animated.View>
                </Modal>
            )}
        </View>
    );
};

