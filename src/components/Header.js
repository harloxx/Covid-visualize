import React from 'react'
import { Link } from "react-router-dom";
import Total from './Total'
const Header = () => {
    return (
        <header className="header">
        <h1>Covid-19</h1>
        <div className="Navi">
          <a className="Navs" href='/today'>TODAY</a>
          <a className="Navs" href='/month'>MONTHLY</a>
          <a className="Navs" href='/quar'>QUARANTINE</a>
          <a className="Navs" href="/total">TOTAL</a>
        </div>
        <select> 
          <option>KOREA</option>
          <option>WORLD</option>
        </select>
      </header>
    )
}


export default Header