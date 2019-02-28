import React from 'react';
import CarReader from '../components/DataObjectReader/CarReader';
import OrderReader from '../components/DataObjectReader/OrderReader';
import InvoiceReader from '../components/DataObjectReader/InvoiceReader';
import StaffWriter from '../components/InterfaceWriter/StaffWriter';
import CustomerWriter from '../components/InterfaceWriter/CustomerWriter';
import RentalCarCompanyWriter from '../components/InterfaceWriter/RentalCarCompanyWriter';
import DriversLicenseReader from '../components/DataObjectReader/DriversLicenseReader';
import { Tabs, Select, Button, Icon } from 'antd';
import process from '../assets/process.jpg';
const style = require('./dashboard.css');


const TabPane = Tabs.TabPane;
const Option = Select.Option;

export class Dashboard extends React.Component {
  state = { instanceIds: 0, selectedInstanceId: 0, loading: true, drizzleState: null };


    componentDidMount() {
    const match = this.props.location.pathname.match(/\/(\d+)\/(\d+)\/?/i);
    if (!match[1] || !match[2]) {
      return false;
    }

    const selectedInstanceId = match[1];
    const instanceIds = match[2];

    const { drizzle } = this.props;
      this.unsubscribe = drizzle.store.subscribe(() => {
        const drizzleState = drizzle.store.getState();
        if (drizzleState.drizzleStatus.initialized) {
          this.setState({ loading: false, drizzleState, selectedInstanceId, instanceIds });
        }
      });
    }
    componentWillUnmount() {
      this.unsubscribe();
    }


  handleChange(e) {
    this.props.history.push(`/${e}/${this.state.instanceIds}`)
    window.location.reload()
  }

  executeTransaction = (method, identifier) => {
    const { drizzle } = this.props;
    const { DataObjectStore } = drizzle.contracts;
    const stackId = DataObjectStore.methods[method].cacheSend();
    this.setState({[identifier]: stackId});

  }

  getTxStatus = (identifier) => {
    const { transactionStack } = this.state.drizzleState;
    const txHash = transactionStack[this.state[identifier]];
    if(!txHash) return null;
    this.props.history.push(`/${parseInt(this.state.instanceIds) + 1}/${parseInt(this.state.instanceIds) + 1}`)
    window.location.reload()
  }

  render() {
    const {drizzleState, loading} = this.state;
    if (loading) return "Loading Drizzle...";
    const {drizzle} = this.props;
    const options = [];
    let counter = 0;
    while(counter <= this.state.instanceIds) {
      options.push(<Option key={counter} value={counter}>{counter}</Option>)
      counter++;
    }
    return (
      <div className={style.gridLayout}>
        <div className={style.subGridLayout}>
        <div className={style.topLeftContainer}>
        <Select defaultValue={this.state.selectedInstanceId} onChange={this.handleChange.bind(this)}>
          {options}
        </Select>
        <Button onClick={() => this.executeTransaction('createInstance()', 'createInstance')}>
          Create new Instance {this.getTxStatus('createInstance')}
        </Button>
        <Tabs defaultActiveKey="1">
        <TabPane tab="Customer" key="1">
        <CustomerWriter
          instanceId={this.state.selectedInstanceId}
          drizzle={drizzle}
          drizzleState={drizzleState}
          />
        </TabPane>
        <TabPane tab="Car Rental Company" key="2">
        <RentalCarCompanyWriter
        instanceId={this.state.selectedInstanceId}
        drizzle={drizzle}
        drizzleState={drizzleState} />
        </TabPane>
        <TabPane tab="Staff" key="3">
        <StaffWriter
          instanceId={this.state.selectedInstanceId}
          drizzle={drizzle}
          drizzleState={drizzleState}
          />
        </TabPane>
               </Tabs>
        </div>
        <div className={style.bottomLeftContainer}>
          <img
          style={{padding: '10px', width: '100%', maxHeight: '100%', maxWidth: '100%' }}
          src={process} />
        </div>
        </div>
        <div className={style.rightContainer}>
        <OrderReader
          instanceId={this.state.selectedInstanceId}
          drizzle={drizzle}
          drizzleState={drizzleState}
          />
          <br/>
        <CarReader
          instanceId={this.state.selectedInstanceId}
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
          <br/>
        <InvoiceReader
          instanceId={this.state.selectedInstanceId}
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
          <br/>
        <DriversLicenseReader
          instanceId={this.state.selectedInstanceId}
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
        </div>
      }
    </div>
    );
  }
}

export default Dashboard;
