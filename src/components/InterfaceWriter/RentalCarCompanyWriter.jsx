import React from "react";
import {Collapse, Input, Button, Icon} from 'antd';
import {Switch} from 'antd';
const Panel = Collapse.Panel;

class RentalCarCompanyWriter extends React.Component {
    state = { rejected: false, accepted: false };

    executeTransaction = (method, identifier, params) => {
      const { drizzle, drizzleState } = this.props;
      const { RentalCarCompany } = drizzle.contracts;
      const stackId = RentalCarCompany.methods[method].cacheSend(...params, {from: drizzleState.accounts[0]});
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
      const { instanceId } = this.props;
      return <div style={{paddingLeft: '5px'}}>
      <Collapse defaultActiveKey={[]}>
        <Panel header="Reject Order">
        <Switch style={{marginBottom: '10px'}} value={this.state.rejected} onChange={e => this.setState({rejected: e})} /> <br />
          <Button onClick={() => this.executeTransaction('rejectOrder(uint64,bool)', 'rejectOrder', [instanceId, this.state.rejected])}>
            Send {this.getTxStatus('rejectOrder')}
          </Button>
        </Panel>
        <Panel header="Accept Order">
          <Switch style={{marginBottom: '10px'}} value={this.state.accepted} onChange={e => this.setState({accepted: e})} /> <br />
          <Button onClick={() => this.executeTransaction('acceptOrder(uint64,bool)', 'acceptOrder', [instanceId, this.state.accepted])}>
            Send {this.getTxStatus('acceptOrder')}
          </Button>
        </Panel>
        <Panel header="Send Invoice">
          <Input style={{marginBottom: '10px'}} placeholder='Price' type='number' value={this.state.price} onChange={e => this.setState({price: e.target.value})} />
          <Button onClick={() => this.executeTransaction('sendInvoice(uint64,uint32)', 'sendInvoice', [instanceId, this.state.price])}>
            Send {this.getTxStatus('sendInvoice')}
          </Button>

        </Panel>
        <Panel header="Request Car Preparation">
          <Input style={{marginBottom: '10px'}} placeholder='Car ID' type='number' value={this.state.id} onChange={e => this.setState({id: e.target.value})} />
          <Button onClick={() => this.executeTransaction('requestCarPreparation(uint64,uint16)', 'requestCarPreparation', [instanceId, this.state.id])}>
            Send {this.getTxStatus('requestCarPreparation')}
          </Button>
        </Panel>
        <Panel header="Hand over Keys">
         <Input style={{marginBottom: '10px'}} placeholder='Key ID' type='number' value={this.state.keyId} onChange={e => this.setState({keyId: e.target.value})} />
          <Button onClick={() => this.executeTransaction('handOverKeys(uint64,uint32)', 'handOverKeys', [instanceId, this.state.keyId])}>
            Send {this.getTxStatus('handOverKeys')}
          </Button>
        </Panel>
      </Collapse>
     </div>
    }
}

export default RentalCarCompanyWriter;
