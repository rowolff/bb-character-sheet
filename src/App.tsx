import React, { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import JSONCrush from 'jsoncrush'

import { AttributeValues } from './types/Attributes'
import { AttributeBox } from './components/AttributeBox'
import { Selector } from './components/Selector'
import { StatOverview } from './components/StatOverview'
import { attributeItems } from './data/attributeItems'
import { archetypes } from './data/archetypes'
import { classes } from './data/classes'
import { CreateGun } from './components/CreateGun'

const MAX_USER_STAT_POINTS = 3

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
  background: 'none',
  stats: { accuracy: 0, damage: 0, speed: 0, mastery: 0 },
}

type Character = {
  archetype: string
  charClass: string
  background: string
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

  const [statPoints, setStatpoints] = useState<number>(MAX_USER_STAT_POINTS)

  const updateArchetype = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const archetypeKey = e.currentTarget.value
    const archetype = archetypes[archetypeKey]
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      archetype: archetypeKey,
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
    const backgroundKey = e.currentTarget.value
    const charClass = classes[character.charClass]
    const classBackgrounds = charClass.backgrounds
    const background = classBackgrounds ? classBackgrounds[backgroundKey] : null

    if (background) {
      setBackgroundStats(background)
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        background: backgroundKey,
      }))
    }
  }

  const updateUserStat = (stat: keyof AttributeValues, direction: number) => {
    const newStatPoints = statPoints - direction
    const newBaseStatNotNegative = character.stats[stat] + direction >= 0
    const userStatAfterModificationNotNegative =
      userStats[stat] + direction >= 0
    const remainingStatPointsBetweenAllowedRange =
      0 <= newStatPoints && newStatPoints <= MAX_USER_STAT_POINTS
    if (
      remainingStatPointsBetweenAllowedRange &&
      newBaseStatNotNegative &&
      userStatAfterModificationNotNegative
    ) {
      setStatpoints(newStatPoints)
      setUserStats((prevStats) => ({
        ...prevStats,
        [stat]: prevStats[stat] + direction,
      }))
    }
  }

  const resetUserStats = () => {
    setUserStats(initialStats.stats)
    setStatpoints(MAX_USER_STAT_POINTS)
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

  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    const urlChar = {
      baseChar: character,
      archetype: archetypeStats,
      charClass: classStats,
      background: backgroundStats,
      user: userStats,
      statPoints: statPoints,
    }
    const compressed = JSONCrush.crush(JSON.stringify(urlChar))
    const url = new URL(window.location.href)
    url.searchParams.set('c', compressed)
    window.history.pushState({}, '', url)
  }, [character]) // eslint-disable-line

  const charLoaded = useRef(false)
  useEffect(() => {
    if (!charLoaded.current) {
      const searchParams = new URLSearchParams(window.location.search)
      const data = searchParams.get('c')
      if (data) {
        const urlChar = JSON.parse(JSONCrush.uncrush(data))
        setCharacter((prev) => ({ ...prev, ...urlChar.baseChar }))
        setArchetypeStats((prev) => ({ ...prev, ...urlChar.archetype }))
        setClassStats((prev) => ({ ...prev, ...urlChar.charClass }))
        setBackgroundStats((prev) => ({ ...prev, ...urlChar.background }))
        setUserStats((prev) => ({ ...prev, ...urlChar.user }))
        setStatpoints(() => urlChar.statPoints)
        charLoaded.current = true
      }
    }
  }, [])

  return (
    <React.Fragment>
      <GlobalStyle />
      <AttributeBox
        labels={attributeItems}
        values={character.stats}
        onUpdate={updateUserStat}
      />

      <Group>
        <h4>
          Free allocation (points to spend: {statPoints}){' '}
          <button onClick={resetUserStats}>reset</button>
        </h4>
        <StatOverview group="User" stats={userStats} />
      </Group>

      <Group>
        <Selector
          name="Archetype"
          onChange={updateArchetype}
          data={archetypes}
          current={character.archetype}
        />
        <StatOverview group="Archetype" stats={archetypeStats} />
      </Group>

      <Group>
        <Selector
          name="Class"
          onChange={updateClass}
          data={classes}
          current={character.charClass}
        />
        <StatOverview group="Class" stats={classStats} />
      </Group>

      <Group>
        <Selector
          name="Background"
          onChange={updateBackground}
          data={classes[character.charClass].backgrounds}
          current={character.background}
        />
        <StatOverview group="Background" stats={backgroundStats} />
      </Group>

      <Group>
        <CreateGun />
      </Group>
    </React.Fragment>
  )
}

export default App
