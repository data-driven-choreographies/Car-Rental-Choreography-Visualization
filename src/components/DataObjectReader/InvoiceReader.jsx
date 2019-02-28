import React from "react";
import {Card} from 'antd';
class InvoiceReader extends React.Component {
    state = { };

    componentDidMount() {
      const { drizzle, instanceId } = this.props;
      const contract = drizzle.contracts.Invoice;

      // let drizzle know we want to watch the `myString` method
      const priceDK = contract.methods["getPrice"].cacheCall(instanceId);
      const transferAmountDK = contract.methods["getTransferAmount"].cacheCall(instanceId);


      // save the `dataKey` to local component state for later reference
      this.setState({ priceDK, transferAmountDK });
    }

    render() {
      const {drizzle, drizzleState} = this.props;
      const {address} = drizzle.contracts.Invoice;

      // get the contract state from drizzleState
      const { Invoice } = drizzleState.contracts;
      // using the saved `dataKey`, get the variable we're interested in
      const price = Invoice.getPrice[this.state.priceDK]
      const transferAmount = Invoice.getTransferAmount[this.state.transferAmountDK]

      // if it exists, then we display its value
      //return <p>My stored string: {myString && myString.value}</p>;
      return <div>
        <Card title="Invoice">
          <p style={{color: '#999999'}}>{address}</p>
          <p>Price: {price && price.value.toString()}</p>
          <p>Transfer Amount: {transferAmount && transferAmount.value.toString()}</p>
        </Card>
      </div>
    }
}

export default InvoiceReader;
