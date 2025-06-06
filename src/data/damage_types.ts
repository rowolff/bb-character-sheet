export const damageTypes = {
    KINETIC: 'Kinetic',
    EXPLOSIVE: 'Explosive',
    INCENDIARY: 'Incendiary',
    CORROSIVE: 'Corrosive',
    SHOCK: 'Shock',
    RADIATION: 'Radiation', 
    CRYO: 'Cryo',
} as const;
export type DamageType = (typeof damageTypes)[keyof typeof damageTypes];