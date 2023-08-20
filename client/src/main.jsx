import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { TransactionProvier } from './context/TransactionContext';

ReactDOM.render(
  <TransactionProvier>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </TransactionProvier>,
  document.getElementById('root')
)
