import React from "react";
import {Card} from 'antd';

class DriversLicenseReader extends React.Component {
    state = { };

    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.MyDriversLicense;

      // let drizzle know we want to watch the `myString` method
      const birthDateYearDK = contract.methods["getBirthDateYear"].cacheCall(50);
      const validUntilDK = contract.methods["getValidUntil"].cacheCall(50);
      const authorizedCarTypesDK = contract.methods["getAuthorizedCarTypes"].cacheCall(50);


      // save the `dataKey` to local component state for later reference
      this.setState({ birthDateYearDK, validUntilDK, authorizedCarTypesDK });
    }

    render() {
      const {drizzle, drizzleState} = this.props;
      // get the contract state from drizzleState
      const { MyDriversLicense } = drizzleState.contracts;
      const { address } = drizzle.contracts.MyDriversLicense;
      // using the saved `dataKey`, get the variable we're interested in
      const birthDateYear = MyDriversLicense.getBirthDateYear[this.state.birthDateYearDK]
      const validUntil = MyDriversLicense.getValidUntil[this.state.validUntilDK]
      const authorizedCarTypes = MyDriversLicense.getAuthorizedCarTypes[this.state.authorizedCarTypesDK]

      // if it exists, then we display its value
      //return <p>My stored string: {myString && myString.value}</p>;
      return <div>
        <Card title="(My) Drivers License">
          <p style={{color: '#999999'}}>{address}</p>
          <p>(Instance 50)</p>
          <p>Birth Date Year: {birthDateYear && birthDateYear.value.toString()}</p>
          <p>Valid Until: {validUntil && validUntil.value.toString()}</p>
          <p>Authorized Car Types: {authorizedCarTypes && authorizedCarTypes.value.toString()}</p>
        </Card>
      </div>
    }
}

export default DriversLicenseReader;
