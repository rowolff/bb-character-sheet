export type AttributeLabel = {
  id: keyof AttributeValues
  name: string
  shortHand: string
  position: number
}

export type AttributeValues = {
  accuracy: number
  damage: number
  speed: number
  mastery: number
}
