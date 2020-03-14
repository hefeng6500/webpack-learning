import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import logo from './images/webpack.svg';

debugger
console.log(1);

class Index extends Component {
  render() {
    return (
      <div>
        <h1 className="searhText">helloworld</h1>
        <img alt="" className="imgStyle" src={logo} />
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('app')
);
