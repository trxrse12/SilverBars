<H1>SilverBar Live Order Board</H1>

<B>Generates the report of silver bars in the market </B>

<B>Installation</B>

Save the "sbars.ts" file in the project folder  


<B>Example</B>

The class <b>SBars</b> implements the requirements. Can be used in a third party listing as:

    import SBars from 'sBars';
    const sbars = new SBars([configObject]);
    
    sbarsInstance(myOrderObject); // register a new order
    cancelOrder(myOrderId); // cancel an existing order
    getOrder(myOrderId) // retrieve an existing order 
    getSumary(BUY|SELL); // get the orders summary
    clearOrders(); 