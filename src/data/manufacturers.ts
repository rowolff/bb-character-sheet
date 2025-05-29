export const manufacturers = {
    SKULLDUGGER: 'Skulldugger',
    FERIORE: 'Feriore',
    DAHLIA: 'Dahlia',
    BLACKPOWDER: 'Black Powder',
    ALAS: 'Alas!',
    MALEFACTOR: 'Malefactor',
    STOKER: 'Stoker',
    HYPERIUS: 'Hyperius',
    TORGUE: 'Torgue',
    CHOICE: 'Choice',
} as const;
export type Manufacturer = (typeof manufacturers)[keyof typeof manufacturers];