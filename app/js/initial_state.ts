const initialState: State =  {
  threeObjects: {},
  camera: {},
  planets: [],
  stars: [],
  ship: {},
  mouse: {
    x: undefined,
    y: undefined
  },
  keys: [],
  stocks: {},
  resources: {},
  trade: {},
  gameInfo: {
    planets: {
      lastUpdatedResourceTime: 0
    },
    user: {
      money: 1000
    }
  }
}

export default initialState

export const savedOrInitialState = (): State => {
  let saved = localStorage.getItem('save')
  if (saved) {
    return JSON.parse(saved)
  } else {
    return initialState
  }
}

export const stateForKey = (initialStateForKey: any, key: string): any => {
  let saved = localStorage.getItem('save')
  if (saved) {
    return JSON.parse(saved)[key]
  } else {
    return initialStateForKey
  }
}
