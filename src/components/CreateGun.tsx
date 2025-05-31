// filepath: /Users/robertwolff/Projects/bb-character-sheet/src/components/CreateGun.tsx
import React, { useState, useEffect } from 'react'
import { gunTable, GunType, gunRarities, getGunStatsByLevel, gt, prefixes, redText } from '../data/guntable'
import { elementalRules, Manufacturer, manufacturers } from '../data/manufacturers'
import { Rarity, rarities } from '../data/rarities'
import AudioPlayer from './AudioPlayer'
import { getRandomElementalOutcome } from '../data/elemental_table'
import styled, { keyframes, css } from 'styled-components'
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

// Define background colors for different rarities
const rarityColors = {
    COMMON: '#333333',    // Dark grey
    UNCOMMON: '#1e441e',  // Dark green
    RARE: '#1a3a5a',      // Light blue
    EPIC: '#3a1e5a',      // Purple
    LEGENDARY: '#c06000', // Orange
}

// Keyframes for border animations
const flashAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
  50% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 1); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 220, 180, 0.5); }
  50% { box-shadow: 0 0 0 4px rgba(255, 220, 180, 0.5); }
  100% { box-shadow: 0 0 0 0 rgba(255, 220, 180, 0.5); }
`;

// Flash animation for Rare rarity (light blue)
const rareFlashAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(100, 180, 255, 0); }
  50% { box-shadow: 0 0 0 8px rgba(100, 180, 255, 0.7); }
  100% { box-shadow: 0 0 0 0 rgba(100, 180, 255, 0); }
`;

// Flash animation for Epic rarity (light purple)
const epicFlashAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(200, 120, 255, 0); }
  50% { box-shadow: 0 0 0 10px rgba(200, 120, 255, 0.7); }
  100% { box-shadow: 0 0 0 0 rgba(200, 120, 255, 0); }
`;

const GunDisplay = styled.div<{ rarity?: string; isLegendary?: boolean; isEpic?: boolean; isRare?: boolean }>`
  margin-top: 10px;
  padding: 15px;
  background-color: ${props => props.rarity ? rarityColors[props.rarity as keyof typeof rarityColors] || '#212163' : '#212163'};
  border-radius: 4px;
  width: 100%; /* Take up full width of container */
  box-sizing: border-box;
  transition: background-color 0.3s ease;
  position: relative;
  
  ${props => props.isLegendary && css`
    animation: ${flashAnimation} 0.6s ease-out,
               ${pulseAnimation} 2s infinite ease-in-out 0.7s;
  `}
  
  ${props => props.isEpic && css`
    animation: ${epicFlashAnimation} 0.5s ease-out;
  `}
  
  ${props => props.isRare && css`
    animation: ${rareFlashAnimation} 0.5s ease-out;
  `}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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
    prefix?: { name: string; effect: string; };
    redText?: { name: string; effect: string; };
}

