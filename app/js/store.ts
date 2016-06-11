import * as redux from 'redux'
import init from './init'
import update from './update'
import keyboard from './keyboard'
import initialState from './initial_state'

const createStore = redux.createStore

const mouseClick = (state, action) => {
  state.mouse = action.pos
  return state
}

const mouseUp = (state) => {
  state.mouse.isUp = true
  return state
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return init(state)
    case 'KEYBOARD_KEYUP':
      return keyboard.keyUp(state, action)
    case 'KEYBOARD_KEYDOWN':
      return keyboard.keyDown(state, action)
    case 'UPDATE_VALUES':
      return update(state)
    case 'MOUSE_DOWN':
      return mouseClick(state, action)
    case 'MOUSE_UP':
      return mouseUp(state)
    default:
      return state
  }
}

const store = createStore(reducers)

export default () => {
  return store
}
