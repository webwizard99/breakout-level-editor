import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import './Components/App/App.css';
import App from './Components/App/App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
