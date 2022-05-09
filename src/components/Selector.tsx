import React, { FC } from 'react'
import styled from 'styled-components'
import { Archetype } from '../data/archetypes'
import { CharacterClass } from '../data/classes'

interface Props {
  name: string
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  data?: Archetype | CharacterClass
  current: string
}

const Wrapper = styled.div`
  margin-right: 10px;
  display: flex;

  select {
    margin: 5px;
  }
`

export const Selector: FC<Props> = ({ name, onChange, data, current }) => {
  if (!data) return null

  return (
    <Wrapper>
      <h4>Select {name}</h4>
      <select onChange={onChange} value={current}>
        {Object.keys(data).map((itemKey) => {
          return (
            <option key={itemKey} value={itemKey}>
              {data[itemKey].name}
            </option>
          )
        })}
      </select>
    </Wrapper>
  )
}
