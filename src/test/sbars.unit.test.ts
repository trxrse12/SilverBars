import {expect} from 'chai';
import SBars, {IOrderType, IOrder} from '../sBars';
import 'mocha';

describe('sbars lib', function(){
  const orderType = IOrderType.BUY;

  const newOrder: IOrder = {
    orderId: 1,
    userId:"Sam Smith",
    orderQuantity:3.5,
    pricePerKg: 303,
    orderType: orderType
  };
  const sbars = new SBars({});

  let sbarsRegisterReponse:string = "";

  beforeEach(() => {
    sbars.clearOrders();
    sbarsRegisterReponse = sbars.registerOrder(newOrder);
  });

  it('should allow the user to register an order', function() {
    // the registerOrder should return "OK" if order registered successfully
    expect(sbarsRegisterReponse).to.equal("OK");
    expect(sbars.getOrder(newOrder.orderId)[0]).to.deep.equal(newOrder);
  });

  it('should NOT allow the user to recreate an existing order', function(){
    // re-register an order:
    // the registerOrder should throw if order already stored
    expect(() => sbars.registerOrder(newOrder)).to.throw("Order already stored");
  })

  it('should NOT allow the creation of an empty order', function() {
    const emptyOrder: IOrder = {
      orderId: 2,
      userId:"John Dow",
      orderQuantity:0,
      pricePerKg: 303,
      orderType: orderType
    };

    // the register should throw if order empty (quantity 0):
    expect(() => sbars.registerOrder(emptyOrder)).to.throw("Empty order");
  })
});

