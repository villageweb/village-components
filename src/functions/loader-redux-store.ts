const START_ASYNC = "START_ASYNC";
const STOP_ASYNC = "STOP_ASYNC";

type LoadingAction = { action: string };

const reducer = (
  state: LoadingAction[] = [],
  action: { type: string; payload: LoadingAction }
) => {
  switch (action.type) {
    case START_ASYNC:
      return [...state, action.payload];
    case STOP_ASYNC:
      return state.filter(
        (l: LoadingAction) => action.payload.action !== l.action
      );
  }
  return state;
};

const startAsync = (action: string, params?: object) => ({
  type: START_ASYNC,
  payload: { action, ...params },
});

const stopAsync = (action: string, params?: object) => ({
  type: STOP_ASYNC,
  payload: { action, ...params },
});

export { startAsync, stopAsync, reducer as reduxLoaderReducer };
