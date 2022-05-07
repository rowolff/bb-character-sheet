import { FC } from 'react'
import styled from 'styled-components'
import { AttributeValues } from '../types/Attributes'

interface Props {
  group: string
  stats: AttributeValues
}

const Wrapper = styled.div`
  display: flex;
  margin-left: 20px;
`

const Item = styled.span`
  margin-right: 10px;
`

export const StatOverview: FC<Props> = ({ group, stats }) => {
  return (
    <Wrapper>
      <Item>ACC: {stats.accuracy} </Item>
      <Item>DMG: {stats.damage} </Item>
      <Item>SPD: {stats.speed} </Item>
      <Item>MST: {stats.mastery} </Item>
    </Wrapper>
  )
}
