import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { AttributeValues } from './types/Attributes'
import { AttributeBox } from './components/AttributeBox'
import { Selector } from './components/Selector'
import { StatOverview } from './components/StatOverview'
import { attributeItems } from './constants/attributeItems'
import { archetypes } from './constants/archetypes'
import { CharacterClass, classes, ClassValues } from './constants/classes'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #101041;
    margin: 20px;
    color: white;
    font-family: "Segoe UI",Helvetica,Arial,sans-serif;
  }
`

const Group = styled.div`
  display: flex;
  align-items: center;
`

const initialStats = {
  archetype: 'none',
  charClass: 'none',
  stats: { accuracy: 0, damage: 0, speed: 0, mastery: 0 },
}

type Character = {
  archetype: string
  charClass: string
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
  const [backgroundStats, setBackgroundStats] = useState<AttributeValues>(
    initialStats.stats
  )
  const [userStats, setUserStats] = useState<AttributeValues>(
    initialStats.stats
  )

  const [statPoints, setStatpoints] = useState<number>(3)

  const updateArchetype = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const archetype = archetypes[e.currentTarget.value]
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      archetype: archetype.name,
    }))
    setArchetypeStats(archetype)
  }

  const updateClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classKey = e.currentTarget.value
    const charClass = classes[classKey]
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      charClass: classKey,
    }))
    setClassStats(charClass)
    setBackgroundStats(initialStats.stats)
  }

  const updateBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const charClass = classes[character.charClass]
    const classBackgrounds = charClass.backgrounds
    const background = classBackgrounds
      ? classBackgrounds[e.currentTarget.value]
      : null

    if (background) setBackgroundStats(background)
  }

  const updateUserStat = (stat: keyof AttributeValues, direction: number) => {
    const newStatPoints = statPoints - direction
    const newBaseStatNotNegative = character.stats[stat] + direction >= 0
    if (0 <= newStatPoints && newStatPoints <= 3 && newBaseStatNotNegative) {
      setStatpoints(newStatPoints)
      setUserStats((prevStats) => ({
        ...prevStats,
        [stat]: prevStats[stat] + direction,
      }))
    }
  }

  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      stats: {
        accuracy:
          archetypeStats.accuracy +
          classStats.accuracy +
          userStats.accuracy +
          backgroundStats.accuracy,
        damage:
          archetypeStats.damage +
          classStats.damage +
          userStats.damage +
          backgroundStats.damage,
        speed:
          archetypeStats.speed +
          classStats.speed +
          userStats.speed +
          backgroundStats.speed,
        mastery:
          archetypeStats.mastery +
          classStats.mastery +
          userStats.mastery +
          backgroundStats.mastery,
      },
    }))
  }, [archetypeStats, classStats, userStats, backgroundStats])

  return (
    <React.Fragment>
      <GlobalStyle />
      <h3>Stat Points to spend: {statPoints}</h3>
      <AttributeBox
        labels={attributeItems}
        values={character.stats}
        onUpdate={updateUserStat}
      />

      <Group>
        <h4>User Stats</h4>
        <StatOverview group="User" stats={userStats} />
      </Group>
      <Group>
        <Selector
          name="Archetype"
          onChange={updateArchetype}
          data={archetypes}
        />
        <StatOverview group="Archetype" stats={archetypeStats} />
      </Group>

      <Group>
        <Selector name="Class" onChange={updateClass} data={classes} />
        <StatOverview group="Class" stats={classStats} />
      </Group>

      <Group>
        <Selector
          name="Background"
          onChange={updateBackground}
          data={classes[character.charClass].backgrounds}
        />
        <StatOverview group="Background" stats={backgroundStats} />
      </Group>
    </React.Fragment>
  )
}

export default App
