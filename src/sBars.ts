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

export interface ISummaryItem {
  quantity: number;
  price: number;
  transactionType: IOrderType
}

export interface ISummary extends Array<ISummaryItem>{};


export default class SBars<initialConfigs> {
  private configs: IConfigs;
  private orderStore: IOrderStorage = [];
  private summary: ISummary = [];

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

  public cancelOrder(myOrderId: number): string {
    if (myOrderId && this.getOrder(myOrderId).length > 0) {
      this.orderStore.splice(this.orderStore.findIndex(order => order.orderId === myOrderId),1);
      return "OK";
    } else {
      throw new Error("Order does not exist");
    }
  }

  public getOrder(myOrderId: number): IOrder[] {
    return this.findById(myOrderId, this.orderStore);
  }

  public getSummary(transactionType: IOrderType) {
    // build the summary of the sold items;
    const summary = this.orderStore
        .filter(order => order.orderType==transactionType)
        .reduce((summary, order) => {
          let total:number = order.orderQuantity;
          if (order.orderType == transactionType){
            return {
              ...summary,
              [order.pricePerKg]: summary[order.pricePerKg] ? summary[order.pricePerKg] + total: total
            }
          } else {
            return {...summary};
          };
        }, {});
    // convert the summary object into an array of objects [{key1:val},{key2:val}] (to make it iterable)
    summary[Symbol.iterator] = function* () {
      for (let key in this){
        yield {[key]: this[key]}
      }
    };
    if (transactionType===IOrderType.SELL){
      // @ts-ignore
      const summarySell = [...summary]; // return an array of objects
      return summarySell;
    } else if (transactionType===IOrderType.BUY){
      // reverse the objects according to the selling price
      // @ts-ignore
      const summarySellUnsorted = [...summary];
      return summarySellUnsorted.sort((a,b) => (a.pricePerKg > b.pricePerKg) ? -1 : 1)
    }
  }

  public clearOrders(){
    this.orderStore = [];
    return "OK";
  }
}
