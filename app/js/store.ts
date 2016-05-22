/// <reference path="../../typings/index.d.ts" />

var redux = require('redux');
var createStore = redux.createStore;
var init = require('./init').default
var update = require('./update').default
var keyboard = require('./keyboard').default
var initialState = require('./initial_state').default

var reducers = function(state = initialState, action) {
    switch (action.type) {
        case 'INIT':
            return init(state)
        case 'KEYBOARD_KEYUP':
            return keyboard.keyUp(state, action)
        case 'KEYBOARD_KEYDOWN':
            return keyboard.keyDown(state, action)
        case 'UPDATE':
            return update(state)
        default:
            return state
    }
}

var store = createStore(reducers)

export default function() {
    return store;
}
