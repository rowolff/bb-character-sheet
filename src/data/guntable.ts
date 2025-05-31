import { manufacturers as m } from './manufacturers';
import { rarities } from './rarities';

export interface GunStatsConfig {
    LOW?: { name?: string, Hits: number, Crits: number };
    MEDIUM?: { name?: string, Hits: number, Crits: number };
    HIGH?: { name?: string, Hits: number, Crits: number };
    Damage?: string;
}

export class GunStats {
    public LOW: { name?: string, Hits: number, Crits: number };
    public MEDIUM: { name?: string, Hits: number, Crits: number };
    public HIGH: { name?: string, Hits: number, Crits: number };
    public Damage: string;

    constructor(config: GunStatsConfig = {}) {
        this.LOW = {
            name: '2-7',
            Hits: config.LOW?.Hits ?? 0,
            Crits: config.LOW?.Crits ?? 0,
            ...(config.LOW?.name ? { name: config.LOW.name } : {})
        };
        this.MEDIUM = {
            name: '8-15',
            Hits: config.MEDIUM?.Hits ?? 0,
            Crits: config.MEDIUM?.Crits ?? 0,
            ...(config.MEDIUM?.name ? { name: config.MEDIUM.name } : {})
        };
        this.HIGH = {
            name: '16+',
            Hits: config.HIGH?.Hits ?? 0,
            Crits: config.HIGH?.Crits ?? 0,
            ...(config.HIGH?.name ? { name: config.HIGH.name } : {})
        };
        this.Damage = config.Damage || '0';
    }
}

// Define the structure for level ranges in gun types
interface LevelRange {
    range: readonly [number, number];
    stats: GunStats;
}

/**
 * Get gun stats for a specific gun type and character level
 * @param gunTypeKey The key of the gun type (from gt object keys)
 * @param level The character level (1-30)
 * @returns The GunStats for that level range along with any Range and Bonus properties
 */
export function getGunStatsByLevel(gunTypeKey: keyof typeof gt, level: number): { stats: GunStats, range?: string, bonus?: string } | undefined {
    const gunTypeObj = gt[gunTypeKey];

    // Check if gun type has byLevel data
    if (!('byLevel' in gunTypeObj)) {
        return undefined;
    }

    // Find the level range that includes the specified level
    const levelData = gunTypeObj.byLevel.find(
        (levelRange: LevelRange) => level >= levelRange.range[0] && level <= levelRange.range[1]
    );

    if (!levelData) {
        return undefined;
    }

    // Return stats along with range and bonus if they exist
    return {
        stats: levelData.stats,
        range: 'Range' in gunTypeObj ? gunTypeObj.Range : undefined,
        bonus: 'Bonus' in gunTypeObj ? gunTypeObj.Bonus : undefined
    };
}

export const gt = {
    PISTOL: {
        name: 'Pistol', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 3, Crits: 0 }, Damage: '2d4' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 3, Crits: 1 }, Damage: '1d6' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d6' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '2d8' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '2d8' })
            }],
        Range: '5'
    },
    SMG: {
        name: 'Submachine Gun', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 0 }, HIGH: { Hits: 5, Crits: 0 }, Damage: '1d4' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 4, Crits: 0 }, HIGH: { Hits: 5, Crits: 1 }, Damage: '2d4' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 1 }, HIGH: { Hits: 5, Crits: 1 }, Damage: '1d6' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 4, Crits: 1 }, Damage: '2d6' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 2 }, MEDIUM: { Hits: 3, Crits: 2 }, HIGH: { Hits: 5, Crits: 2 }, Damage: '1d10' })
            }],
        Range: '5'
    },
    SHOTGUN: {
        name: 'Shotgun', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d8' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d8' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d8' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d10' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d12' })
            }],
        Range: '4',
        Bonus: 'If Range 2 or Less: +2 Damage'
    },
    COMBAT_RIFLE: {
        name: 'Combat Rifle', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 0 }, HIGH: { Hits: 3, Crits: 1 }, Damage: '1d6' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 2, Crits: 0 }, MEDIUM: { Hits: 3, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '1d8' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d8' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 3, Crits: 1 }, Damage: '2d6' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 2, Crits: 1 }, HIGH: { Hits: 2, Crits: 3 }, Damage: '1d10' })
            }],
        Range: '6'
    },
    SNIPER_RIFLE: {
        name: 'Sniper Rifle', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 0, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d10' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 0, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d12' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '1d10' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '2d10' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 2, Crits: 2 }, Damage: '1d12' })
            }],
        Range: '8',
        Bonus: 'If Range 3+: +3 Accuracy'
    },
    RPG: {
        name: 'Rocket Launcher', byLevel: [
            {
                range: [1, 6],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '1d12' })
            },
            {
                range: [7, 12],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 1 }, Damage: '2d10' })
            },
            {
                range: [13, 18],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 1, Crits: 2 }, Damage: '1d12' })
            },
            {
                range: [19, 24],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 0 }, MEDIUM: { Hits: 1, Crits: 0 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '2d12' })
            },
            {
                range: [25, 30],
                stats: new GunStats({ LOW: { Hits: 1, Crits: 1 }, MEDIUM: { Hits: 1, Crits: 1 }, HIGH: { Hits: 2, Crits: 1 }, Damage: '1d20' })
            }],
        Range: '4',
        Bonus: 'Splash'
    },
    CHOICE: { name: 'Weapon of your choosing' },
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

