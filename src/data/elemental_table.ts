import { damageTypes as dt } from './damage_types';
import { rarities as r, Rarity } from './rarities';

// Define an outcome that includes both element type and added damage
interface ElementOutcome {
  elementType: string; // Type of element
  addedDamage: string; // Damage dice like "1d6", "2d4", etc.
}

// Define a type for range-based rolls with multiple possible outcomes
interface RollRange {
  range: [number, number]; // [min, max] inclusive
  outcomes: ElementOutcome[]; // Array of possible outcomes with element and damage
}

// Define a structure for the final elemental outcome
interface ElementalOutcome {
  elementType: string | null; // null means no elemental damage
  addedDamage: string; // damage dice like "1d6", "2d4", etc.
}

// Define a special constant for non-elemental (kinetic) damage
export const NON_ELEMENTAL = 'NON_ELEMENTAL';

// Function to get a random element from an array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Elemental damage distribution by percentage chance and rarity
// Each range has an array of possible outcomes with element type and damage dice
export const elementalTable: RollRange[] = [
  { 
    range: [1, 50], 
    outcomes: [
      { elementType: dt.KINETIC, addedDamage: "0" },
      { elementType: dt.INCENDIARY, addedDamage: "1d4" }
    ]
  },
  { 
    range: [51, 60], 
    outcomes: [
      { elementType: dt.INCENDIARY, addedDamage: "1d6" },
      { elementType: dt.EXPLOSIVE, addedDamage: "2d4" }
    ]
  },
  { 
    range: [61, 70], 
    outcomes: [
      { elementType: dt.SHOCK, addedDamage: "1d8" },
      { elementType: dt.RADIATION, addedDamage: "1d10" }
    ]
  },
  { 
    range: [71, 80], 
    outcomes: [
      { elementType: dt.CORROSIVE, addedDamage: "1d6+1" },
      { elementType: dt.INCENDIARY, addedDamage: "2d4" }
    ]
  },
  { 
    range: [81, 90], 
    outcomes: [
      { elementType: dt.RADIATION, addedDamage: "1d10" },
      { elementType: dt.CORROSIVE, addedDamage: "1d8+1" }
    ]
  },
  { 
    range: [91, 95], 
    outcomes: [
      { elementType: dt.CRYO, addedDamage: "1d8" },
      { elementType: dt.SHOCK, addedDamage: "1d6+2" }
    ]
  },
  { 
    range: [96, 100], 
    outcomes: [
      { elementType: dt.EXPLOSIVE, addedDamage: "2d6" },
      { elementType: dt.CRYO, addedDamage: "1d12" }
    ]
  }
];

// Function to get an elemental outcome based on a percentile roll
export function getElementalOutcome(percentileRoll: number): ElementOutcome | undefined {
  // Make sure the roll is between 1-100
  const roll = Math.max(1, Math.min(100, percentileRoll));
  
  const result = elementalTable.find(entry => 
    roll >= entry.range[0] && roll <= entry.range[1]
  );
  
  return result ? getRandomElement(result.outcomes) : undefined;
}

// Helper function to get a random element outcome
export function getRandomElementalOutcome(rarity?: Rarity): ElementalOutcome {
  // Get a random roll and outcome
  const roll = Math.floor(Math.random() * 100) + 1;
  const outcome = getElementalOutcome(roll) || { elementType: dt.KINETIC, addedDamage: "0" };
  
  // If rarity provided, modify the damage dice based on rarity
  if (rarity) {
    const rarityMultiplier = getRarityMultiplier(rarity);
    outcome.addedDamage = scaleAddedDamage(outcome.addedDamage, rarityMultiplier);
  }
  
  // Handle NON_ELEMENTAL case
  if (outcome.elementType === NON_ELEMENTAL) {
    return {
      elementType: null,
      addedDamage: outcome.addedDamage
    };
  }
  
  return {
    elementType: outcome.elementType,
    addedDamage: outcome.addedDamage
  };
}

// Get rarity multiplier to scale damage dice
function getRarityMultiplier(rarity: Rarity): number {
  switch (rarity) {
    case r.COMMON:
      return 1;
    case r.UNCOMMON:
      return 1.25;
    case r.RARE:
      return 1.5;
    case r.EPIC:
      return 1.75;
    case r.LEGENDARY:
      return 2;
    default:
      return 1;
  }
}

// Scale added damage based on a multiplier
function scaleAddedDamage(damageDice: string, multiplier: number): string {
  if (damageDice === "0" || multiplier === 1) return damageDice;
  
  // Parse simple dice format like "1d6", "2d4", "1d8+2"
  const match = damageDice.match(/(\d+)d(\d+)(?:\+(\d+))?/);
  if (!match) return damageDice;
  
  const numDice = parseInt(match[1]);
  const diceType = parseInt(match[2]);
  const bonus = match[3] ? parseInt(match[3]) : 0;
  
  // Scale based on rarity
  const scaledNumDice = Math.floor(numDice * multiplier);
  const scaledNumDice2 = Math.max(1, scaledNumDice); // At least 1 die
  const scaledBonus = Math.floor(bonus * multiplier);
  
  return scaledBonus > 0 
    ? `${scaledNumDice2}d${diceType}+${scaledBonus}`
    : `${scaledNumDice2}d${diceType}`;
}