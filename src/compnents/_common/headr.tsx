import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import ui from "../_cfg/ui";

interface HeaderProps {

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:ui.color.primary,
        height:52
    }
})
interface HeaderProps {
    children?:any
}
const Header = ({children}:HeaderProps) =>{
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Header
