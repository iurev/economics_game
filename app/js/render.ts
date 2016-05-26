/// <reference path="../../typings/index.d.ts" />

import store from './store'
import planets from './planet_view'
import ship from './ship_view'
import camera from './camera_view'
import star from './star_view'
import trade from './trade_view'
import spaceBg from './space_bg'
import * as THREE from 'three'

export default function (state) {
    var scene = state.scene.obj
    var renderer = state.renderer.obj
    var cameraObj = camera(state.camera)
    planets(state.planets, scene)
    ship(state.ship, scene)
    star(state.stars, scene)
    trade(state)
    spaceBg(scene)
    renderer.render(scene, cameraObj);
}