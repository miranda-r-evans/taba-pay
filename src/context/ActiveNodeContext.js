import { createContext, useContext, useReducer } from 'react';

export const ActiveNodeContext = createContext(null);

export const ActiveNodeDispatchContext = createContext(null);

export function ActiveNodeProvider({children}) {
  const [activeNode, dispatch] = useReducer(
    activeNodeReducer,
    false
  )
  return (
    <ActiveNodeContext.Provider value={activeNode}>
      <ActiveNodeDispatchContext.Provider value={dispatch}>
        {children}
      </ActiveNodeDispatchContext.Provider>
    </ActiveNodeContext.Provider>
  )
}

export function useActiveNode() {
  return useContext(ActiveNodeContext);
}

export function useActiveNodeDispatch() {
  return useContext(ActiveNodeDispatchContext);
}

function activeNodeReducer(activeNode, action) {
  switch (action.type) {
    case 'change': {
      return action.id;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
