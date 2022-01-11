function DateFormatFM(props:Date) {
    let date = new Date()
    if (props)
        date = props

    // @ts-ignore
    const {dd,mm,yyyy} = DTObject(date);
    // @ts-ignore
    const fm = monthsFull[mm]

    return [dd,fm,yyyy].join(' ')
}

function DTObject(date: Date){
    if (!date)
        return "Please set date"
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();
    const HH = date.getHours();
    const MM = date.getMinutes();
    const wd = date.getDay();
    return {dd:Print2D(dd),mm:Print2D(mm),yyyy,HH:Print2D(HH),MM:Print2D(MM),wd:Print2D(wd)}
}

/**
 */
function Print2D( src_number: number )
{
    return src_number.toString().padStart( 2, '0' )
}

/**
 */
const dayShort = {
    "00": 'Sun',
    "01": 'Mon',
    "02": 'Tue',
    "03": 'Wed',
    "04": 'Thu',
    "05": 'Fri',
    "06": 'Sat',
}
/**
 */
const dayFull = {
    "00": 'Sunday',
    "01": 'Monday',
    "02": 'Tuesday',
    "03": 'Wednesday',
    "04": 'Thursday',
    "05": 'Friday',
    "06": 'Saturday',
}
/**
 */
const monthsShort = {
    "00": 'Jan',
    "01": 'Feb',
    "02": 'Mar',
    "03": 'Apr',
    "04": 'May',
    "05": 'Jun',
    "06": 'Jul',
    "07": 'Aug',
    "08": 'Sep',
    "09": 'Oct',
    "10": 'Nov',
    "11": 'Dec',
}

/**
 */
const monthsFull = {
    "00": 'January',
    "01": 'February',
    "02": 'March',
    "03": 'April',
    "04": 'May',
    "05": 'June',
    "06": 'July',
    "07": 'August',
    "08": 'September',
    "09": 'October',
    "10": 'November',
    "11": 'December'
}


/**
 */
const superscript =(dt: string)=> {
    switch(dt){
        case "01": return "st";
        case "21": return "st";
        case "31": return "st";
        case "02": return "nd";
        case "22": return "nd";
        case "03": return "rd";
        case "23": return "rd";
        default: return "th"
    }
}

export {DateFormatFM}
