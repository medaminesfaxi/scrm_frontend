import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';
import './index.css';

import App from './App';

serviceWorker.unregister();
ReactDOM.render(<App />, document.getElementById('root'));
