import React, { FC } from 'react'
import { Archetype } from '../constants/archetypes'
import { CharacterClass } from '../constants/classes'

interface Props {
  name: string
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  data: Archetype | CharacterClass
}

export const Selector: FC<Props> = ({ name, onChange, data }) => {
  return (
    <React.Fragment>
      <h4>Select {name}</h4>
      <select onChange={onChange}>
        {Object.keys(data).map((item) => (
          <option key={item} value={item}>
            {data[item].name}
          </option>
        ))}
      </select>
    </React.Fragment>
  )
}
