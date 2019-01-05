/* global it */
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../containers/App'

import 'jest-canvas-mock'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
