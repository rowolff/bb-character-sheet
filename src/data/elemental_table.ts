import { damageTypes as dt } from './damage_types';
import { rarities as r, Rarity } from './rarities';

type ElementOutcome = {
    elementType: string; // null means no elemental damage
    addedDamage: string; // e.g. "1d6", "2d8+3", or "0" for no damage
};

type RarityOutcome = {
    [key in Rarity]: ElementOutcome
};
// Define a type for range-based rolls with multiple possible outcomes

interface RollRange {
    range: [number, number]; // [min, max] inclusive
    outcomes: RarityOutcome; // ARarity based outcomes with element and damage
}

// Elemental damage distribution by percentage chance and rarity
// Each range has an outcomes based on rarity, with element type and damage dice
export const elementalTable: RollRange[] = [
    {
        range: [1, 80],
        outcomes: {
            [r.COMMON]: { elementType: dt.KINETIC, addedDamage: "0" },
            [r.UNCOMMON]: { elementType: dt.INCENDIARY, addedDamage: "1d4" },
            [r.RARE]: { elementType: dt.CORROSIVE, addedDamage: "1d6" },
            [r.EPIC]: { elementType: dt.SHOCK, addedDamage: "1d8" },
            [r.LEGENDARY]: { elementType: dt.RADIATION, addedDamage: "1d10" }
        }
    },
    {
        range: [81, 100],
        outcomes: {
            [r.COMMON]: { elementType: dt.CRYO, addedDamage: "2d6" },
            [r.UNCOMMON]: { elementType: dt.INCENDIARY, addedDamage: "2d8" },
            [r.RARE]: { elementType: dt.CORROSIVE, addedDamage: "2d10" },
            [r.EPIC]: { elementType: dt.SHOCK, addedDamage: "2d12" },
            [r.LEGENDARY]: { elementType: dt.RADIATION, addedDamage: "3d10" }
        }
    }
];

// Function to get an elemental outcome based on a percentile roll and rarity
export function getElementalOutcome(percentileRoll: number, rarity: Rarity): ElementOutcome {
    // Make sure the roll is between 1-100
    const roll = Math.max(1, Math.min(100, percentileRoll));

    const result = elementalTable.find(entry =>
        roll >= entry.range[0] && roll <= entry.range[1]
    );

    return result ? result.outcomes[rarity] : { elementType: dt.KINETIC, addedDamage: "0" };
}

// Helper function to get a random element outcome
export function getRandomElementalOutcome(rarity: Rarity): ElementOutcome {
    // Get a random roll and outcome
    const roll = Math.floor(Math.random() * 100) + 1;
    const outcome = getElementalOutcome(roll, rarity);

    return {
        elementType: outcome.elementType,
        addedDamage: outcome.addedDamage
    };

}