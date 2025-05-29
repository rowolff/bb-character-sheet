export const rarities = {
    COMMON: 'Common',
    UNCOMMON: 'Uncommon',
    RARE: 'Rare',
    EPIC: 'Epic',
    LEGENDARY: 'Legendary',
} as const;
export type Rarity = (typeof rarities)[keyof typeof rarities];