export const prefixes = [
    { name: 'One', effect: 'Can only be fired once per day. Deals 10x Damage.' },
    { name: 'Normal', effect: 'Appearance of a Common gun.' },
    { name: 'Adorable', effect: '25% chance to distract Enemies with baby animal hallucinations.' },
    { name: 'Gaudy', effect: 'Highly reflective, which can be used to temporarily blind Enemies, giving them -3 on Attack Rolls' },
    { name: 'Cheerful', effect: 'Grants +1 to all Talk Checks while equipped.' },
    { name: 'Jumbled', effect: 'Has the Accuracy and Damage of one gun type, but the Range and bonuses of another.' },
    { name: 'Classy', effect: 'Gun will only fire if the wielder has the pinky of their shooting hand out.' },
    { name: 'Economic', effect: 'Enemies drop 2 gold per Hit and 5 gold per Crit.' },
    { name: 'Certain', effect: 'Grants a +2 bonus during Badass attempts.' },
    { name: 'Humdrum', effect: 'Enemies Hit experience ennui.' },
    { name: 'Lively', effect: 'This gun has an AI that thinks it\'s alive. It can open any door once per day.' },
    { name: 'Bitter', effect: 'Enemies get -1 to their Attack Rolls for each Enemy killed by this gun in this encounter.' },
    { name: 'Sleepy', effect: 'Enemies Hit are Slowed.' },
    { name: 'Deafening', effect: 'Screams when fired, dealing 1 Damage to all adjacent targets.' },
    { name: 'Selfish', effect: 'Deals 1d6 Damage to wielder when changing to another equipped gun.' },
    { name: 'Obtainable', effect: 'Must be picked up using an Interact (17+) Check. Deals 2x Damage.' },
    { name: 'Abrasive', effect: 'Adds +1 Crit to Melee Attacks.' },
    { name: 'Smelly', effect: 'Enemies Hit take 1d6 Radiation Damage.' },
    { name: 'Tart', effect: 'Enemies react as if they have eaten something tart, getting -1 to their next Attack Roll.' },
    { name: 'Worried', effect: 'Crits have a 50% chance to make BR 8 or less Enemies flee.' },
    { name: 'Swift', effect: 'Grants a free Melee Attack each turn.' },
    { name: 'Two', effect: 'Creates a duplicate gun. Must be fired at the same time. 3x Damage.' },
    { name: 'Toothsome', effect: 'Gets a Bite Attack each turn for 1d6 Damage to an adjacent target.' },
    { name: 'Light', effect: 'Fires rays of light that deal +1d6 Incendiary Damage.' },
    { name: 'Boundless', effect: 'Generates a Loot Pile when it Hits an Enemy.' },
    { name: 'Incandescent', effect: 'Shines brighter when being fired.' },
    { name: 'Elfin', effect: 'Increases Movement by 1 square while firing.' },
    { name: 'Splendid', effect: 'Deals 2x Damage to Badass-type Enemies.' },
    { name: 'Small', effect: 'Can have a 4th gun equipped as long as this gun is equipped.' },
    { name: 'Pumped', effect: 'Lifts Enemies Hit a foot off of the ground.' },
    { name: 'Horrible', effect: 'Enemies killed by this gun explode.' },
    { name: 'Fresh', effect: 'First Attack of an encounter deals 2x Damage.' },
    { name: 'Zesty', effect: 'Enemies killed by this gun grant the wielder 1 Badass Token.' },
    { name: 'Utter', effect: 'There is a secret password that activates 3x Damage for the next 2 turns. Wielder can guess once per encounter.' },
    { name: 'Far-Flung', effect: 'Double the Range of any Thrown item while this gun is equipped.' },
    { name: 'Superb', effect: 'Grants +1 to Mods on the gun.' },
    { name: 'Knotty', effect: 'Ties an Enemy\'s shoes together, reducing their Movement by 1.' },
    { name: 'Wrathful', effect: 'Deals 2x Damage to Enemies that have Damaged the wielder.' },
    { name: 'Panoramic', effect: 'Fires in a 180 degree arc. Hits/Crits can each be applied to a different Enemy in Range.' },
    { name: 'Critical', effect: 'Rolled Hits become Crits. Rolled Crits become misses.' },
    { name: 'Practical', effect: 'Swapping to a different gun grants the wielder a Badass Token.' },
    { name: 'Strong', effect: 'Grants +1 to all Interact Checks while equipped.' },
    { name: 'Relevant', effect: 'Will deliver cryptic information on a topic up to 3x a day.' },
    { name: 'Tense', effect: '30% chance to taze the Enemy, dealing 1d6 Shock Damage.' },
    { name: 'Stupendous', effect: 'Double the Hits of this gun. Attacks deal 2d4 Damage to the wielder.' },
    { name: 'Suitable', effect: 'Can disguise the wielder in a suit of any kind once per day.' },
    { name: 'Unwieldy', effect: 'Twice the size of a normal gun. 2x Damage. Reloading takes 2 turns.' },
    { name: 'Woozy', effect: 'Each time an Enemy is Hit by this gun, 10% chance they pass out.' },
    { name: 'Grotesque', effect: 'Gun looks horrific, possibly cursed. A counter increases every time it kills an Enemy.' },
    { name: 'Puny', effect: 'Appearance of a miniature gun.' },
    { name: 'Tawdry', effect: 'When Reloaded, becomes a grenade that deals 3d8 Damage.' },
    { name: 'Nutty', effect: 'Instantly kills any Enemy with a nut allergy.' },
    { name: 'Adhesive', effect: 'Enemies Hit begin to stick to anything they come into contact with.' },
    { name: 'Exciting', effect: '50% chance for Explosive rounds.' },
    { name: 'Mixed', effect: 'For each Hit/Crit, gather the next die for Damage. d6, d8, d10, d12, d20.' },
    { name: 'Aback', effect: 'Enemies Hit in the front are spun backwards.' },
    { name: 'Labored', effect: 'Adds +3 DMG Mod if standing still.' },
    { name: 'Questionable', effect: 'Deals 2x Damage to Enemies that can question their existence.' },
    { name: 'Aberrant', effect: 'Gains the stats of a random gun type.' },
    { name: 'Resolute', effect: 'Cannot be fired on the first turn of an encounter. Deals 2x Damage.' },
    { name: 'Far', effect: 'Double the Range of this gun.' },
    { name: 'Mad', effect: 'Enemies Hit have a 50% chance of being Taunted.' },
    { name: 'Grey', effect: 'Deals 2x Damage. Enemies Hit drop 1 less Loot Pile and only drop Common items.' },
    { name: 'Damp', effect: 'Creates puddles of water under Enemies Hit.' },
    { name: 'Actually', effect: 'Can reroll Accuracy once per turn when firing this gun.' },
    { name: 'Jazzy', effect: '10% chance the non-Boss Enemy lets go of any weapons and starts doing \'jazz hands.\'' },
    { name: 'Frightening', effect: 'Enemies within 2 squares are compelled to take Cover.' },
    { name: 'Shaky', effect: 'Gun shakes uncontrollably; Enemies Hit also shake uncontrollably.' },
    { name: 'Scintillating', effect: '50% chance to Hit the chest or groin of Enemy.' },
    { name: 'Handsomely', effect: 'Add Damage equal to your Talk modifier.' },
    { name: 'Hysterical', effect: 'Enemies Hit burst out laughing, causing -1 to Attack Rolls.' },
    { name: 'Impolite', effect: 'Randomly burps out a Loot Pile when fired.' },
    { name: 'Unable', effect: 'Enemies Hit cannot take Mayhem Actions.' },
    { name: 'Towering', effect: 'Wielder appears twice their size while gun is equipped.' },
    { name: 'Parallel', effect: 'Rounds split into 2 parallel lines that can Hit Enemies in 2 adjacent squares.' },
    { name: 'Mundane', effect: 'Grants +1 to all Sneak Checks while equipped.' },
    { name: 'Breezy', effect: 'Enemies targeted are struck by a gust of wind that pushes them 1 square backwards.' },
    { name: 'Disgusted', effect: 'Deals +1d6 Corrosive Damage. Enemies killed die badly.' },
    { name: 'Imaginary', effect: 'Appears as if you are not holding any gun. Makes fake firing noises when fired.' },
    { name: 'Knowing', effect: 'Knows all. Can ask the gun a question once per day.' },
    { name: 'Joyous', effect: 'Plays upbeat music when being fired.' },
    { name: 'Clever', effect: 'Grants +1 to all Insight Checks while equipped.' },
    { name: 'Abhorrent', effect: 'Enemies cannot stay within 1 square while this gunis equipped.' },
    { name: 'Open', effect: 'Once per turn, you may Reload this gun as a free Action without generating Mayhem.' },
    { name: 'Several', effect: 'Splits into 2 guns that are dual wielded.' },
    { name: 'Honorable', effect: 'All rounds Hit Enemies in the front.' },
    { name: 'Synonymous', effect: 'Grants Guild bonuses twice.' },
    { name: 'Madly', effect: 'Enemies Hit have 50% chance of becoming Confused.' },
    { name: 'Obnoxious', effect: 'Guaranteed Insight Check once per day at the cost of having to listen to the gun drone on and on and on.' },
    { name: 'Holistic', effect: 'Damage is dealt to Shield, Armor, and Health.' },
    { name: 'Few', effect: 'Max 1 Hit. Deal an additional 3 Damage for each unused Hit.' },
    { name: 'Legal', effect: 'Enemies Hit are considered to be under a legally binding contract to drop 1 extra Loot Pile when they die.' },
    { name: 'Abiding', effect: 'Grants +1 to all Search Checks while equipped.' },
    { name: 'Unfair', effect: 'An Extra Attack with this gun does not generate Mayhem.' },
    { name: 'Tender', effect: 'Converts 10% of Damage dealt into Health for an adjacent ally.' },
    { name: 'Same', effect: 'Enemies Hit will take an equal amount of Damage from the gun for each Attack.' },
    { name: 'Overconfident', effect: 'If Accuracy Roll is 10 or less, all Hits are Crits.' },
    { name: 'Eatable', effect: 'Can consume the gun when Reloading to gain 2d4 Health.' },
    { name: 'Thirsty', effect: 'Converts 10% of Damage dealt into Health.' },
    { name: 'Imminent', effect: 'Enemies Hit take increasing Damage each turn. Damage starts at 1 and increases by 1 with each Hit/turn.' }

]

