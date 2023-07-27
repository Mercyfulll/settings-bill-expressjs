import assert from 'assert';
import settingsBill from '../settings-bill.js';

describe("The totals function test", function(){
    it("It should be able to use the value inputs bring total for calls at R2.50 each" , function(){
        let bill = settingsBill();
        bill.setCallCost(2.50)
        bill.setSmsCost(0.70)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.makeCall();

        assert.equal(10.0, bill.getTotalCost())
        assert.equal(10.0, bill.getTotalCallCost())
        assert.equal(0.00, bill.getTotalSmsCost())

    })

    it("It should be able to use the value inputs bring total for calls at R3 and sms R 0.50 each" , function(){
        let bill = settingsBill();
        bill.setCallCost(3)
        bill.setSmsCost(0.50)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.sendSms();
        bill.sendSms();

        assert.equal(10, bill.getTotalCost())
        assert.equal(9, bill.getTotalCallCost())
        assert.equal(1.00, bill.getTotalSmsCost())

    })

    
    it("It should be able to use the value inputs bring total for sms at R 0.65 each" , function(){
        let bill = settingsBill();
        bill.setCallCost(0)
        bill.setSmsCost(0.65)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.sendSms();
        bill.sendSms();

        assert.equal(1.30, bill.getTotalCost())
        assert.equal(0.00, bill.getTotalCallCost())
        assert.equal(1.30, bill.getTotalSmsCost())

    });
})