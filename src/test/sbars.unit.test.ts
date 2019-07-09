import {expect} from 'chai';
import SBars, {IOrderType, IOrder} from '../sBars';
import 'mocha';

describe('sbars lib', function(){
  it('should allow the user to register an order', function() {
    const orderType = IOrderType.BUY;

    const newOrder: IOrder = {
      userId:"Sam Smith",
      orderQuantity:3.5,
      pricePerKg: 303,
      orderType: orderType
    };
    const sbars = new SBars({});
    // the registerOrder should return "OK" if order registered successfully
    expect(sbars.registerOrder(newOrder)).to.equal('OK');
  })
})

