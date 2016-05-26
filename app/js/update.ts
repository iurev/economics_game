/// <reference path="../../typings/index.d.ts" />

import { State } from './initial_state'
import {
    updateValues as updateCameraValues
} from './camera'
import {
    updateValues as updateShipValues
} from './ship'
import updateTrade from './trade'

export default function(state: State) {
    updateCameraValues(state.camera, state.keys)
    updateShipValues(state)
    updateTrade(state)
    if (state.keys.indexOf(27) !== -1) {
        state.trade = {}
    }
    return state
}
