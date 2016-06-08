/// <reference path="../../typings/index.d.ts" />

import * as redux from 'redux'
import init from './init'
import update from './update'
import keyboard from './keyboard'
import initialState from './initial_state'

var createStore = redux.createStore;


var mouseClick = function(state, action) {
  state.mouse = action.pos
  return state
}

var mouseUp = function(state) {
  state.mouse.isUp = true
  return state
}


var reducers = function(state = initialState, action) {
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

var store = createStore(reducers)

export default function() {
  return store;
}
