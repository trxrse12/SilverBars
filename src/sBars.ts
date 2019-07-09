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
    //this.orderStore.push(myOrder);
    this.orderStore.push(myOrder);
    return "OK";
  }

  public getOrder(myOrderId: number): IOrder[] {
    return this.findById(myOrderId, this.orderStore);
  }
}

