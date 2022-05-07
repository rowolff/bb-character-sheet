import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { AttributeBox } from './components/AttributeBox'
import { attributeItems } from './constants/attributeItems'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #101041;
    margin: 20px;
    color: white;
    font-family: "Segoe UI",Helvetica,Arial,sans-serif;
  }
`

const stats = {
  accuracy: 0,
  damage: 1,
  speed: 2,
  mastery: 4,
}

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AttributeBox labels={attributeItems} values={stats} />
    </React.Fragment>
  )
}

export default App
