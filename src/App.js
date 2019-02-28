import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    const {drizzle} = this.props;
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={(props) => <Redirect to="/0/0" />}/>
          <Route path='/:instance/:amount' component={(props) => <Dashboard {...props} drizzle={drizzle} />}/>
        </Switch>
      </Router>
  );
  }
}

export default App;
