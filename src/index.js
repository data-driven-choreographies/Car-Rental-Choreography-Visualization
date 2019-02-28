import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import DataObjectStore from "./contracts/DataObjectStore.json";
import Car from "./contracts/Car.json";
import MyDriversLicense from "./contracts/MyDriversLicense.json";
import Invoice from "./contracts/Invoice.json";
import Order from "./contracts/Order.json";
import Customer from "./contracts/Customer.json";
import RentalCarCompany from "./contracts/RentalCarCompany.json";
import Staff from "./contracts/Staff.json";

// let drizzle know what contracts we want
const options = { contracts: [
  DataObjectStore,
  Car,
  MyDriversLicense,
  Invoice,
  Order,
  Customer,
  RentalCarCompany,
  Staff,
] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
