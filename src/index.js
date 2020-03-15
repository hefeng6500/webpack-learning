import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import logo from './images/webpack.svg';
import common from './common';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      Text: null
    };
  }

  loadComponent() {
    import('./common/lazyComponent').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div>
        <h1 className="searhText">
          hello world!
          {
            common()
          }
        </h1>
        <h2>
          {
            Text ? <Text /> : null
          }
        </h2>
        <img alt="" className="imgStyle" src={logo} />
        <button type="button" onClick={this.loadComponent.bind(this)}>按钮</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('app')
);
