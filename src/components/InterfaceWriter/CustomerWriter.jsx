import React from "react";
import {Collapse, Input, Button, Icon} from 'antd';
const Panel = Collapse.Panel;

class CustomerWriter extends React.Component {
    state = { carType: '', startDate: '', endDate: '', dlAddress: '', dlInstanceId: '', transferAmount: '' };

    executeTransaction = (method, identifier, params) => {
      const { drizzle, drizzleState } = this.props;
      console.info(drizzle.contracts.Customer.methods);
      const stackId = drizzle.contracts.Customer.methods[method].cacheSend(...params, {from: drizzleState.accounts[0]});
      this.setState({[identifier]: stackId});
    }

    getTxStatus = (identifier) => {
      const { transactionStack } = this.props.drizzleState;
      const txHash = transactionStack[this.state[identifier]];
      if(!txHash) return null;
      window.location.reload()
      return <Icon type="check-circle" />;
    }

    render() {
      let { instanceId } = this.props;
      instanceId = parseInt(instanceId);
      return <div style={{paddingLeft: '5px'}}>
      <Collapse defaultActiveKey={[]}>
        <Panel header="Request Car" key="1">
          <Input style={{marginBottom: '10px'}} placeholder='Car Type' value={this.state.carType} onChange={e => this.setState({carType: e.target.value})} />
          <Input style={{marginBottom: '10px'}} placeholder='Start Date' type='number' value={this.state.startDate} onChange={e => this.setState({startDate: e.target.value})} />
          <Input style={{marginBottom: '10px'}} placeholder='End Date' type='number' value={this.state.endDate} onChange={e => this.setState({endDate: e.target.value})} />
          <Button onClick={() => this.executeTransaction('requestCar(uint64,string,uint32,uint32)', 'requestCar', [parseInt(instanceId), this.state.carType, parseInt(this.state.startDate), parseInt(this.state.endDate)])}>
            Send {this.getTxStatus('requestCar')}
          </Button>
        </Panel>
        <Panel header="Prove Drivers License" key="2">
          <Input style={{marginBottom: '10px'}} placeholder='Address' value={this.state.dlAddress} onChange={e => this.setState({dlAddress: e.target.value})} />
          <Input style={{marginBottom: '10px'}} placeholder='Reference Instance ID' type='number' value={this.state.dlInstanceId} onChange={e => this.setState({dlInstanceId: e.target.value})} />
         <Button onClick={() => this.executeTransaction('proveDriversLicense(uint64,address,uint64)', 'proveDriversLicense', [parseInt(instanceId), this.state.dlAddress, parseInt(this.state.dlInstanceId)])}>
            Send {this.getTxStatus('proveDriversLicense')}
          </Button>
        </Panel>
        <Panel header="Prove payment of Invoice" key="3">
          <Input style={{marginBottom: '10px'}} placeholder='Transfer amount' type='number' value={this.state.transferAmount} onChange={e => this.setState({transferAmount: e.target.value})} />
          <Button onClick={() => this.executeTransaction('provePaymentOfInvoice(uint64,uint32)', 'provePaymentOfInvoice', [parseInt(instanceId), this.state.transferAmount])}>
            Send {this.getTxStatus('provePaymentOfInvoice')}
          </Button>
        </Panel>
      </Collapse>
      </div>
    }
}

export default CustomerWriter;
