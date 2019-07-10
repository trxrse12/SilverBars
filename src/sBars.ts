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

  public getSummarySold() {
    // build the summary of the sold items;
    const summarySold = this.orderStore
        .filter(order => order.orderType==IOrderType.SELL)
        .reduce((summary, order) => {
          let totalSold:number = order.orderQuantity;
          if (order.orderType == IOrderType.SELL){
            console.log(summary)
            console.log(order.pricePerKg)
            console.log(summary[order.pricePerKg]);
            return {
              ...summary,
              [order.pricePerKg]: summary[order.pricePerKg] ? summary[order.pricePerKg] + totalSold: totalSold
            }
          } else {
            return {...summary};
          };
        }, {});

    return summarySold;
  }

  public clearOrders(){
    this.orderStore = [];
    return "OK";
  }
}