export const CreateGun: React.FC = () => {
    const [selectedGun, setSelectedGun] = useState<RandomGun | null>(null)
    const [selectedLevel, setSelectedLevel] = useState<number>(1)

    // Define sound configuration structure with all sounds in one state object
    type SoundState = {
        [key: string]: {
            url: string;
            play: boolean;
        }
    }

    const [sounds, setSounds] = useState<SoundState>({
        legendary: {
            url: "https://www.dropbox.com/s/7cdamczfwy1ud3o/legendarydrop.mp3?dl=1",
            play: false
        },
        rare: {
            url: "https://www.filterblade.xyz/assets/sounds/AlertSound11.mp3",
            play: false
        },
        epic: {
            url: "https://www.filterblade.xyz/assets/sounds/AlertSound8.mp3",
            play: false
        }
    })

    // Create an array of levels from 1 to 30
    const levels = Array.from({ length: 30 }, (_, i) => i + 1)

    const generateRandomGun = () => {
        // Select random gun
        const randomRow = gunTable[Math.floor(Math.random() * gunTable.length)]
        const randomGun = randomRow[Math.floor(Math.random() * randomRow.length)]

        // Select random rarity
        const randomRarityRow = gunRarities[Math.floor(Math.random() * gunRarities.length)]
        const randomRarityInfo = randomRarityRow[Math.floor(Math.random() * randomRarityRow.length)]

        let elementalOutcome: { damageTypes: DamageType[], addedDamage: string } = { damageTypes: [damageTypes.KINETIC], addedDamage: "0" }

        // Get elemental outcome based on gun roll, manufacturer rules and the rarity
        if (randomRarityInfo.elemental || randomGun.manufacturer === manufacturers.MALEFACTOR) {
            switch (randomGun.manufacturer.elemental) {
                case elementalRules.ALWAYS:
                    while (elementalOutcome.damageTypes.includes(damageTypes.KINETIC)) {
                        elementalOutcome = getRandomElementalOutcome(randomRarityInfo.rarity, randomGun.manufacturer.elementalBonuses[randomRarityInfo.rarity])
                    }
                    break;
                case elementalRules.NORMAL:
                    elementalOutcome = getRandomElementalOutcome(randomRarityInfo.rarity, randomGun.manufacturer.elementalBonuses[randomRarityInfo.rarity])
                    break;
                case elementalRules.NEVER:
                    break;
                default:
                    break;
            }
        }

        // Create base gun
        const baseGun: RandomGun = {
            type: randomGun.type,
            manufacturer: randomGun.manufacturer,
            rarity: randomRarityInfo.rarity,
            damageTypes: elementalOutcome.damageTypes,
            addedDamage: elementalOutcome.addedDamage,
            level: selectedLevel,
        }

        // Add a prefix for Epic or Legendary rarities
        if (randomRarityInfo.rarity === rarities.EPIC || randomRarityInfo.rarity === rarities.LEGENDARY) {
            const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
            baseGun.prefix = randomPrefix
        }

        // Add red text for Legendary rarity (100% chance) or Rare rarity (5% chance)
        if (randomRarityInfo.rarity === rarities.LEGENDARY ||
            (randomRarityInfo.rarity === rarities.RARE && Math.random() < 0.05)) {
            const randomRedText = redText[Math.floor(Math.random() * redText.length)]
            baseGun.redText = randomRedText
        }

        // Try to get gun stats based on level
        try {
            // Extract the name property from the gun type
            const typeName = randomGun.type.name;

            // Skip processing for "Choice" type or if type name is missing
            if (typeName && typeName !== 'Weapon of your choosing') {
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

        // Update all sounds at once based on rarity
        const newSounds: SoundState = {
            legendary: {
                url: sounds.legendary.url,
                play: randomRarityInfo.rarity === rarities.LEGENDARY
            },
            rare: {
                url: sounds.rare.url,
                play: randomRarityInfo.rarity === rarities.RARE
            },
            epic: {
                url: sounds.epic.url,
                play: randomRarityInfo.rarity === rarities.EPIC
            }
        };

        setSounds(newSounds);
    }

    // Reset all sound play states after they've been triggered with a single effect
    useEffect(() => {
        // Create an object to track which sounds need to be reset
        const soundsToReset: { [key: string]: boolean } = {};
        let needsReset = false;

        // Check each sound to see if it's playing
        Object.entries(sounds).forEach(([key, sound]) => {
            if (sound.play) {
                soundsToReset[key] = true;
                needsReset = true;
            }
        });

        // If any sounds are playing, set a timeout to reset them
        if (needsReset) {
            const timer = setTimeout(() => {
                setSounds(prevSounds => {
                    const newSounds = { ...prevSounds };

                    // Reset only the sounds that were playing
                    Object.keys(soundsToReset).forEach(key => {
                        if (newSounds[key]) {
                            newSounds[key] = {
                                ...newSounds[key],
                                play: false
                            };
                        }
                    });

                    return newSounds;
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [sounds]);

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel(Number(e.target.value))
    }

    return (
        <Container>
            {/* Consolidated AudioPlayer for all sounds */}
            <AudioPlayer sounds={sounds} />

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
                <GunDisplay
                    rarity={selectedGun.rarity.toUpperCase()}
                    isLegendary={selectedGun.rarity === rarities.LEGENDARY}
                    isEpic={selectedGun.rarity === rarities.EPIC}
                    isRare={selectedGun.rarity === rarities.RARE}
                >
                    <p style={{
                        fontSize: '18px',
                        marginTop: '5px',
                        marginBottom: '15px',
                        textAlign: 'center',
                        padding: '5px 0',
                        borderBottom: '1px solid rgb(131, 131, 131)'
                    }}>
                        <strong>
                            {selectedGun.prefix ? `${selectedGun.prefix.name} ${selectedGun.rarity}` : selectedGun.rarity}{' '}
                            {selectedGun.manufacturer.name}{' '}
                            {selectedGun.type.name}
                        </strong>
                    </p>
                    <p><strong>Level:</strong> {selectedGun.level}</p>
                    <p><strong>Damage Type:</strong> {selectedGun.damageTypes.join(" + ")}</p>
                    {selectedGun.stats && (
                        <>
                            <p><strong>Base Damage:</strong> {selectedGun.stats.Damage}</p>
                            {selectedGun.range && <p><strong>Range:</strong> {selectedGun.range}</p>}

                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                <p><strong>Stats:</strong></p>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left', padding: '3px 5px', borderBottom: '1px solid rgb(131, 131, 131)' }}>Roll</th>
                                            <th style={{ textAlign: 'center', padding: '3px 5px', borderBottom: '1px solid rgb(131, 131, 131)' }}>Hits</th>
                                            <th style={{ textAlign: 'center', padding: '3px 5px', borderBottom: '1px solid rgb(131, 131, 131)' }}>Crits</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: '3px 5px' }}>{selectedGun.stats.LOW.name || 'LOW'}</td>
                                            <td style={{ textAlign: 'center', padding: '3px 5px' }}>{selectedGun.stats.LOW.Hits}</td>
                                            <td style={{ textAlign: 'center', padding: '3px 5px' }}>{selectedGun.stats.LOW.Crits}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '3px 5px' }}>{selectedGun.stats.MEDIUM.name || 'MEDIUM'}</td>
                                            <td style={{ textAlign: 'center', padding: '3px 5px' }}>{selectedGun.stats.MEDIUM.Hits}</td>
                                            <td style={{ textAlign: 'center', padding: '3px 5px' }}>{selectedGun.stats.MEDIUM.Crits}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '3px 5px' }}>{selectedGun.stats.HIGH.name || 'HIGH'}</td>
                                            <td style={{ textAlign: 'center', padding: '3px 5px' }}>{selectedGun.stats.HIGH.Hits}</td>
                                            <td style={{ textAlign: 'center', padding: '3px 5px' }}>{selectedGun.stats.HIGH.Crits}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Additional Effects Section */}
                    <div style={{ marginTop: '15px', borderTop: '1px solid rgb(131, 131, 131)', paddingTop: '10px' }}>
                        <ul style={{ fontSize: '14px', marginTop: '5px', paddingLeft: '20px' }}>
                            {selectedGun.addedDamage !== '0' && (
                                <li style={{ marginBottom: '5px' }}>adds {selectedGun.addedDamage} {selectedGun.damageTypes.join(" and ")} damage (element roll)</li>
                            )}
                            {selectedGun.bonus && (<li style={{ marginBottom: '5px' }}>{selectedGun.bonus} (weapon type)</li>)}
                            <li style={{ marginBottom: '5px' }}>{selectedGun.manufacturer.gunInfo} (manufacturer)</li>
                            <li style={{ marginBottom: '5px' }}>{selectedGun.manufacturer.stats[selectedGun.rarity as keyof typeof selectedGun.manufacturer.stats]} (manufacturer)</li>
                            {selectedGun.prefix && (
                                <li style={{ marginBottom: '5px' }}>
                                    {selectedGun.prefix.effect}
                                </li>
                            )}
                            {selectedGun.redText && (
                                <li style={{ marginBottom: '5px' }}>
                                    {selectedGun.redText.effect}
                                </li>
                            )}
                        </ul>
                    </div>
                    {selectedGun.redText && (<div style={{ marginTop: '15px', borderTop: '1px solid rgb(131, 131, 131)', paddingTop: '10px' }}>

                        <p style={{ color: '#a31e1e' }}><strong>"{selectedGun.redText.name}"</strong></p>

                    </div>)}
                </GunDisplay>
            )}
        </Container>
    )
}
