const entities: string[] = [
    'Milky Way',
    'Moon',
    'Stars',
    'Sun',
    'World'
];

export const randomEntity = (): string => entities[Math.floor(Math.random() * entities.length)];
