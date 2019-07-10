interface IConfigs {
  initialConfig?:any;
}

export enum IOrderType {
  BUY,
  SELL
}

export interface IOrder {
  orderId: number;
  userId: string;
  orderQuantity: number;
  pricePerKg: number;
  orderType: IOrderType;
}

export interface IOrderStorage extends Array<IOrder>{};

export default class SBars<initialConfigs> {
  private configs: IConfigs;
  private orderStore: IOrderStorage = [];
  private findById = (orderId: number, orderStore: IOrderStorage) => orderStore.filter(order => {
    return order.orderId == orderId;
  });

  constructor(configs: IConfigs){
    this.configs = configs;
  }

  public registerOrder(myOrder: IOrder):string {
    if (myOrder.orderId && this.getOrder(myOrder.orderId).length==0) {
      // no previous orders with the same orderId
      if (myOrder.orderQuantity > 0) {
        this.orderStore.push(myOrder);
        return "OK";
      } else {
        throw new Error("Invalid order");
      }
    } else {
      throw new Error("Order already stored");
    }
  }

  public getOrder(myOrderId: number): IOrder[] {
    return this.findById(myOrderId, this.orderStore);
  }

  public clearOrders(){
    this.orderStore = [];
    return "OK";
  }
}

