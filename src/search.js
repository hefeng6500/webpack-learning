import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './search.scss'
import logo from './images/webpack.svg'

class Search extends Component {
  render() {
    return (
      <div>
        <h1 className="searhText">helloworld</h1>
        <img className="imgStyle" src={logo} />
      </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('app')
)