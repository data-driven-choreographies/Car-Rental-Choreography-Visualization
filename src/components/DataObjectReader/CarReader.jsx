import React from "react";
import { Card } from 'antd';

class CarReader extends React.Component {
    state = { };

    componentDidMount() {
      const { drizzle, instanceId } = this.props;
      const contract = drizzle.contracts.Car;

      // let drizzle know we want to watch the `myString` method
      const idDK = contract.methods["getId"].cacheCall(instanceId);
      const preparedCarIdDK = contract.methods["getPreparedCarId"].cacheCall(instanceId);
      const requestCarPreparationDoneDK = contract.methods["getRequestCarPreparationDone"].cacheCall(instanceId);

      // save the `dataKey` to local component state for later reference
      this.setState({ idDK, preparedCarIdDK, requestCarPreparationDoneDK });
    }

    render() {
      // get the contract state from drizzleState
      const { drizzleState, drizzle } = this.props;
      const { Car } = drizzleState.contracts;
      const { address } = drizzle.contracts.Car;
      // using the saved `dataKey`, get the variable we're interested in
      const id = Car.getId[this.state.idDK];
      const preparedCarId = Car.getPreparedCarId[this.state.preparedCarIdDK];
      const requestCarPreparationDone = Car.getRequestCarPreparationDone[this.state.requestCarPreparationDoneDK];
      // if it exists, then we display its value
      //return <p>My stored string: {myString && myString.value}</p>;
      return <div>
        <Card title="Car">
          <p style={{color: '#999999'}}>{address}</p>
          <p>Id: {id && id.value.toString()}</p>
          <p>PreparedCarId: {preparedCarId && preparedCarId.value.toString()}</p>
          <p>RequestedCarPreparationDone: {requestCarPreparationDone && requestCarPreparationDone.value.toString()}</p>
        </Card>
      </div>
    }
}

export default CarReader;
