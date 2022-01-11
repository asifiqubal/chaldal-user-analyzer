import {ParamListBase,RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from "@react-navigation/stack"
import { UserParams} from "./_cfg/types";
export interface StackNavigationProps<ParamList extends ParamListBase,RouteName extends keyof ParamList = string>
{
    navigation: StackNavigationProp<ParamList, RouteName>;
    route: RouteProp<ParamList, RouteName>
}

export type Routes = {
    Filter:undefined,
    User:UserParams
}
