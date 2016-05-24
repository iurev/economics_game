/// <reference path="../../typings/index.d.ts" />
import * as THREE from 'three'

var initialState = [{
    x: 1,
    y: 10,
    color: 0xffff00,
    r: 5
}]

export var init = function(state) {
    var stars = state.stars = initialState
    var scene = state.scene.obj
    stars.forEach(function(star: any) {
        let material = new THREE.MeshPhongMaterial({
            color: star.color,
            shininess: 120,
            emissive: 0xbb8383,
            transparent: true,
            opacity: 0.5
        });

        let geometry2 = new THREE.SphereGeometry(star.r, 32, 32);
        let sphere = new THREE.Mesh(geometry2, material);
        sphere.position.x = star.x
        sphere.position.y = star.y
        scene.add(sphere);

        var light = new THREE.PointLight();
        light.position.set(star.x, star.y, 0);
        scene.add(light);
    })
}