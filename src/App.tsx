import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import { AttributeValues } from './types/Attributes'
import { AttributeBox } from './components/AttributeBox'
import { attributeItems } from './constants/attributeItems'
import { archetypes } from './constants/archetypes'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #101041;
    margin: 20px;
    color: white;
    font-family: "Segoe UI",Helvetica,Arial,sans-serif;
  }
`

const initialStats = {
  accuracy: 0,
  damage: 1,
  speed: 2,
  mastery: 4,
}

const App = () => {
  const [stats, setStats] = useState<AttributeValues>(initialStats)

  const updateArchetype = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value)
    setStats(archetypes[e.currentTarget.value])
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <AttributeBox labels={attributeItems} values={stats} />
      <select onChange={updateArchetype}>
        {Object.keys(archetypes).map((archetype) => (
          <option value={archetype}>{archetypes[archetype].name}</option>
        ))}
      </select>
    </React.Fragment>
  )
}

export default App
