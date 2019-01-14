import React, { PureComponent, Fragment } from 'react';
//
import Lazyload from '../../src/index.tsx';
//
import './app.scss';
//
import IMG from '../images/bg.jpeg';
import IMGDefault from '../images/default.gif';

export default class App extends PureComponent {
  state = {

  }

  render() {
    return (
      <Fragment>
        <div className="pad">
          Pull down
          <br />
          the effect is more obvious, you can change the network to slow 3G and disable cache
        </div>

        <Lazyload
          className={['haha', 'xixi']}
          style={{ width: '300px' }}
          src={IMG}
          defaultSrc={IMGDefault}
        />
      </Fragment>
    );
  }
}
