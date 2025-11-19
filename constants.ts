import { House } from './types';

export const HOUSE_THEMES = {
  [House.GRYFFINDOR]: {
    primary: 'bg-red-900',
    secondary: 'bg-yellow-600',
    accent: 'text-yellow-500',
    border: 'border-red-800',
    shadow: 'shadow-red-900/50',
    crest: '🦁',
    gradient: 'from-red-900 to-yellow-700'
  },
  [House.SLYTHERIN]: {
    primary: 'bg-green-900',
    secondary: 'bg-gray-400', // Silver
    accent: 'text-green-400',
    border: 'border-green-800',
    shadow: 'shadow-green-900/50',
    crest: '🐍',
    gradient: 'from-green-900 to-gray-700'
  },
  [House.RAVENCLAW]: {
    primary: 'bg-blue-900',
    secondary: 'bg-yellow-600', // Bronze/Gold approximation
    accent: 'text-blue-300',
    border: 'border-blue-800',
    shadow: 'shadow-blue-900/50',
    crest: '🦅',
    gradient: 'from-blue-900 to-blue-600'
  },
  [House.HUFFLEPUFF]: {
    primary: 'bg-yellow-700',
    secondary: 'bg-gray-900', // Black
    accent: 'text-yellow-300',
    border: 'border-yellow-800',
    shadow: 'shadow-yellow-600/50',
    crest: '🦡',
    gradient: 'from-yellow-700 to-yellow-500'
  }
};

export const INITIAL_DIARY_MESSAGE = "My name is Tom Riddle. How did you come by my diary?";
