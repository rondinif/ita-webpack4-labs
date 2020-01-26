var state = {};

export const getState = () => state;

export const setState = nextState => {
  state = nextState;
};