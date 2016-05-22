/// <reference path="../../typings/index.d.ts" />

'use strict'

var store = require('./store').default
var Rx = require('rxjs/Rx');

var init = function () {
  store().dispatch({ type: 'INIT' })
}

var update = function() {
    store().dispatch({ type: 'UPDATE' })
}

var render = function () {
    var state = store().getState()
    var scene = state.scene.obj
    var camera = state.camera.obj
    var renderer = state.renderer.obj
    renderer.render(scene, camera);
};

var gameLoop = function() {
  requestAnimationFrame(gameLoop)
  update()
  render()
}

var onKeyUp = function (event) {
  store().dispatch({ type: 'KEYBOARD_KEYUP', keyCode: event.keyCode })
}

var onKeyDown = function (event) {
  store().dispatch({ type: 'KEYBOARD_KEYDOWN', keyCode: event.keyCode })
}

var keyups = Rx.Observable.fromEvent(window, 'keyup')
  .subscribe(onKeyUp)

var keydowns = Rx.Observable.fromEvent(window, 'keydown')
  .subscribe(onKeyDown)

init();
gameLoop();
