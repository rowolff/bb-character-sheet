import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  name: string
  shortHand: string
  value: number
}

const Wrapper = styled.div`
  border: 1px solid white;
  width: 150px;
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
`

export const Attribute: FC<Props> = ({ name, shortHand, value }) => {
  return (
    <Wrapper>
      <h3>
        {name} ({shortHand})
      </h3>
      <h1>{value}</h1>
      <div>MOD: {Math.floor(value / 2)}</div>
    </Wrapper>
  )
}
