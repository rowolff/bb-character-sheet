import { manufacturers as m } from './manufacturers';
import { rarities } from './rarities';

export interface GunStatsConfig {
    LOW?: { name?: string, Hits: number, Crits: number };
    MEDIUM?: { name?: string, Hits: number, Crits: number };
    HIGH?: { name?: string, Hits: number, Crits: number };
    Damage?: string;
    Range?: string;
    Bonus?: string;
}

export class GunStats {
    public LOW: { name?: string, Hits: number, Crits: number };
    public MEDIUM: { name?: string, Hits: number, Crits: number };
    public HIGH: { name?: string, Hits: number, Crits: number };
    public Damage: string;
    public Range: string;
    public Bonus: string;

    constructor(config: GunStatsConfig = {}) {
        this.LOW = config.LOW || { name: '2-7', Hits: 0, Crits: 0 };
        this.MEDIUM = config.MEDIUM || { name: '8-15', Hits: 0, Crits: 0 };
        this.HIGH = config.HIGH || { name: '16+', Hits: 0, Crits: 0 };
        this.Damage = config.Damage || '0';
        this.Range = config.Range || '0';
        this.Bonus = config.Bonus || '0';
    }
}

export const gt = {
    PISTOL: {
        name: 'Pistol', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 3, Crits: 0 }, Damage: '2d4', Range: '5' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 3, Crits: 1 }, Damage: '1d6', Range: '5' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d6', Range: '5' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '2d8', Range: '5' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '2d8', Range: '5' })
            }]
    },
    SMG: {
        name: 'Submachine Gun', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 0 }, HIGH: { Hits: 5, Crits: 0 }, Damage: '1d4', Range: '5' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 4, Crits: 0 }, HIGH: { Hits: 5, Crits: 1 }, Damage: '2d4', Range: '5' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 1 }, HIGH: { Hits: 5, Crits: 1 }, Damage: '1d6', Range: '5' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 4, Crits: 1 }, Damage: '2d6', Range: '5' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 2 }, MEDIUM: { Hits: 3, Crits: 2 }, HIGH: { Hits: 5, Crits: 2 }, Damage: '1d10', Range: '5' })
            }]
    },
    SHOTGUN: {
        name: 'Shotgun', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d8', Range: '4', Bonus: 'If Range 2 or Less: +2 Damage' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d8', Range: '4', Bonus: 'If Range 2 or Less: +2 Damage' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d8', Range: '4', Bonus: 'If Range 2 or Less: +2 Damage' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d10', Range: '4', Bonus: 'If Range 2 or Less: +2 Damage' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d12', Range: '4', Bonus: 'If Range 2 or Less: +2 Damage' })
            }]
    },
    COMBAT_RIFLE: {
        name: 'Combat Rifle', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 0 }, HIGH: { Hits: 3, Crits: 1 }, Damage: '1d6', Range: '6' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '1d8', Range: '6' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d8', Range: '6' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 3, Crits: 1 }, Damage: '2d6', Range: '6' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 3 }, Damage: '1d10', Range: '6' })
            }]
    },
    SNIPER_RIFLE: {
        name: 'Sniper Rifle', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 0, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d10', Range: '8', Bonus: 'If Range 3+: +3 Accuracy' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 0, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d12', Range: '8', Bonus: 'If Range 3+: +3 Accuracy' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '1d10', Range: '8', Bonus: 'If Range 3+: +3 Accuracy' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '2d10', Range: '8', Bonus: 'If Range 3+: +3 Accuracy' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d12', Range: '8', Bonus: 'If Range 3+: +3 Accuracy' })
            }]
    },
    RPG: {
        name: 'Rocket Launcher', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d12', Range: '4', Bonus: 'Splash' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '2d10', Range: '4', Bonus: 'Splash' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '1d12', Range: '4', Bonus: 'Splash' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d12', Range: '4', Bonus: 'Splash' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '1d20', Range: '4', Bonus: 'Splash' })
            }]
    },
    CHOICE: { name: 'Choice' },
} as const;
export type GunType = (typeof gt)[keyof typeof gt];

