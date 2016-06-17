import store from './store'
import planets from './planet_view'
import ship from './ship_view'
import camera from './camera_view'
import star from './star_view'
import trade from './trade_view'
import { viewCallbacks } from './trade'
import spaceBg from './space_bg'
import { getCamera, getRenderer } from './db'

export default (state) => {
  let scene = state.scene.obj
  let renderer: THREE.Renderer = getRenderer(state)
  camera(state)
  planets(state.planets, scene)
  ship(state.ship, scene)
  star(state.stars, scene)
  trade(state, viewCallbacks)
  spaceBg(scene)
  renderer.render(scene, getCamera(state))
}
