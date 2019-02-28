import React from "react";
import {Card} from 'antd';

class OrderReader extends React.Component {
    state = { };

    componentDidMount() {
      const { drizzle, instanceId } = this.props;
      const contract = drizzle.contracts.Order;

      // let drizzle know we want to watch the `myString` method
      const carTypeDK = contract.methods["getCarType"].cacheCall(instanceId);
      const startDateDK = contract.methods["getStartDate"].cacheCall(instanceId);
      const endDateDK = contract.methods["getEndDate"].cacheCall(instanceId);
      const keyIdDK = contract.methods["getKeyId"].cacheCall(instanceId);
      const rejectedDK = contract.methods["getRejected"].cacheCall(instanceId);
      const acceptedDK = contract.methods["getAccepted"].cacheCall(instanceId);

      // save the `dataKey` to local component state for later reference
      this.setState({ carTypeDK, startDateDK, endDateDK, keyIdDK, rejectedDK, acceptedDK });
    }

    render() {
      const {drizzle, drizzleState} = this.props;
      const {address} = drizzle.contracts.Order;
      // get the contract state from drizzleState
      const { Order } = drizzleState.contracts;
      // using the saved `dataKey`, get the variable we're interested in
      const carType = Order.getCarType[this.state.carTypeDK]
      const startDate = Order.getStartDate[this.state.startDateDK]
      const endDate = Order.getEndDate[this.state.endDateDK]
      const keyId = Order.getKeyId[this.state.keyIdDK]
      const rejected = Order.getRejected[this.state.rejectedDK]
      const accepted = Order.getAccepted[this.state.acceptedDK]
      // if it exists, then we display its value
      //return <p>My stored string: {myString && myString.value}</p>;
      return <div>
        <Card title="Order">
          <p style={{color: '#999999'}}>{address}</p>
          <p>Car Type: {carType && carType.value.toString()}</p>
          <p>Start Date: {startDate && startDate.value.toString()}</p>
          <p>End Date: {endDate && endDate.value.toString()}</p>
          <p>Rejected: {rejected && rejected.value.toString()}</p>
          <p>Accepted: {accepted && accepted.value.toString()}</p>
          <p>Key ID: {keyId && keyId.value.toString()}</p>
        </Card>

      </div>
    }
}

export default OrderReader;
