import moment from "moment"

export default function settingsBill(){
    var smsCost = 0
    var callCost = 0
    var warningLevel = 0
    var criticalLevel = 0
    var actionList = []
    var thecallCost = 0;
    var theSmsCost = 0;
    var theWarningLevel = 0;
    var theCriticalLevel = 0;
    var theTotalCallCost = 0
    var theTotalSmsCost = 0;
    var theTotalCost = 0;

    function setCosts(amount){
        smsCost = Number(amount.smsCost);
        callCost = Number(amount.callCost);
        warningLevel = (amount.warningLevel);
        criticalLevel = (amount.criticalLevel)
        
    }
    function getCosts(){
        return{
            smsCost,
            callCost,
            warningLevel,
            criticalLevel,
        }
    }
    function checkbox(action) {

        let cost = 0 
        
        if (action === 'sms'){
        cost = smsCost;
        }
        else if (action === 'call'){
        cost = callCost;
        }
        if (cost > 0)
        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        })
    }
    function ago(){
        let timeList = []
        for (let i = 0; i < actionList.length; i++) {
             time = moment(actionList[i].timestamp).fromNow() 
             timeList.push(time)
             return timeList
        }

    }
    // function getTotal(){
    //     total = smsCost + callCost
    //     return total
    
    // }
    function actions(){
        return actionList;
    }

    function actionsFor(type){
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }
    
    function getTotal(type) {
        let total = 0;
        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;

        // the short way using reduce and arrow functions

        // return actionList.reduce((total, action) => { 
        //     let val = action.type === type ? action.cost : 0;
        //     return total + val;
        // }, 0);
    }

    function grandTotal() {
        return getTotal('sms') + getTotal('call');
    }

    function totals() {
        let smsTotal = getTotal('sms').toFixed(2)
        let callTotal = getTotal('call').toFixed(2)
        return {
            smsTotal,
            callTotal,
            grandTotal : grandTotal().toFixed(2)
        }
    }

    function hasReachedWarningLevel(){
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel 
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel(){
        const total = grandTotal();
        return total >= criticalLevel;
    }
    function setCallCost(callCost){
        thecallCost = callCost;
    }
    function getCallCost(){
        return thecallCost;
    }
    function setSmsCost(SmsCost){
        theSmsCost = SmsCost;
    }
    function getSmsCost(){
        return theSmsCost;
    }
    function setWarningLevel(wLevel){
        theWarningLevel = wLevel;
    }
    function getWarningLevel(){
        return theWarningLevel
    }
    function setCriticalLevel(cLevel){
        theCriticalLevel = cLevel;
    }
    function getCriticalLevel(){
        return theCriticalLevel
    }
    function makeCall(){
        if(!ReachedCriticalLevel()){
        theTotalCallCost += thecallCost
        }
    }
    function sendSms(){
        if (!ReachedCriticalLevel()){
            theTotalSmsCost += theSmsCost
        }
        
    }
    function getTotalCallCost(){
        return theTotalCallCost
    }
    function getTotalSmsCost(){
        return theTotalSmsCost
    }
    function getTotalCost(){
         theTotalCost = theTotalSmsCost + theTotalCallCost
         return theTotalCost
    }
    function ReachedCriticalLevel(){
        getTotalCost() >= getCriticalLevel()
    }
    function totalClassName(){
        if(getTotalCost() >= getCriticalLevel()){
            return "critical"
        }

        if(getTotalCost() >= getWarningLevel())
            return "warning"
    }

    return{
        ago,
        setCosts,
        getCosts,
        checkbox,
        getTotal,
        actionsFor,
        actions,
        grandTotal,
        totals,
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        sendSms,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        totalClassName,
        ReachedCriticalLevel,
        hasReachedWarningLevel,
        hasReachedCriticalLevel
    }
}