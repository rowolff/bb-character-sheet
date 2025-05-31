import { rarities as r } from './rarities';

export const elementalRules = {
    NEVER: 'never',
    ALWAYS: 'always',
    NORMAL: 'roll',
} as const;

export const manufacturers = {
    SKULLDUGGER: {
        name: 'Skulldugger',
        stats: {
            [r.COMMON]: '+2 DMG Mod, Overheat: 1d4',
            [r.UNCOMMON]: '+3 DMG Mod, Overheat: 1d6',
            [r.RARE]: '+4 DMG Mod, Overheat: 1d8',
            [r.EPIC]: '+5 DMG Mod, Overheat: 1d10',
            [r.LEGENDARY]: '+6 DMG Mod, Overheat: 1d12',
        },
        elemental: elementalRules.NORMAL,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Overheat: When taking a Reload Action, roll the dice value specified and take the result as Incendiary Damage. Increased Damage.'
    },
    FERIORE: {
        name: 'Feriore',
        stats: {
            [r.COMMON]: 'Swap/Reload: 1d4 Grenade Damage, -3 ACC Mod',
            [r.UNCOMMON]: 'Swap/Reload: 1d6 Grenade Damage, -3 ACC Mod',
            [r.RARE]: 'Swap/Reload: 1d8 Grenade Damage, -2 ACC Mod',
            [r.EPIC]: 'Swap/Reload: 1d10 Grenade Damage, -2 ACC Mod',
            [r.LEGENDARY]: 'Swap/Reload: 1d12 Grenade Damage, -1 ACC Mod',
        },
        elemental: elementalRules.NORMAL,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Swap/Reload: When taking a Swap Gun or Reload action, the gun is Thrown and deals Damage like a grenade. Less Accuracy.'
    },
    DAHLIA: {
        name: 'Dahlia',
        stats: {
            [r.COMMON]: 'Burst: +1 Hit',
            [r.UNCOMMON]: 'Burst: +1 Hit, +1 ACC Mod',
            [r.RARE]: 'Burst: +1 Hit, +2 ACC Mod',
            [r.EPIC]: 'Burst: +1 Hit, +3 ACC Mod',
            [r.LEGENDARY]: 'Burst: +1 Hit, +4 ACC Mod',
        },
        elemental: elementalRules.NORMAL,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Burst: Adds an additional Hit to each Attack. Increased Accuracy.'
    },
    BLACKPOWDER: {
        name: 'Black Powder',
        stats: {
            [r.COMMON]: '+2 ACC Mod, +2 Crit Damage',
            [r.UNCOMMON]: '+2 ACC Mod, +3 Crit Damage',
            [r.RARE]: '+2 ACC Mod, +4 Crit Damage',
            [r.EPIC]: '+2 ACC Mod, +5 Crit Damage',
            [r.LEGENDARY]: '+2 ACC Mod, +6 Crit Damage',
        },
        elemental: elementalRules.NEVER,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Increased Accuracy. Highly increased Crit Damage. Never deals Elemental Damage.'
    },
    ALAS: {
        name: 'Alas!',
        stats: {
            [r.COMMON]: '+1 DMG Mod',
            [r.UNCOMMON]: '+2 DMG Mod',
            [r.RARE]: '+3 DMG Mod',
            [r.EPIC]: '+3 DMG Mod',
            [r.LEGENDARY]: '+4 DMG Mod',
        },
        elemental: elementalRules.NEVER,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Increased Damage. Never deals Elemental Damage.'
    },
    MALEFACTOR: {
        name: 'Malefactor',
        stats: {
            [r.COMMON]: 'Element Roll, -2 DMG Mod',
            [r.UNCOMMON]: 'Element Roll, -1 DMG Mod',
            [r.RARE]: '+10% Element Roll',
            [r.EPIC]: '+15% Element Roll',
            [r.LEGENDARY]: '+20% Element Roll',
        },
        elemental: elementalRules.ALWAYS,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 10,
            [r.EPIC]: 15,
            [r.LEGENDARY]: 20,
        },
        gunInfo: 'Always deals Elemental Damage. Reduced overall Damage at lower Rarities.'
    },
    STOKER: {
        name: 'Stoker',
        stats: {
            [r.COMMON]: 'Extra Attack, -3 ACC Mod',
            [r.UNCOMMON]: 'Extra Attack, -2 ACC Mod',
            [r.RARE]: 'Extra Attack, -1 ACC Mod',
            [r.EPIC]: 'Extra Attack',
            [r.LEGENDARY]: 'Extra Attack, Extra Movement',
        },
        elemental: elementalRules.NORMAL,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Less Accuracy. Gain an Extra Attack Action.'
    },
    HYPERIUS: {
        name: 'Hyperius',
        stats: {
            [r.COMMON]: '+1 ACC Mod, -2 DMG Mod',
            [r.UNCOMMON]: '+2 ACC Mod, -2 DMG Mod',
            [r.RARE]: '+3 ACC Mod, -2 DMG Mod',
            [r.EPIC]: '+4 ACC Mod, -2 DMG Mod',
            [r.LEGENDARY]: '+5 ACC Mod, -2 DMG Mod',
        },
        elemental: elementalRules.NORMAL,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Increased Accuracy. Reduced overall Damage.'
    },
    TORGUE: {
        name: 'Torgue',
        stats: {
            [r.COMMON]: 'Splash, -4 ACC Mod',
            [r.UNCOMMON]: 'Splash, -3 ACC Mod',
            [r.RARE]: 'Splash, -2 ACC Mod',
            [r.EPIC]: 'Splash, -1 ACC Mod',
            [r.LEGENDARY]: 'Splash',
        },
        elemental: elementalRules.NORMAL,
        elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
        gunInfo: 'Less Accuracy. Splash.'
    },
    CHOICE: {
        name: 'any manufacturer', elemental: elementalRules.NORMAL, stats: {}, gunInfo: 'Choose a favourite manufacturer.', elementalBonuses: {
            [r.COMMON]: 0,
            [r.UNCOMMON]: 0,
            [r.RARE]: 0,
            [r.EPIC]: 0,
            [r.LEGENDARY]: 0,
        },
    },
} as const;
export type Manufacturer = (typeof manufacturers)[keyof typeof manufacturers];