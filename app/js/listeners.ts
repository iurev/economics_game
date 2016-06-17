import * as THREE from 'three'
let mouse = new THREE.Vector2()
import { getCamera, getRenderer, getScene } from './db'

export default (store) => {
  const onKeyUp = (event) => {
    store().dispatch({
      type: 'KEYBOARD_KEYUP',
      keyCode: event.keyCode
    })
  }

  const onKeyDown = (event) => {
    store().dispatch({
      type: 'KEYBOARD_KEYDOWN',
      keyCode: event.keyCode
    })
  }

  const onDocumentMouseDown = (event) => {
    let state: State = store().getState()
    let scene: THREE.Scene = getScene(state)
    let camera: THREE.Camera = getCamera(state)
    let renderer: THREE.Renderer = getRenderer(state)

    event.preventDefault()

    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1

    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5)
    vector.unproject(camera)
    let dir = vector.sub(camera.position).normalize()
    let distance = -camera.position.z / dir.z
    let pos = camera.position.clone().add(dir.multiplyScalar(distance))
    pos.z = 250

    store().dispatch({
      type: 'MOUSE_DOWN',
      pos: pos
    })
  }

  let onDocumentMouseUp = () => {
    store().dispatch({
      type: 'MOUSE_UP'
    })
  }

  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('keydown', onKeyDown)
  document.getElementsByTagName('canvas')[0].addEventListener('mousedown', onDocumentMouseDown)
  document.getElementsByTagName('canvas')[0].addEventListener('mouseup', onDocumentMouseUp)
}
