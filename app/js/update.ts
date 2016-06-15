import {
  updateValues as updateCameraValues
} from './camera'
import {
  updateValues as updateShipValues
} from './ship'
import {
  updateResourcesThrottled as updatePlanetsResources
} from './planet'
import updateTrade from './trade'

export default (state: State, time: number) => {
  updateTrade(state)
  if (state.keys.indexOf(27) !== -1) {
    state.trade = {}
  }
  if (!state.trade.leftStockId) {
    updateShipValues(state)
  }
  updatePlanetsResources(state, time)
  updateCameraValues(state.camera, state.keys)
  state.mouse.isUp = false
  return state
}
