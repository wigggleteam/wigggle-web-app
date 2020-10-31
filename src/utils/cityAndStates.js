import _ from 'lodash'

export const cities = {
  bangalore: {
    key: 'bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
  },
  new_delhi: {
    key: 'new_delhi',
    city: 'New Delhi',
    state: 'Delhi',
  }
}

export const states = (() => {
  const states = {}
  _.values(cities).forEach((cityObj) => {
    const state = cityObj.state;
    if(!states[state]){
      states[state] = 1;
    }
  })
  return _.keys(states);
})();
