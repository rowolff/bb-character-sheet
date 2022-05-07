import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  id: string
  name: string
  shortHand: string
  value: number
  update(name: string, direction: number): void
}

const Wrapper = styled.div`
  border: 1px solid white;
  width: 20%;
  margin: 5px;
  padding: 5px;
`

export const Attribute: FC<Props> = ({
  id,
  name,
  shortHand,
  value,
  update,
}) => {
  return (
    <Wrapper>
      <span>
        <button onClick={() => update(id, 1)}>+</button>
        <button onClick={() => update(id, -1)}>-</button>
      </span>
      <h3>
        {name} ({shortHand})
      </h3>
      <h1>{value}</h1>
      <div>MOD: {Math.floor(value / 2)}</div>
    </Wrapper>
  )
}
