import _ from 'lodash';

export const HEALTH = 'Health';
export const TRAVEL = 'TravelAdventure';
export const EXPLORE = 'ExploreActivities';
export const ENTERTAINMENT = 'ENTERTAINMENT';
export const WORK = 'WORK';
export const OOTB = 'OOTB';

export const categoriesMappings = {
  [HEALTH] : {
    label: 'Health & Wellness',
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
  [WORK]: {
    label: 'Work & Social Networking',
  },
  [OOTB]: {
    label: 'Out of the Box',
  },
}

export const categories = _.values(categoriesMappings);