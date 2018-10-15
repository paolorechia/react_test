import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TodoApp from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
