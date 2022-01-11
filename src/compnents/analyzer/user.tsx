import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity, TextInput
} from "react-native";
import {Routes, StackNavigationProps} from "../navigation";
import ui from "../_cfg/ui";
import Header from "../_common/headr";
import React, {useEffect, useState} from "react";
import * as url from "url";
import {userCard, UserParams} from "../_cfg/types";
import userArray from "../_common/userList";
import {FilteredUser} from "../_common/prepUser";
import {MaterialCommunityIcons, Octicons} from "@expo/vector-icons";

let { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    top:{
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
    filterBox:{
        borderWidth:1,
        borderColor:ui.color.border_primary,
        width:width*.9,
        alignSelf:'center',
        padding:8,
        paddingBottom:16
    },
    shadow:{
        backgroundColor:ui.color.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.12,
        shadowRadius: 1.22,
        elevation: 5,
    }
})

const User = ({route,navigation}:StackNavigationProps<Routes,'Filter'>) =>{
    const {params} = route
    // @ts-ignore
    const {dtStart, dtEnd,filterList}:UserParams = params
    const [userList, SetUserList] = useState(null)
    const [startDate, SetStartDate] = useState(dtStart)
    const [endDate, SetEndDate] = useState(dtEnd)
    const [checkBoxData, UpdateCheckBoxData] = useState(filterList)
    const [searchText, SetSearchText] = useState('')

    console.log(dtStart,dtEnd,filterList)

    function checkStatus(status:string) {
        switch (status) {
            case "Active": return checkBoxData[0].isSelected
            case "Super Active": return checkBoxData[1].isSelected
            case "Bored": return checkBoxData[2].isSelected
            default : return false
        }
    }

    function onSearch (val: string, list: any[])
    {
        return list.filter(data=>{
            const name = data?.name
            if (name.trim().toLowerCase().includes(val.trim().toLowerCase())){
                return data
            }
        })
    }

    function statusFilter(data: any[] ) {
        console.log(data)
        if (searchText && searchText.length>2)
            data = onSearch(searchText,data)
        if (!data)
            return []
        return data.filter(data=> checkStatus(data.status))
    }
    useEffect(()=>{
        FilteredUser(startDate,endDate).then((data)=> {
            // console.log("done", data)
            SetUserList(data)
        })

    },[])
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={ui.color.white}
                barStyle={'dark-content'}
            />
            <Header>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={{height:'100%',width:56,alignItems:'center',justifyContent:'center'}}>
                    <MaterialCommunityIcons name="arrow-left" size={34} color={ui.color.white}  />
                </TouchableOpacity>
            </Header>
            <View style={{height:35,width:'100%',}}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={{height:'100%',width:"95%",alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
                    <Text style={{color:ui.text.primary_light,paddingHorizontal:4}}>Edit Filter</Text>
                    <Octicons name="settings" size={20} color={ui.color.primary_light} style={{transform: [{ rotate: '90deg'}]}}/>
                </TouchableOpacity>
            </View>
            <View style={{height:56,justifyContent:'center',alignItems:'center'}}>
                <TextInput
                    style={{justifyContent:'center',width:'80%',borderWidth:1,borderColor:ui.color.border_primary,padding:8}}
                    onChangeText={text =>SetSearchText(text)}
                    placeholder={"Search user"}
                    placeholderTextColor={ui.text.light}
                />
            </View>
            <View style={{alignItems:'center',marginTop:16,marginBottom:56}}>
                <FlatList
                    // @ts-ignore
                    data={statusFilter(userList)}
                    extraData={userList}
                    // style={{alignItems:'center'}}
                    columnWrapperStyle={{}}
                    renderItem={({item})=><UserCard id={item.id} name={item.name} pictureUrl={item.pictureUrl} status={item.status}/>}
                    numColumns={2} />
            </View>


        </SafeAreaView>
    )
}

export default User

function UserCard({name,id,pictureUrl,status}:userCard) {
    const imgSource = pictureUrl && pictureUrl.length>1 ?{uri:pictureUrl}:require('../../assets/img/User_ring.png')
    return(
        <View style={{width:width*.4,height:height*.3,...styles.shadow,margin:8}}>
            <Image
                style={{width:'100%',height:'80%',resizeMode:'cover'}}
                source={imgSource}/>
            <Text style={{color:ui.text.light,padding:4}}>{name}</Text>
            <Text style={{color:ui.text.light,padding:4}}>{id}</Text>
            <Text style={{position:'absolute',right:8,top:4,paddingVertical:4,paddingHorizontal:8,backgroundColor:ui.color.primary_light}}>{status}</Text>

        </View>
    )
}