export const redText = [
    { name: 'POP POP!', effect: 'Deals Crit Damage twice.' },
    { name: 'I never freeze', effect: 'Adds Cryo Element type.' },
    { name: 'Toasty!', effect: 'Adds Incendiary Element type.' },
    { name: 'Was he slow?', effect: 'Fires backwards.' },
    { name: 'We Hate You, Please Die.', effect: 'Taunts the farthest Enemy each turn.' },
    { name: 'Tell them they\'re next', effect: 'Won\'t deal Damage to the final Enemy in an encounter.' },
    { name: 'PAN SHOT!', effect: 'Always Hits the closest Enemy.' },
    { name: 'Envision Wyverns', effect: 'Adds Radiation Element type.' },
    { name: 'I\'m melting!', effect: 'Adds Corrosive Element type.' },
    { name: 'The same thing that happens to everything else.', effect: 'Adds Shock Element type.' },
    { name: '360 quickscope', effect: 'Adds a Crit to each Ranged Attack.' },
    { name: 'Any Questions?', effect: 'Shoots pumpkin bombs that deal an extra 3d6 Explosive Damage.' },
    { name: 'Blood and Thunder', effect: 'Take 1d6 Health Damage to deal +3d6 Shock Damage.' },
    { name: 'SI VIS PACEM, PARA BELLUM', effect: 'Gain Extra Attack if Acting Before Enemies.' },
    { name: 'You\'re breathtaking!', effect: 'Wielder cannot be targeted on the first turn of an encounter.' },
    { name: 'Pass turn.', effect: 'Wielder may Throw a grenade during the End of Turn step.' },
    { name: 'I am Vengeance!', effect: 'Deals 2x Damage to Enemies adjacent to allies.' },
    { name: 'Roll the dice', effect: 'If Accuracy Roll is even, 2x Damage. If Accuracy Roll is odd, half Damage.' },
    { name: 'One among the fence', effect: 'Add 21 Damage if you roll 13+ on your Accuracy Roll. (1/day)' },
    { name: 'Don\'t be sorry. Be better.', effect: 'Reroll the Badass Die once per day.' },
    { name: 'THE PICKLES!', effect: 'Shoots flaming cheeseburgers that deal an extra 2d6 Incendiary Damage.' },
    { name: 'Do a kickflip!', effect: '+4 on Traverse Checks while equipped.' },
    { name: 'Extinction is the Rule', effect: 'Teleport to any square up to 4 away when you kill an Enemy.' },
    { name: 'Never Fight a Knight with a Perm', effect: 'DMG Mod +6 against non-human Enemies.' },
    { name: 'Bye bye, little Butt Stallion!', effect: 'Shots explode into rainbows that deal an extra 1d8 Damage.' },
    { name: 'Time 2 Hack', effect: '+4 on Interact Checks and Melee Damage while equipped.' },
    { name: 'I HATE Magic... so much', effect: '+3 DMG Mod. Take 2d6 Vomit Damage if Reloaded.' },
    { name: 'OFF WITH THEIR HEADS!', effect: 'Roll %s. 95%+: the Enemy\'s head falls off.' },
    { name: 'This is my BOOMSTICK!', effect: 'Deals 3x Damage to skeletons.' },
    { name: 'Super easy, barely an inconvenience', effect: 'Automatically pass the first Check each day.' },
    { name: 'Hold onto your butts.', effect: 'When fired, the wielder and targets Hit are Knocked Back 2 squares.' },
    { name: 'The Wise Man\'s Fear', effect: 'Deals 3x Damage to all wizards.' },
    { name: 'I don\'t want this isolation.', effect: 'Won\'t fire unless adjacent to an ally or target.' },
    { name: 'TUFF with two Fs', effect: 'Prevents the first 5 Health Damage each turn.' },
    { name: 'Unlikely Maths', effect: 'Roll an extra die of each type rolled during an Attack and take the highest result(s).' },
    { name: 'Gravity\'s Rainbow', effect: 'First Attack against a Badass target always deals max Damage.' },
    { name: 'Let\'s do this one last time...', effect: 'Shoots webs that reduce target\'s Movement to 0 for 1 turn.' },
    { name: 'BIP!', effect: 'Once per encounter, the wielder can run into squares with an Enemy, Knocking them Back 1 square.' },
    { name: 'The Heaviest Matter of the Universe', effect: 'The wielder and targets Hit cannot take Movement Actions while equipped.' },
    { name: 'GREEN FLAME', effect: 'Shoots burst of green flames while firing, dealing 2d6 Incendiary Damage to adjacent targets.' },
    { name: 'More like Bore Ragnarok!', effect: 'Gain 1 Badass Token after a successful Talk Check while equipped.' },
    { name: 'That\'s levitation, Holmes!', effect: 'Ignore difficult terrain while equipped.' },
    { name: 'Let\'s boo-boo.', effect: 'Gain Extra Movement after drinking a potion while equipped.' },
    { name: 'Mmm Whatcha Say...', effect: 'Gain a Ranged Attack if an Enemy is talking before an encounter.' },
    { name: 'Here Comes the FunCooker', effect: 'When this gun scores a Crit, the Enemy suffers a miniature combustion, dealing 1d12 Explosive Damage to itself and all adjacent squares.' },
    { name: 'Overwhelming strength is boring.', effect: '-6 Initiative. The first non-Badass, non-boss Enemy that is Melee Attacked dies instantly (1/day).' },
    { name: 'Stop talking, I will win. It\'s what heroes do.', effect: 'Gun fires explosives that deal +3d6 Damage to all adjacent squares.' },
    { name: 'Richer and cleverer than everyone else!', effect: 'Add 10 gold per Loot Pile when rolling for Enemy Drops.' },
    { name: 'METAL WILL DESTROY ALL EVIL!', effect: ' Allies get +2 ACC Mod each turn you perform a Melee Attack.' },
    { name: 'Life is a conundrum of esoterica.', effect: 'Gain 2 Badass Tokens the first time you roll for a Trauma each day.' }
]