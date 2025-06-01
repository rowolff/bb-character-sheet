// filepath: /Users/robertwolff/Projects/bb-character-sheet/src/components/CreateGun.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { gunTable, GunType, gunRarities, getGunStatsByLevel, gt, prefixes, redText } from '../data/guntable'
import { elementalRules, Manufacturer, manufacturers } from '../data/manufacturers'
import { Rarity, rarities } from '../data/rarities'
import { GUN_TYPES } from '../data/gunTypesEnum'
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
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
`

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
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

// Helper function to check if a gun name matches a GUN_TYPES value
const gunNameMatchesType = (gunName: string, gunTypeValue: string): boolean => {
    return Object.values(GUN_TYPES).some(type => type === gunName && type === gunTypeValue);
};

export const CreateGun: React.FC = () => {
    const [selectedGun, setSelectedGun] = useState<RandomGun | null>(null)
    const [selectedLevel, setSelectedLevel] = useState<number>(1)
    const [selectedGunType, setSelectedGunType] = useState<string>("random")
    const [selectedRarity, setSelectedRarity] = useState<string>("random")
    const [selectedManufacturer, setSelectedManufacturer] = useState<string>("random")

    // Function to get available gun types for the selected manufacturer
    const getAvailableGunTypes = useCallback(() => {
        if (selectedManufacturer === "random") {
            // All gun types are available when manufacturer is random
            return Object.keys(gt);
        } else {
            const manufacturerKey = selectedManufacturer as keyof typeof manufacturers;
            const manufacturer = manufacturers[manufacturerKey];

            // Check if the manufacturer has a builds property
            if (manufacturer && 'builds' in manufacturer) {
                // Return gun type keys that match the manufacturer's builds
                return Object.keys(gt).filter(key => {
                    const gunType = gt[key as keyof typeof gt];
                    return manufacturer.builds?.some(build => gunNameMatchesType(gunType.name, build));
                });
            }

            // Fallback to all gun types if no builds property
            return Object.keys(gt);
        }
    }, [selectedManufacturer]);

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
        // Select gun based on dropdown or random
        let randomGun: { type: GunType; manufacturer: Manufacturer };
        let gunType: GunType | null = null;
        let manufacturer: Manufacturer | null = null;

        // Determine gun type based on selection
        if (selectedGunType !== "random") {
            const gunTypeKey = selectedGunType as keyof typeof gt;
            gunType = gt[gunTypeKey];
        }

        // Determine manufacturer based on selection
        if (selectedManufacturer !== "random") {
            const manufacturerKey = selectedManufacturer as keyof typeof manufacturers;
            manufacturer = manufacturers[manufacturerKey];
        }

        // Handle all combinations of selections
        if (gunType && manufacturer) {
            // Both gun type and manufacturer specified
            randomGun = { type: gunType, manufacturer: manufacturer };
        } else if (gunType) {
            // Only gun type specified, find matching manufacturers that can build this type
            const matchingManufacturers: Manufacturer[] = [];

            // Find manufacturers that can build this gun type
            Object.values(manufacturers).forEach(mfr => {
                if ('builds' in mfr && mfr.builds && mfr.builds.some(build => gunNameMatchesType(gunType!.name, build))) {
                    matchingManufacturers.push(mfr);
                }
            });

            if (matchingManufacturers.length > 0) {
                // Pick a random manufacturer from those that can build this gun type
                const randomManufacturer = matchingManufacturers[Math.floor(Math.random() * matchingManufacturers.length)];
                randomGun = { type: gunType, manufacturer: randomManufacturer };
            } else {
                // Fallback to CHOICE manufacturer if no suitable manufacturers found
                randomGun = { type: gunType, manufacturer: manufacturers.CHOICE };
            }
        } else if (manufacturer) {
            // Only manufacturer specified, find matching guns and pick random type
            const matchingGuns: { type: GunType; manufacturer: Manufacturer }[] = [];

            // Check if this manufacturer has builds defined
            if ('builds' in manufacturer && manufacturer.builds) {
                // Use the builds property to find available gun types for this manufacturer
                const availableBuilds = manufacturer.builds;

                if (availableBuilds.length > 0) {
                    // Pick a random gun type from the available builds
                    const randomBuild = availableBuilds[Math.floor(Math.random() * availableBuilds.length)];
                    // Find the matching gun type object
                    const matchingGunType = Object.values(gt).find(gunType => gunNameMatchesType(gunType.name, randomBuild));
                    if (matchingGunType) {
                        randomGun = { type: matchingGunType, manufacturer: manufacturer };
                    } else {
                        // Fallback in case no match is found
                        randomGun = { type: gt.CHOICE, manufacturer: manufacturer };
                    }
                } else {
                    // Fallback to a random gun type if no builds defined
                    const randomGunType = Object.values(gt).filter(g => g.name !== "Weapon of your choosing")[
                        Math.floor(Math.random() * (Object.values(gt).length - 1))
                    ];
                    randomGun = { type: randomGunType as GunType, manufacturer: manufacturer };
                }
            } else {
                // If no builds property, search for this manufacturer in the gun table
                gunTable.forEach(row => {
                    row.forEach(gun => {
                        if (gun.manufacturer.name === manufacturer!.name) {
                            matchingGuns.push(gun);
                        }
                    });
                });

                if (matchingGuns.length > 0) {
                    randomGun = matchingGuns[Math.floor(Math.random() * matchingGuns.length)];
                } else {
                    // Fallback to a random gun type if no matching guns found
                    const randomGunType = Object.values(gt).filter(g => g.name !== "Weapon of your choosing")[
                        Math.floor(Math.random() * (Object.values(gt).length - 1))
                    ];
                    randomGun = { type: randomGunType as GunType, manufacturer: manufacturer };
                }
            }
        } else {
            // Both random, pick a completely random gun
            const randomRow = gunTable[Math.floor(Math.random() * gunTable.length)]
            randomGun = randomRow[Math.floor(Math.random() * randomRow.length)]
        }

        // Select rarity based on dropdown or random
        let randomRarityInfo: { rarity: Rarity; elemental: boolean };

        if (selectedRarity === "random") {
            // Select a completely random rarity
            const randomRarityRow = gunRarities[Math.floor(Math.random() * gunRarities.length)]
            randomRarityInfo = randomRarityRow[Math.floor(Math.random() * randomRarityRow.length)]
        } else {
            // Use the selected rarity with 50% chance of elemental
            const rarityValue = selectedRarity as keyof typeof rarities;
            randomRarityInfo = {
                rarity: rarities[rarityValue],
                elemental: Math.random() < 0.5 // 50% chance of elemental
            };
        }

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

    // Effect to reset gun type to "random" if it's not compatible with manufacturer
    useEffect(() => {
        if (selectedManufacturer !== "random" && selectedGunType !== "random") {
            const availableGunTypes = getAvailableGunTypes();

            if (!availableGunTypes.includes(selectedGunType)) {
                setSelectedGunType("random");
            }
        }
    }, [selectedManufacturer, getAvailableGunTypes, selectedGunType]);

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel(Number(e.target.value))
    }

    const handleGunTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGunType(e.target.value)
    }

    const handleRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRarity(e.target.value)
    }

    const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newManufacturer = e.target.value;
        setSelectedManufacturer(newManufacturer);

        // If the manufacturer is not random, check if the current gun type is valid for this manufacturer
        if (newManufacturer !== "random" && selectedGunType !== "random") {
            const availableGunTypes = getAvailableGunTypes();

            // Reset gun type to random if current selection is not available for this manufacturer
            if (!availableGunTypes.includes(selectedGunType)) {
                setSelectedGunType("random");
            }
        }
    }

    return (
        <Container>
            {/* Consolidated AudioPlayer for all sounds */}
            <AudioPlayer sounds={sounds} />

            <Controls>
                <SelectContainer>
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
                </SelectContainer>

                <SelectContainer>
                    <Label htmlFor="gun-type-select">Gun Type:</Label>
                    <Select
                        id="gun-type-select"
                        value={selectedGunType}
                        onChange={handleGunTypeChange}
                    >
                        <option value="random">Random</option>
                        {Object.entries(gt).map(([key, value]) => {
                            // Skip the CHOICE gun type (if any)
                            if (key === "CHOICE") return null;

                            // Check if this gun type is available for the selected manufacturer
                            const isAvailable = selectedManufacturer === "random" ||
                                getAvailableGunTypes().includes(key);

                            return (
                                <option
                                    key={key}
                                    value={key}
                                    disabled={!isAvailable}
                                >
                                    {value.name}{!isAvailable ? " (unavailable)" : ""}
                                </option>
                            );
                        })}
                    </Select>
                </SelectContainer>

                <SelectContainer>
                    <Label htmlFor="rarity-select">Rarity:</Label>
                    <Select
                        id="rarity-select"
                        value={selectedRarity}
                        onChange={handleRarityChange}
                    >
                        <option value="random">Random</option>
                        {Object.entries(rarities).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </SelectContainer>

                <SelectContainer>
                    <Label htmlFor="manufacturer-select">Manufacturer:</Label>
                    <Select
                        id="manufacturer-select"
                        value={selectedManufacturer}
                        onChange={handleManufacturerChange}
                    >
                        <option value="random">Random</option>
                        {Object.entries(manufacturers)
                            .filter(([key, _]) => key !== "CHOICE") // Filter out the CHOICE manufacturer
                            .map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.name}
                                </option>
                            ))}
                    </Select>
                </SelectContainer>

                <Button onClick={generateRandomGun}>Generate Gun</Button>
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
