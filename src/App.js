import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  
  render() {
    //render(): Ccompile JSX into HTML then render the given HTML
    return (
      <div>
       <Navbar/>
       <News pageSize={6} country="in" category="science"/>
      </div>
    )
  }
}

