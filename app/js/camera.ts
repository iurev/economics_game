const coeff = 1
const minZ = 40

const initialState: Camera = {
  fov: 10,
  near: 0.1,
  far: 1000,
  x: 0,
  y: 0,
  z: 200
}

const inArray = (array, elem) => {
  return array.indexOf(elem) !== -1
};

export const updateValues = (camera, keys) => {
  let z = camera.z
  if (inArray(keys, 76)) z += coeff
  if (inArray(keys, 80)) z -= coeff
  if (z < minZ) z = minZ
  camera.z = z
  let horCoeff = coeff / (250 / z)
  if (inArray(keys, 68)) camera.x += horCoeff
  if (inArray(keys, 83)) camera.y -= horCoeff
  if (inArray(keys, 65)) camera.x -= horCoeff
  if (inArray(keys, 87)) camera.y += horCoeff
}

export const init = (state) => {
  let options = state.camera = initialState
  options.aspect = window.innerWidth / window.innerHeight
}
