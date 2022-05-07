import { AttributeValues } from '../types/Attributes'

interface ClassValues extends AttributeValues {
  name: string
}

type CharacterClass = {
  [key: string]: ClassValues
}

export const classes: CharacterClass = {
  none: {
    name: '--none--',
    accuracy: 0,
    damage: 0,
    speed: 0,
    mastery: 0,
  },
  assassin: {
    name: 'Assassin',
    accuracy: 2,
    damage: 0,
    speed: 1,
    mastery: 1,
  },
  berserker: {
    name: 'Berserker',
    accuracy: 0,
    damage: 2,
    speed: 1,
    mastery: 1,
  },
  commando: {
    name: 'Commando',
    accuracy: 1,
    damage: 1,
    speed: 0,
    mastery: 2,
  },
  gunzerker: {
    name: 'Gunzerker',
    accuracy: 1,
    damage: 2,
    speed: 0,
    mastery: 1,
  },
  hunter: {
    name: 'Hunter',
    accuracy: 2,
    damage: 1,
    speed: 0,
    mastery: 1,
  },
  mechromancer: {
    name: 'Mechromancer',
    accuracy: 0,
    damage: 1,
    speed: 1,
    mastery: 2,
  },
  psycho: {
    name: 'Psycho',
    accuracy: 1,
    damage: 2,
    speed: 1,
    mastery: 2,
  },
  lightwalkSiren: {
    name: 'Siren (Lightwalk)',
    accuracy: 1,
    damage: 1,
    speed: 2,
    mastery: 0,
  },
  phaselockSiren: {
    name: 'Siren (Phaselock)',
    accuracy: 0,
    damage: 1,
    speed: 1,
    mastery: 2,
  },
  soldier: {
    name: 'Soldier',
    accuracy: 1,
    damage: 0,
    speed: 1,
    mastery: 2,
  },
}
