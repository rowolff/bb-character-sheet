const ranks = [
    { range: [1, 3], piles: 1 },
    { range: [4, 6], piles: 2 },
    { range: [7, 12], piles: 3 },
    { range: [13, 18], piles: 4 },
    { range: [19, 24], piles: 5 },
    { range: [25, 100], piles: 6 },
]

const piles = [
    ['10g', '30g', 'Health Potion (3d8+10)', 'Random Potions (2)', 'Grenade Mod', 'Grenade Mod'],
    ['Health Potion (1d8)', 'Health Potion (2d8+5)', 'Shield Potion (3d8+10)', 'Grenade Mod', 'Shield Mod', 'Uncommon Relic'],
    ['Shield Potion (1d8)', 'Shield Potion (1d8)', 'Random Potion (1)', 'Shield Mod', 'Common Relic', 'Random Gun'],
    ['Grenade (1)', 'Grenades (2)', 'Grenades (3)', 'Random Gun', 'Random Gun', 'Random Gun']
]

export const getLootByRank = (rank: number): string[] => {
    const loot = [];
    for (const r of ranks) {
        if (rank >= r.range[0] && rank <= r.range[1]) {
            // roll as many piles as specified
            for (let pile = 0; pile < r.piles; pile++) {
                const randomRow = Math.floor(Math.random() * piles.length);
                loot.push(piles[randomRow][pile]);
            }
            break;
        }
    }
    return loot;
}