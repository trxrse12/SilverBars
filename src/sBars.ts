interface IConfigs {
  initialConfig?:any;
}

export enum IOrderType {
  BUY,
  SELL
}

export interface IOrder {
  userId: string;
  orderQuantity: number;
  pricePerKg: number;
  orderType: IOrderType;
}

export default class SBars<initialConfigs> {
  private configs: IConfigs;

  constructor(configs: IConfigs){
    this.configs = configs;
  }

  public registerOrder(myOrder: IOrder){
    return "OK";
  }
}

