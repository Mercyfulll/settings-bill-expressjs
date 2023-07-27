export default function settingsBill(){
    var smsCost = 0
    var callCost = 0
    var warningLevel = 0
    var criticalLevel = 0
    var actionList = []

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

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        })
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
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        return {
            smsTotal,
            callTotal,
            grandTotal : grandTotal()
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

    return{
        setCosts,
        getCosts,
        checkbox,
        getTotal,
        actionsFor,
        actions,
        grandTotal,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel
    }
}