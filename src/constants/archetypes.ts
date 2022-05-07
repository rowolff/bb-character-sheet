import { AttributeValues } from '../types/Attributes'

interface ArchetypeValues extends AttributeValues {
  name: string
}

type Archetype = {
  [key: string]: ArchetypeValues
}

export const archetypes: Archetype = {
  enforcer: {
    name: 'Enforcer',
    accuracy: 1,
    damage: 4,
    speed: 2,
    mastery: 0,
  },
  elementalist: {
    name: 'Elementalist',
    accuracy: 0,
    damage: 2,
    speed: 1,
    mastery: 4,
  },
  deadeye: {
    name: 'Deadeye',
    accuracy: 4,
    damage: 1,
    speed: 0,
    mastery: 2,
  },
  guardian: {
    name: 'Guardian',
    accuracy: 2,
    damage: 0,
    speed: 4,
    mastery: 1,
  },
}
