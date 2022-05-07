import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import { AttributeValues } from './types/Attributes'
import { AttributeBox } from './components/AttributeBox'
import { attributeItems } from './constants/attributeItems'
import { archetypes } from './constants/archetypes'
import { classes } from './constants/classes'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #101041;
    margin: 20px;
    color: white;
    font-family: "Segoe UI",Helvetica,Arial,sans-serif;
  }
`

const initialStats = {
  archetype: 'no archetype',
  class: 'no class',
  stats: { accuracy: 0, damage: 0, speed: 0, mastery: 0 },
}

type Character = {
  archetype: string
  class: string
  stats: AttributeValues
}

const App = () => {
  const [character, setCharacter] = useState<Character>(initialStats)
  const [archetypeStats, setArchetypeStats] = useState<AttributeValues>(
    initialStats.stats
  )
  const [classStats, setClassStats] = useState<AttributeValues>(
    initialStats.stats
  )

  const updateArchetype = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const archetype = archetypes[e.currentTarget.value]
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      archetype: archetype.name,
    }))
    setArchetypeStats(archetype)
  }

  const updateClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const charClass = classes[e.currentTarget.value]
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      class: charClass.name,
    }))
    setClassStats(charClass)
  }

  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      stats: {
        accuracy: archetypeStats.accuracy + classStats.accuracy,
        damage: archetypeStats.damage + classStats.damage,
        speed: archetypeStats.speed + classStats.speed,
        mastery: archetypeStats.mastery + classStats.mastery,
      },
    }))
  }, [archetypeStats, classStats])

  return (
    <React.Fragment>
      <GlobalStyle />
      <AttributeBox labels={attributeItems} values={character.stats} />

      <h4>Select Archetype</h4>
      <select onChange={updateArchetype}>
        {Object.keys(archetypes).map((archetype) => (
          <option key={archetype} value={archetype}>
            {archetypes[archetype].name}
          </option>
        ))}
      </select>

      <h4>Select Class</h4>
      <select onChange={updateClass}>
        {Object.keys(classes).map((charClass) => (
          <option key={charClass} value={charClass}>
            {classes[charClass].name}
          </option>
        ))}
      </select>
    </React.Fragment>
  )
}

export default App
