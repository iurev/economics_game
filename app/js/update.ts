/// <reference path="../../typings/index.d.ts" />

import {
    updateValues as updateCameraValues
} from './camera'
import {
    updateValues as updateShipValues
} from './ship'

export default function(state) {
    updateCameraValues(state.camera, state.keys)
    updateShipValues(state)
    return state
}