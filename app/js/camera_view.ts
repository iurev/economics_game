import * as THREE from 'three'

let view = undefined

const createNew = (camera) => {
  view = new THREE.PerspectiveCamera(camera.fov, camera.aspect, camera.near, camera.far);
  camera.obj = view
  updateValues(camera)
}

const updateValues = (camera) => {
  view.position.x = camera.x
  view.position.y = camera.y
  view.position.z = camera.z
}

export default (camera) => {
  if (view) {
    updateValues(camera)
  } else {
    createNew(camera)
  }
  return view
}
