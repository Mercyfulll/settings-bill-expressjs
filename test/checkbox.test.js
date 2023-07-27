import assert from 'assert';
import settingsBill from '../settings-bill.js';

describe("The checkbox function ",()=>{
    let bill = settingsBill()

    let amount = {
        callCost: 2.45,
        smsCost : 0.75,
        warningLevel: 60,
        criticalLevel: 90
    }
     
    bill.setCosts(amount)
    bill.checkbox('call')
    
    

    it("If call selected cost must be callCost '2.45'", ()=>{
        assert.equal(2.45,bill.getCosts().callCost)
    })
    it("If sms selected cost must be smsCost '0.75'", ()=>{
        assert.equal(0.75,bill.getCosts().smsCost)
    })
})