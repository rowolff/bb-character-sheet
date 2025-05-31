import React, { useState } from 'react';
import styled from 'styled-components';
import { getLootByRank } from '../data/loot';

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
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
`;

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
`;

const Label = styled.label`
  margin-right: 5px;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const LootDisplay = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #212163;
  border-radius: 4px;
  width: 100%; /* Take up full width of container */
  min-height: 100px;
  box-sizing: border-box;
`;

const LootItem = styled.li`
  margin-bottom: 8px;
  padding: 5px;
  background-color: #2a206d;
  border-radius: 4px;
`;

export const Loot: React.FC = () => {
    const [selectedRank, setSelectedRank] = useState<number>(1);
    const [lootPiles, setLootPiles] = useState<string[]>([]);

    // Create an array of ranks from 1 to 30
    const ranks = Array.from({ length: 30 }, (_, i) => i + 1);

    const handleRankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRank(Number(e.target.value));
    };

    const generateLoot = () => {
        const loot = getLootByRank(selectedRank);
        setLootPiles(loot);
    };

    return (
        <Container>
            <Controls>
                <div>
                    <Label htmlFor="rank-select">Rank:</Label>
                    <Select
                        id="rank-select"
                        value={selectedRank}
                        onChange={handleRankChange}
                    >
                        {ranks.map(rank => (
                            <option key={rank} value={rank}>
                                {rank}
                            </option>
                        ))}
                    </Select>
                </div>
                <Button onClick={generateLoot}>Generate Loot Piles</Button>
            </Controls>

            {lootPiles.length > 0 && (
                <LootDisplay>
                    <h3>Loot Piles for Rank {selectedRank}</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        {lootPiles.map((item, index) => (
                            <LootItem key={index}>{item}</LootItem>
                        ))}
                    </ul>
                </LootDisplay>
            )}
        </Container>
    );
};
