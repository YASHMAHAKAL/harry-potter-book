export enum House {
  GRYFFINDOR = 'Gryffindor',
  SLYTHERIN = 'Slytherin',
  RAVENCLAW = 'Ravenclaw',
  HUFFLEPUFF = 'Hufflepuff'
}

export type AppMode = 'notepad' | 'diary' | 'storybook';

export interface CharacterState {
  name: string;
  house: House;
  wandMovement: 'idle' | 'swish' | 'flick' | 'twirl';
  expression: 'neutral' | 'smile' | 'surprised';
}

export interface DiaryEntry {
  id: string;
  sender: 'user' | 'riddle';
  text: string;
  timestamp: number;
}

export interface StoryOptions {
  genre: string;
  protagonist: string;
  setting: string;
}
