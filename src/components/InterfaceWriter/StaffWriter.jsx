import React from "react";
import {Input, Collapse, Button, Icon} from 'antd';
const Panel = Collapse.Panel;
class StaffWriter extends React.Component {
    state = { input: '' };

    confirmCarPreparation = taskNumber => {
      const { drizzle, drizzleState, instanceId } = this.props;
      const stackId = drizzle.contracts.Staff.methods["confirmCarPreparation(uint64,uint16)"].cacheSend(instanceId, taskNumber, {from: drizzleState.accounts[0]});
      this.setState({stackId});
    }

    getTxStatus = () => {
      const { transactionStack } = this.props.drizzleState;

      const txHash = transactionStack[this.state.stackId];
      if(!txHash) return null;
      window.location.reload()
      return <Icon type="check-circle" />;
    }

    render() {
      return <div style={{paddingLeft: '5px'}}>
        <Collapse defaultActiveKey={[]}>
          <Panel header="Confirm Car Preparation" key="1">
            <Input style={{marginBottom: '10px'}} placeholder='Car ID' value={this.state.input} onChange={e => this.setState({input: e.target.value})} />
            <Button onClick={() => this.confirmCarPreparation(parseInt(this.state.input))}>
              Send {this.getTxStatus()}
            </Button>
          </Panel>
        </Collapse>
      </div>
    }
}

export default StaffWriter;
