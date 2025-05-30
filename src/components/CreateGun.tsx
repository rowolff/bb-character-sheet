import React, { useState } from 'react'
import { gunTable, GunType, gunRarities, getGunStatsByLevel, gt } from '../data/guntable'
import { Manufacturer } from '../data/manufacturers'
import { Rarity } from '../data/rarities'
import { getRandomElementalOutcome } from '../data/elemental_table'
import styled from 'styled-components'
import { DamageType, damageTypes } from '../data/damage_types'

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

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
`

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #2a206d;
  color: white;
  border: 1px solid #3a2e8a;
  cursor: pointer;
  font-size: 16px;
  
  &:hover, &:focus {
    border-color: #5c4cda;
  }
`

const Label = styled.label`
  margin-right: 5px;
  font-weight: 600;
`

interface RandomGun {
    type: GunType;
    manufacturer: Manufacturer;
    rarity: Rarity;
    damageTypes: DamageType[];
    addedDamage: string;
    level?: number;
    stats?: any; // Using any for simplicity, could define a more specific type
    range?: string;
    bonus?: string;
}

export const CreateGun: React.FC = () => {
    const [selectedGun, setSelectedGun] = useState<RandomGun | null>(null)
    const [selectedLevel, setSelectedLevel] = useState<number>(1)

    // Create an array of levels from 1 to 30
    const levels = Array.from({ length: 30 }, (_, i) => i + 1)

    const generateRandomGun = () => {
        // Select random gun
        const randomRow = gunTable[Math.floor(Math.random() * gunTable.length)]
        const randomGun = randomRow[Math.floor(Math.random() * randomRow.length)]

        // Select random rarity
        const randomRarityRow = gunRarities[Math.floor(Math.random() * gunRarities.length)]
        const randomRarityInfo = randomRarityRow[Math.floor(Math.random() * randomRarityRow.length)]

        // Get elemental outcome based on the rarity
        const elementalOutcome = randomRarityInfo.elemental
            ? getRandomElementalOutcome(randomRarityInfo.rarity)
            : { damageTypes: [damageTypes.KINETIC], addedDamage: "0" }

        // Create base gun
        const baseGun: RandomGun = {
            type: randomGun.type,
            manufacturer: randomGun.manufacturer,
            rarity: randomRarityInfo.rarity,
            damageTypes: elementalOutcome.damageTypes,
            addedDamage: elementalOutcome.addedDamage,
            level: selectedLevel,
        }

        // Try to get gun stats based on level
        try {
            // Extract the name property from the gun type
            const typeName = randomGun.type.name;

            // Skip processing for "Choice" type or if type name is missing
            if (typeName && typeName !== 'Choice') {
                // Find the matching key in gt object by comparing the name values
                const gunTypeKey = Object.keys(gt).find(key =>
                    gt[key as keyof typeof gt].name === typeName
                ) as keyof typeof gt | undefined;

                if (gunTypeKey) {
                    const gunStats = getGunStatsByLevel(gunTypeKey, selectedLevel);

                    if (gunStats) {
                        baseGun.stats = gunStats.stats;
                        baseGun.range = gunStats.range;
                        baseGun.bonus = gunStats.bonus;
                    }
                }
            }
        } catch (error) {
            console.log('Could not get stats for gun:', error);
        }

        setSelectedGun(baseGun)
    }

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel(Number(e.target.value))
    }

    return (
        <div>
            <Controls>
                <div>
                    <Label htmlFor="level-select">Level:</Label>
                    <Select
                        id="level-select"
                        value={selectedLevel}
                        onChange={handleLevelChange}
                    >
                        {levels.map(level => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </Select>
                </div>
                <Button onClick={generateRandomGun}>Generate Random Gun</Button>
            </Controls>

            {selectedGun && (
                <GunDisplay>
                    <p><strong>Level:</strong> {selectedGun.level}</p>
                    <p><strong>Rarity:</strong> {selectedGun.rarity}</p>
                    <p><strong>Manufacturer:</strong> {selectedGun.manufacturer.name}</p>
                    <p><strong>Type:</strong> {selectedGun.type.name}</p>
                    {selectedGun.stats && (
                        <>
                            <p><strong>Base Damage:</strong> {selectedGun.stats.Damage}</p>
                            {selectedGun.range && <p><strong>Range:</strong> {selectedGun.range}</p>}
                            {selectedGun.bonus && <p><strong>Weapon Bonus:</strong> {selectedGun.bonus}</p>}
                        </>
                    )}
                    <p><strong>Damage Type:</strong> {selectedGun.damageTypes.join(" + ")}</p>
                    <p><strong>Damage Bonus:</strong> {selectedGun.addedDamage}</p>
                </GunDisplay>
            )}
        </div>
    )
}