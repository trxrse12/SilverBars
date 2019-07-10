import {expect} from 'chai';
import SBars, {IOrder, IOrderType} from '../sBars';
import 'mocha';

describe('sbars lib', function() {
  const newOrder: IOrder = {
    orderId: 1,
    userId: "Sam Smith",
    orderQuantity: 3.5,
    pricePerKg: 303,
    orderType: IOrderType.BUY
  };
  const sbars = new SBars({});

  let sbarsRegisterReponse: string = "";

  describe('Feature: create orders', function(){
    beforeEach(() => {
      sbars.clearOrders();
      sbarsRegisterReponse = sbars.registerOrder(newOrder);
    });

    it('should allow the user to register an order', function () {
      // the registerOrder should return "OK" if order registered successfully
      expect(sbarsRegisterReponse).to.equal("OK");
      expect(sbars.getOrder(newOrder.orderId)[0]).to.deep.equal(newOrder);
    });

    it('should NOT allow the user to recreate an existing order', function () {
      // re-register an order:
      // the registerOrder should throw if order already stored
      expect(() => sbars.registerOrder(newOrder)).to.throw("Order already stored");
    });

    it('should NOT allow the creation of an empty order', function () {
      const emptyOrder: IOrder = {
        orderId: 2,
        userId: "John Dow",
        orderQuantity: 0,
        pricePerKg: 303,
        orderType: IOrderType.BUY
      };
      // the register should throw if order empty (quantity 0):
      expect(() => sbars.registerOrder(emptyOrder)).to.throw("Invalid order");
    });

    it('should NOT allow the creation of an invalid order', function () {
      const invalidOrder: IOrder = {
        orderId: 3,
        userId: "John Dow",
        orderQuantity: -120,
        pricePerKg: 303,
        orderType: IOrderType.BUY
      };
      // the register should throw if order empty (quantity 0):
      expect(() => sbars.registerOrder(invalidOrder)).to.throw("Invalid order");
    });
  });

  // Cancel orders testing
  describe('Feature: delete orders', function() {
    beforeEach(() => {
      sbars.clearOrders();
      sbarsRegisterReponse = sbars.registerOrder(newOrder);
    });

    it('should throw if the user cancels an inexistent order', function () {
      const inexistentOrderId = 2300;
      expect(() => sbars.cancelOrder(inexistentOrderId)).to.throw("Order does not exist");
    });

    it ('should allow a user to delete a pre-existing order', function () {
      sbarsRegisterReponse = sbars.cancelOrder(newOrder.orderId);
      expect(sbarsRegisterReponse).to.equal('OK');
      expect(sbars.getOrder(newOrder.orderId)).to.be.empty;
    })
  });

  // Get summary info
  describe('Feature: get summary information', function() {
    const orders = [
      {
        orderId: 200,
        userId: "user2",
        orderQuantity: 1.2,
        pricePerKg: 310,
        orderType: IOrderType.SELL
      },
      {
        orderId: 300,
        userId: "user3",
        orderQuantity: 1.5,
        pricePerKg: 307,
        orderType: IOrderType.SELL
      },
      {
        orderId: 100,
        userId: "user1",
        orderQuantity: 3.5,
        pricePerKg: 306,
        orderType: IOrderType.SELL
      },
      {
        orderId: 600,
        userId: "user4",
        orderQuantity: 13.0,
        pricePerKg: 303,
        orderType: IOrderType.BUY
      },
      {
        orderId: 400,
        userId: "user4",
        orderQuantity: 2.0,
        pricePerKg: 306,
        orderType: IOrderType.SELL
      },
      {
        orderId: 800,
        userId: "user5",
        orderQuantity: 65.0,
        pricePerKg: 303,
        orderType: IOrderType.BUY
      },
      {
        orderId: 900,
        userId: "user4",
        orderQuantity: 13.0,
        pricePerKg: 306,
        orderType: IOrderType.BUY
      },
    ];
    beforeEach(() => {
      sbars.clearOrders();
      sbarsRegisterReponse = "";
      orders.forEach(order => sbarsRegisterReponse = sbars.registerOrder(order));
    });
    it('sbars should have registered all the orders in the array', function(){
        orders.map(order => {
          expect(sbars.getOrder(order.orderId)[0].orderId).to.be.equal(order.orderId);
      })
    });

    describe('sbars should produce the summary grouped per unit price', function(){
      it('should produce a concise summary for SELL transactions', function() {
        let summarySoldTestData = [{'306': 5.5}, {'307': 1.5}, {'310': 1.2}];
        expect( sbars.getSummary(IOrderType.SELL)).to.deep.equal(summarySoldTestData);
      });
      it('should produce a concise summary for BUY transactions', function() {
        let summarySoldTestData = [{'303':78},{'306': 13}];
        expect( sbars.getSummary(IOrderType.BUY)).to.deep.equal(summarySoldTestData);
      });
    });

    // describe('sbars should produce ', function(){
    //   it('summaries starting with lowest price first for SELL transactions', function() {
    //     let summarySoldTestData = {'306': 5.5, '307': 1.5, '310': 1.2};
    //     let summarySellReport =  sbars.getSummary(IOrderType.SELL);
    //     expect(summarySellReport)
    //   });
    // })
  })
});

