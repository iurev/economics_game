/// <reference path="../../typings/index.d.ts" />

'use strict'

var store = require('./store').default
var Rx = require('rxjs/Rx');
var THREE = require('three');

var mouse = new THREE.Vector2();

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

document.addEventListener( 'mousedown', onDocumentMouseDown, false)

function onDocumentMouseDown( event ) {
  var state = store().getState()
  var scene = state.scene.obj
  var camera = state.camera.obj
  var renderer = state.renderer.obj

  event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  pos.z = 250

  store().dispatch({ type: 'MOUSE_DOWN', pos: pos })
}

var keyups = Rx.Observable.fromEvent(window, 'keyup')
  .subscribe(onKeyUp)

var keydowns = Rx.Observable.fromEvent(window, 'keydown')
  .subscribe(onKeyDown)

var keydowns = Rx.Observable.fromEvent(document.body, 'mousedown')
  .subscribe(onDocumentMouseDown)

init();
gameLoop();
