import store from './store'
import planets from './planet_view'
import ship from './ship_view'
import camera from './camera_view'
import star from './star_view'
import trade from './trade_view'
import { viewCallbacks } from './trade'
import spaceBg from './space_bg'
import { getCamera, getRenderer, getScene } from './db'

export default (state: State) => {
  let scene: THREE.Scene = getScene(state)
  let renderer: THREE.Renderer = getRenderer(state)
  camera(state)
  planets(state.planets, scene)
  ship(state.ship, scene)
  star(state.stars, scene)
  trade(state, viewCallbacks)
  spaceBg(scene)
  renderer.render(scene, getCamera(state))
}
