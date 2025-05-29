import React, { useState } from 'react'
import { gunTable, GunType, gunRarities } from '../data/guntable'
import { Manufacturer } from '../data/manufacturers'
import { Rarity } from '../data/rarities'
import { getRandomElementalOutcome } from '../data/elemental_table'
import styled from 'styled-components'

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #2a206d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #3a2e8a;
  }
`

const GunDisplay = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #212163;
  border-radius: 4px;
`

interface RandomGun {
  type: GunType;
  manufacturer: Manufacturer;
  rarity: Rarity;
  elemental: boolean;
  elementType?: string | null;
  addedDamage?: string;
}

export const CreateGun: React.FC = () => {
  const [selectedGun, setSelectedGun] = useState<RandomGun | null>(null)

  const generateRandomGun = () => {
    // Select random gun
    const randomRow = gunTable[Math.floor(Math.random() * gunTable.length)]
    const randomGun = randomRow[Math.floor(Math.random() * randomRow.length)]
    
    // Select random rarity
    const randomRarityRow = gunRarities[Math.floor(Math.random() * gunRarities.length)]
    const randomRarityInfo = randomRarityRow[Math.floor(Math.random() * randomRarityRow.length)]
    
    // Get elemental outcome based on the rarity
    const elementalOutcome = getRandomElementalOutcome(randomRarityInfo.rarity)
    
    setSelectedGun({
      ...randomGun,
      rarity: randomRarityInfo.rarity,
      elemental: elementalOutcome.elementType !== null,
      elementType: elementalOutcome.elementType,
      addedDamage: elementalOutcome.addedDamage
    })
  }

  return (
    <div>
      <Button onClick={generateRandomGun}>Generate Random Gun</Button>
      {selectedGun && (
        <GunDisplay>
          <p><strong>Rarity:</strong> {selectedGun.rarity}</p>
          <p><strong>Manufacturer:</strong> {selectedGun.manufacturer}</p>
          <p><strong>Type:</strong> {selectedGun.type}</p>
          <p><strong>Damage Bonus:</strong> {selectedGun.addedDamage}</p>
          {selectedGun.elemental && (
            <p><strong>Element:</strong> {selectedGun.elementType}</p>
          )}
        </GunDisplay>
      )}
    </div>
  )
}