import React, { FC } from 'react'
import styled from 'styled-components'
import { Archetype } from '../constants/archetypes'
import { CharacterClass } from '../constants/classes'

interface Props {
  name: string
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  data: Archetype | CharacterClass
}

const Wrapper = styled.div`
  margin-right: 10px;
  display: flex;

  select {
    margin: 5px;
  }
`

export const Selector: FC<Props> = ({ name, onChange, data }) => {
  return (
    <Wrapper>
      <h4>Select {name}</h4>
      <select onChange={onChange}>
        {Object.keys(data).map((item) => (
          <option key={item} value={item}>
            {data[item].name}
          </option>
        ))}
      </select>
    </Wrapper>
  )
}
