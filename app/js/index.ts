import * as THREE from 'three'
import store from './store'
import render from './render'
import addListeners from './listeners'

const gameLoop = (time: number = undefined) => {
  requestAnimationFrame(gameLoop)
  store().dispatch({ type: 'UPDATE_VALUES', time: time })
  render(store().getState())
}

store().dispatch({ type: 'INIT' })
addListeners(store)
gameLoop()
