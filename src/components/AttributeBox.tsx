import React, { FC } from 'react'
import styled from 'styled-components'
import { Attribute } from './Attribute'
import { AttributeLabel, AttributeValues } from '../types/Attributes'

interface Props {
  labels: AttributeLabel[]
  values: AttributeValues
}

const Wrapper = styled.div`
  border: 1px solid grey;
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: row;
`

export const AttributeBox: FC<Props> = ({ labels, values }) => {
  return (
    <Wrapper>
      {labels
        .sort((a1, a2) => a1.position - a2.position)
        .map((label) => (
          <Attribute
            name={label.name}
            shortHand={label.shortHand}
            value={values[label.id]}
            key={label.position}
          />
        ))}
    </Wrapper>
  )
}
