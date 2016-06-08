/// <reference path="../../typings/index.d.ts" />

'use strict'

import store from './store'
import render from './render'
import addListeners from './listeners'
import * as THREE from 'three'

var gameLoop = function() {
  requestAnimationFrame(gameLoop)
  store().dispatch({ type: 'UPDATE_VALUES' })
  render(store().getState())
}

store().dispatch({ type: 'INIT' })
addListeners(store)
gameLoop();
