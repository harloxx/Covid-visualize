import logo from './logo.svg';
/*
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Contents from './components/Contents';
import Total from './components/Total';

const App=()=> {
  return (
    <div className="App">
      <Header />
      <Contents />
      
    </div>
  );
}
*/
import React,{Component} from 'react';
import Routers from './components/Routers'; 
class App extends Component {
  render() {
      return (
        <>
        <Routers/>
        </>
      );
  }
}



export default App;
