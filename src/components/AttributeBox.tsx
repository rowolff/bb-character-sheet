import React, { FC } from 'react'
import styled from 'styled-components'
import { Attribute } from './Attribute'
import { AttributeLabel, AttributeValues } from '../types/Attributes'

interface Props {
  labels: AttributeLabel[]
  values: AttributeValues
  onUpdate(stat: string, direction: number): void
}

const Wrapper = styled.div`
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const AttributeBox: FC<Props> = ({ labels, values, onUpdate }) => {
  return (
    <Wrapper>
      {labels
        .sort((a1, a2) => a1.position - a2.position)
        .map((label) => (
          <Attribute
            id={label.id}
            name={label.name}
            shortHand={label.shortHand}
            value={values[label.id]}
            update={onUpdate}
            key={label.position}
          />
        ))}
    </Wrapper>
  )
}
