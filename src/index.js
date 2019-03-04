import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap-theme.min.css'
// import './index.css'
import App from './containers/App'
import { unregister } from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
unregister()
