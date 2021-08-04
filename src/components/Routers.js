import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Contents from './Contents';
import Total from './Total';
import Quar from './Quar';
import '../App.css';

export default () => (
    <Router>
    <Route path="/" component={Header}></Route>
    <Route exact path='/a' component={Contents}/>
    <Route path='/quar' component={Quar}/>
    <Route path='/total' component={Total}/>
    </Router>
    )