export type UserParams = {
    dtStart: Date,
    dtEnd: Date,
    filterList: Array<CheckBoxData>
}
export type CheckBoxData = {
    key:string,
    value:string,
    label:string,
    isSelected:boolean
}

export type userCard = {
    name?:string,
    pictureUrl?:string,
    id?:string,
    status?:string,
}
export type FilterOption= {
    from:Date,
    to:Date,
    checkboxList:Array<CheckBoxData>
}
