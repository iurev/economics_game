import * as THREE from 'three'
var mouse = new THREE.Vector2()

export default function(store) {
  var onKeyUp = function(event) {
    store().dispatch({
      type: 'KEYBOARD_KEYUP',
      keyCode: event.keyCode
    })
  }

  var onKeyDown = function(event) {
    store().dispatch({
      type: 'KEYBOARD_KEYDOWN',
      keyCode: event.keyCode
    })
  }

  function onDocumentMouseDown(event) {
    var state = store().getState()
    var scene = state.scene.obj
    var camera = state.camera.obj
    var renderer = state.renderer.obj

    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    pos.z = 250

    store().dispatch({
      type: 'MOUSE_DOWN',
      pos: pos
    })
  }

  var onDocumentMouseUp = () => {
    store().dispatch({
      type: 'MOUSE_UP'
    })
  }

  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('keydown', onKeyDown)
  document.getElementsByTagName('canvas')[0].addEventListener('mousedown', onDocumentMouseDown)
  document.getElementsByTagName('canvas')[0].addEventListener('mouseup', onDocumentMouseUp)
}