export const gunTable = [
    [{ type: gt.PISTOL, manufacturer: m.SKULLDUGGER },
    { type: gt.PISTOL, manufacturer: m.FERIORE },
    { type: gt.PISTOL, manufacturer: m.DAHLIA },
    { type: gt.PISTOL, manufacturer: m.BLACKPOWDER },
    { type: gt.PISTOL, manufacturer: m.ALAS },
    { type: gt.PISTOL, manufacturer: m.MALEFACTOR },
    { type: gt.PISTOL, manufacturer: m.STOKER },
    { type: gt.PISTOL, manufacturer: m.HYPERIUS },
    ],
    [{ type: gt.SMG, manufacturer: m.MALEFACTOR },
    { type: gt.SMG, manufacturer: m.SKULLDUGGER },
    { type: gt.SMG, manufacturer: m.HYPERIUS },
    { type: gt.SMG, manufacturer: m.FERIORE },
    { type: gt.SMG, manufacturer: m.TORGUE },
    { type: gt.SMG, manufacturer: m.DAHLIA },
    { type: gt.SMG, manufacturer: m.SKULLDUGGER },
    { type: gt.SMG, manufacturer: m.FERIORE },
    ],
    [{ type: gt.SHOTGUN, manufacturer: m.HYPERIUS },
    { type: gt.SHOTGUN, manufacturer: m.BLACKPOWDER },
    { type: gt.SHOTGUN, manufacturer: m.SKULLDUGGER },
    { type: gt.SHOTGUN, manufacturer: m.FERIORE },
    { type: gt.SHOTGUN, manufacturer: m.TORGUE },
    { type: gt.SHOTGUN, manufacturer: m.STOKER },
    { type: gt.SHOTGUN, manufacturer: m.ALAS },
    { type: gt.SHOTGUN, manufacturer: m.MALEFACTOR },
    ],
    [{ type: gt.COMBAT_RIFLE, manufacturer: m.FERIORE },
    { type: gt.COMBAT_RIFLE, manufacturer: m.DAHLIA },
    { type: gt.COMBAT_RIFLE, manufacturer: m.TORGUE },
    { type: gt.COMBAT_RIFLE, manufacturer: m.STOKER },
    { type: gt.COMBAT_RIFLE, manufacturer: m.HYPERIUS },
    { type: gt.COMBAT_RIFLE, manufacturer: m.ALAS },
    { type: gt.COMBAT_RIFLE, manufacturer: m.DAHLIA },
    { type: gt.COMBAT_RIFLE, manufacturer: m.ALAS },
    ],
    [{ type: gt.SNIPER_RIFLE, manufacturer: m.SKULLDUGGER },
    { type: gt.SNIPER_RIFLE, manufacturer: m.ALAS },
    { type: gt.SNIPER_RIFLE, manufacturer: m.BLACKPOWDER },
    { type: gt.SNIPER_RIFLE, manufacturer: m.MALEFACTOR },
    { type: gt.SNIPER_RIFLE, manufacturer: m.DAHLIA },
    { type: gt.SNIPER_RIFLE, manufacturer: m.HYPERIUS },
    { type: gt.SNIPER_RIFLE, manufacturer: m.STOKER },
    { type: gt.SNIPER_RIFLE, manufacturer: m.TORGUE },
    ],
    [{ type: gt.RPG, manufacturer: m.STOKER },
    { type: gt.RPG, manufacturer: m.TORGUE },
    { type: gt.RPG, manufacturer: m.MALEFACTOR },
    { type: gt.RPG, manufacturer: m.HYPERIUS },
    { type: gt.RPG, manufacturer: m.STOKER },
    { type: gt.RPG, manufacturer: m.TORGUE },
    { type: gt.RPG, manufacturer: m.MALEFACTOR },
    { type: gt.RPG, manufacturer: m.HYPERIUS },
    ],
    [{ type: gt.PISTOL, manufacturer: m.TORGUE },
    { type: gt.SHOTGUN, manufacturer: m.DAHLIA },
    { type: gt.PISTOL, manufacturer: m.BLACKPOWDER },
    { type: gt.SMG, manufacturer: m.SKULLDUGGER },
    { type: gt.SHOTGUN, manufacturer: m.BLACKPOWDER },
    { type: gt.COMBAT_RIFLE, manufacturer: m.FERIORE },
    { type: gt.SNIPER_RIFLE, manufacturer: m.BLACKPOWDER },
    { type: gt.RPG, manufacturer: m.CHOICE },
    ], [
        { type: gt.CHOICE, manufacturer: m.CHOICE },
    ]
] as const;

export const gunRarities = [
    [{ rarity: rarities.COMMON, elemental: false },
    { rarity: rarities.COMMON, elemental: true },
    { rarity: rarities.COMMON, elemental: true },
    { rarity: rarities.UNCOMMON, elemental: false },
    { rarity: rarities.UNCOMMON, elemental: true },
    { rarity: rarities.RARE, elemental: false },
    ],
    [{ rarity: rarities.COMMON, elemental: false },
    { rarity: rarities.COMMON, elemental: true },
    { rarity: rarities.UNCOMMON, elemental: false },
    { rarity: rarities.UNCOMMON, elemental: true },
    { rarity: rarities.RARE, elemental: true },
    { rarity: rarities.EPIC, elemental: false },
    ],
    [{ rarity: rarities.UNCOMMON, elemental: true },
    { rarity: rarities.RARE, elemental: false },
    { rarity: rarities.RARE, elemental: true },
    { rarity: rarities.EPIC, elemental: false },
    { rarity: rarities.EPIC, elemental: true },
    { rarity: rarities.LEGENDARY, elemental: true },
    ],
    [{ rarity: rarities.RARE, elemental: true },
    { rarity: rarities.RARE, elemental: true },
    { rarity: rarities.EPIC, elemental: true },
    { rarity: rarities.EPIC, elemental: true },
    { rarity: rarities.LEGENDARY, elemental: true },
    { rarity: rarities.LEGENDARY, elemental: true },
    ],
]