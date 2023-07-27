import assert, { deepEqual } from 'assert'
import settingsBill from '../settings-bill.js'

let settingBill = settingsBill()

describe("The setCosts function ",()=>{
    let amount = {
        callCost: 5,
        smsCost : 2,
        warningLevel: 20,
        criticalLevel: 40
    }
    

    settingBill.setCosts(amount)
    
    
    it("It should return 5 as callCost",()=>{
        assert.equal(5,settingBill.getCosts().callCost)
    })
    it("It should return 2 as smsCost",()=>{
        assert.equal(2,settingBill.getCosts().smsCost)
    })
    it("It should return 20 as warningLevel",()=>{
        assert.equal(20,settingBill.getCosts().warningLevel)
    })
    it("It should return 40 as warningLevel",()=>{
        assert.equal(40,settingBill.getCosts().criticalLevel)
    })
    it("It should return an object with set values",()=>{
        assert.deepEqual({
            callCost: 5,
            smsCost : 2,
            warningLevel: 20,
            criticalLevel: 40
        },settingBill.getCosts())
    })
   
})