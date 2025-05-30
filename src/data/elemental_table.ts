import { DamageType, damageTypes as dt } from './damage_types';
import { rarities as r, Rarity } from './rarities';

type ElementOutcome = {
    damageTypes: DamageType[]; // e.g. "Kinetic", "Incendiary", "Corrosive", etc.
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
        range: [1, 10],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.KINETIC], addedDamage: "0" }
        }
    },
    {
        range: [11, 15],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.RADIATION], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.RADIATION], addedDamage: "0" }
        }
    },
    {
        range: [16, 20],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.CORROSIVE], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.CORROSIVE], addedDamage: "0" }
        }
    },
    {
        range: [21, 25],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.SHOCK], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.SHOCK], addedDamage: "0" }
        }
    },
    {
        range: [26, 30],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.RADIATION], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "0" }
        }
    },
    {
        range: [31, 35],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.CORROSIVE], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.INCENDIARY], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.INCENDIARY], addedDamage: "0" }
        }
    },
    {
        range: [36, 40],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.SHOCK], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.CRYO], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.CRYO], addedDamage: "0" }
        }
    },
    {
        range: [41, 45],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.RADIATION], addedDamage: "1d6" },
            [r.LEGENDARY]: { damageTypes: [dt.RADIATION], addedDamage: "1d6" }
        }
    },
    {
        range: [46, 50],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.INCENDIARY], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.CORROSIVE], addedDamage: "1d6" },
            [r.LEGENDARY]: { damageTypes: [dt.CORROSIVE], addedDamage: "1d6" }
        }
    },
    {
        range: [51, 55],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.CRYO], addedDamage: "0" },
            [r.EPIC]: { damageTypes: [dt.SHOCK], addedDamage: "1d6" },
            [r.LEGENDARY]: { damageTypes: [dt.SHOCK], addedDamage: "1d6" }
        }
    },
    {
        range: [56, 60],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.RADIATION], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.RADIATION], addedDamage: "1d6" },
            [r.EPIC]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "1d6" },
            [r.LEGENDARY]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "1d6" }
        }
    },
    {
        range: [61, 65],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.CORROSIVE], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.CORROSIVE], addedDamage: "1d6" },
            [r.EPIC]: { damageTypes: [dt.INCENDIARY], addedDamage: "1d6" },
            [r.LEGENDARY]: { damageTypes: [dt.INCENDIARY], addedDamage: "1d6" }
        }
    },
    {
        range: [66, 70],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.SHOCK], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.SHOCK], addedDamage: "1d6" },
            [r.EPIC]: { damageTypes: [dt.CRYO], addedDamage: "1d6" },
            [r.LEGENDARY]: { damageTypes: [dt.CRYO], addedDamage: "1d6" }
        }
    },
    {
        range: [71, 75],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "1d6" },
            [r.EPIC]: { damageTypes: [dt.RADIATION], addedDamage: "2d6" },
            [r.LEGENDARY]: { damageTypes: [dt.RADIATION], addedDamage: "2d6" }
        }
    },
    {
        range: [76, 80],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.INCENDIARY], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.INCENDIARY], addedDamage: "1d6" },
            [r.EPIC]: { damageTypes: [dt.CORROSIVE], addedDamage: "2d6" },
            [r.LEGENDARY]: { damageTypes: [dt.CORROSIVE], addedDamage: "2d6" }
        }
    },
    {
        range: [81, 85],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.KINETIC], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.CRYO], addedDamage: "0" },
            [r.RARE]: { damageTypes: [dt.CRYO], addedDamage: "1d6" },
            [r.EPIC]: { damageTypes: [dt.SHOCK], addedDamage: "2d6" },
            [r.LEGENDARY]: { damageTypes: [dt.SHOCK], addedDamage: "2d6" }
        }
    },
    {
        range: [86, 90],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.RADIATION], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.RADIATION], addedDamage: "1d6" },
            [r.RARE]: { damageTypes: [dt.RADIATION], addedDamage: "2d6" },
            [r.EPIC]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "2d6" },
            [r.LEGENDARY]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "2d6" }
        }
    },
    {
        range: [91, 92],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.CORROSIVE], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.CORROSIVE], addedDamage: "1d6" },
            [r.RARE]: { damageTypes: [dt.CORROSIVE], addedDamage: "2d6" },
            [r.EPIC]: { damageTypes: [dt.INCENDIARY], addedDamage: "2d6" },
            [r.LEGENDARY]: { damageTypes: [dt.INCENDIARY], addedDamage: "2d6" }
        }
    },
    {
        range: [93, 94],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.SHOCK], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.SHOCK], addedDamage: "1d6" },
            [r.RARE]: { damageTypes: [dt.SHOCK], addedDamage: "2d6" },
            [r.EPIC]: { damageTypes: [dt.CRYO], addedDamage: "2d6" },
            [r.LEGENDARY]: { damageTypes: [dt.CRYO], addedDamage: "2d6" }
        }
    },
    {
        range: [95, 96],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "1d6" },
            [r.RARE]: { damageTypes: [dt.EXPLOSIVE], addedDamage: "2d6" },
            [r.EPIC]: { damageTypes: [dt.RADIATION, dt.INCENDIARY], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.RADIATION, dt.INCENDIARY], addedDamage: "0" }
        }
    },
    {
        range: [97, 98],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.INCENDIARY], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.INCENDIARY], addedDamage: "1d6" },
            [r.RARE]: { damageTypes: [dt.INCENDIARY], addedDamage: "2d6" },
            [r.EPIC]: { damageTypes: [dt.SHOCK, dt.CORROSIVE], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.SHOCK, dt.CORROSIVE], addedDamage: "0" }
        }
    },
    {
        range: [99, 100],
        outcomes: {
            [r.COMMON]: { damageTypes: [dt.CRYO], addedDamage: "0" },
            [r.UNCOMMON]: { damageTypes: [dt.CRYO], addedDamage: "1d6" },
            [r.RARE]: { damageTypes: [dt.CRYO], addedDamage: "2d6" },
            [r.EPIC]: { damageTypes: [dt.EXPLOSIVE, dt.CRYO], addedDamage: "0" },
            [r.LEGENDARY]: { damageTypes: [dt.EXPLOSIVE, dt.CRYO], addedDamage: "0" }
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

    return result ? result.outcomes[rarity] : { damageTypes: [dt.KINETIC], addedDamage: "0" };
}

// Helper function to get a random element outcome
export function getRandomElementalOutcome(rarity: Rarity, elementalBonus?: number): ElementOutcome {
    // Get a random roll and outcome
    let roll = Math.floor(Math.random() * 100) + 1;
    // If an elemental bonus is provided, adjust the roll
    if (elementalBonus) {
        // Ensure the roll is still within 1-100 after adding the bonus
        roll = Math.max(1, Math.min(100, roll + elementalBonus));
    }
    const outcome = getElementalOutcome(roll, rarity);

    return {
        damageTypes: outcome.damageTypes,
        addedDamage: outcome.addedDamage
    };

}