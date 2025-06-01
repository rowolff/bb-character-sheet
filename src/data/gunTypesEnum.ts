// Define gun type names as constants to avoid circular dependencies
export const GUN_TYPES = {
    PISTOL: 'Pistol',
    SMG: 'Submachine Gun',
    SHOTGUN: 'Shotgun',
    COMBAT_RIFLE: 'Combat Rifle',
    SNIPER_RIFLE: 'Sniper Rifle',
    RPG: 'Rocket Launcher',
    CHOICE: 'Weapon of your choosing'
} as const;
