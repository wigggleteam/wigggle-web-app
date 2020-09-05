import _ from 'lodash';

export const HEALTH = 'health';
export const TRAVEL = 'travelAdventure';
export const EXPLORE = 'exploreActivities';
export const ENTERTAINMENT = 'entertainment';
export const EDUCATION = 'education';
export const OOTB = 'ootb';

export const FOOD = 'food';
export const PERSONALITY = 'personality';
export const PHYSICAL = 'physical';
export const MENTAL = 'mental';

export const categoriesMappings = {
  [HEALTH] : {
    label: 'Health & Wellness',
    subCategories: {
      [FOOD] : {
        label: 'Food'
      },
      [PERSONALITY] : {
        label: 'Personality Building'
      },
      [PHYSICAL] : {
        label: 'Physical Wellness'
      },
      [MENTAL] : {
        label: 'Mental Health'
      }
    }
  },
  [TRAVEL]: {
    label: 'Travel & Adventure',
  },
  [EXPLORE]: {
    label: 'Explore & Activities',
  },
  [ENTERTAINMENT]: {
    label: 'Entertainment & Buzz',
  },
  [EDUCATION]: {
    label: 'Education & Learning',
  },
  [OOTB]: {
    label: 'Out of the Box',
  },
}

export const categories = _.values(categoriesMappings);