import { showSpinner, hideSpinner } from "./spinner";

const ASYNC_ACTION_LIFECYCLE_STATES = ["pending", "fulfilled", "rejected"];

const isAsyncAction = (action) =>
  ASYNC_ACTION_LIFECYCLE_STATES.some((suffix) => action.type.endsWith(`/${suffix}`));

const getActionLifecycleState = (action) =>
  ASYNC_ACTION_LIFECYCLE_STATES.find((suffix) => action.type.endsWith(`/${suffix}`)) || null;

const spinnerMiddleware = ({ dispatch }) => {
  let pendingOperations = 0;

  return (next) => (action) => {
    if (isAsyncAction(action)) {
      const actionSuffix = getActionLifecycleState(action);

      if (actionSuffix === "pending") {
        pendingOperations++;
        if (pendingOperations === 1) {
          dispatch(showSpinner());
        }
      } else if (actionSuffix === "fulfilled" || actionSuffix === "rejected") {
        pendingOperations = Math.max(0, pendingOperations - 1);
        if (pendingOperations === 0) {
          dispatch(hideSpinner());
        }
      }
    }

    return next(action);
  };
};

export default spinnerMiddleware;
