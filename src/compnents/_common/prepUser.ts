// import userArray from "./userList";

async function getAllUser() {
    return  await require('./userList')
}

async function PrepUser() {
    const ul = await getAllUser()
    // console.log(ul.default)
    const result = await ul.default.reduce(async (acc: any, cur: any)=> {
        const tempAcc = await acc;

        const tempMealKey = Object.keys(cur.calendar.mealIdToDayId)
        // @ts-ignore
        const ml = await tempMealKey.reduce(async (a: any, c: any) => {
            const tempA = await a
            const pa = tempA[cur.calendar.mealIdToDayId[c]] ? tempA[cur.calendar.mealIdToDayId[c]] : null
            tempA[cur.calendar.mealIdToDayId[c]] = pa && pa.length ? [...pa, c] : [c]
            return a
        }, Promise.resolve({}))

        // @ts-ignore
        const tempDateKey = Object.keys(cur.calendar.dateToDayId)
        const mealPlan = await tempDateKey.reduce(async (a2: any, c2: any) => {
            const mpAcc = await a2
            if (mpAcc[c2] && ml[cur.calendar.dateToDayId[c2]]) {
                mpAcc[c2] = [...mpAcc[c2], ...ml[cur.calendar.dateToDayId[c2]]]
            } else if (ml[cur.calendar.dateToDayId[c2]]) {
                mpAcc[c2] = [...ml[cur.calendar.dateToDayId[c2]]]
            }
            return mpAcc
        }, Promise.resolve({}))

        tempAcc.push({profile: cur.profile, mealPlan})

        return tempAcc

    },Promise.resolve([]))

    console.log(result)
    return result
}
function getStatus(cm:string[] , pm:string[]) {
    if (cm.length>10)
        return 'Super Active'
    else if (cm.length>=5)
        return 'Active'
    else if (cm.length<5 && pm.length>=5 && pm.length<=10)
        return 'Bored'
}
async function FilteredUser(fromDate: Date, toDate:Date) {
    const userList = await PrepUser()
    // const fromDate = new Date("2016-09-01")
    // const toDate = new Date("2016-09-08")

    return userList.reduce((acc: any, curr: { mealPlan: {}; profile:{} })=>{
       const tempDT = Object.keys(curr.mealPlan)
        let currMeal: string[] = [];
       let prevMeal: string[] = [];
       tempDT.filter(data=>{
           const date = new Date(new Date(data).setHours(0,0,0))
           console.log("to", date <= new Date(toDate.setHours(0,0,0)),date,new Date(toDate.setHours(0,0,0)),)
           console.log('from',date >= fromDate )

           if(date >= new Date(fromDate.setHours(0,0,0)) && date <= new Date(toDate.setHours(0,0,0)))
           {
               // @ts-ignore
               // console.log(curr.mealPlan[data])
               // @ts-ignore
               currMeal.push(...curr.mealPlan[data])
           }
           else if (date < new Date(fromDate.setHours(0,0,0)))
           {
               // @ts-ignore
               prevMeal.push(...curr.mealPlan[data])
           }
       })
        // console.log(currMeal,prevMeal);
       const user = {
           ...curr.profile,
           currMeal,
           prevMeal,
           status:getStatus(currMeal,prevMeal)
       }
       acc.push(user)
        return acc
    },[])
}
export {getAllUser,PrepUser,FilteredUser}
