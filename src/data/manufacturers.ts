export const manufacturers = {
    SKULLDUGGER: { name: 'Skulldugger' },
    FERIORE: { name: 'Feriore' },
    DAHLIA: { name: 'Dahlia' },
    BLACKPOWDER: { name: 'Black Powder' },
    ALAS: { name: 'Alas!' },
    MALEFACTOR: { name: 'Malefactor' },
    STOKER: { name: 'Stoker' },
    HYPERIUS: { name: 'Hyperius' },
    TORGUE: { name: 'Torgue' },
    CHOICE: { name: 'Choice' },
} as const;
export type Manufacturer = (typeof manufacturers)[keyof typeof manufacturers];