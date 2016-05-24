/// <reference path="../../typings/index.d.ts" />

var initialState = [{
    x: 0,
    y: 0,
    r: 1.5,
    color: 0x75B3DA
}, {
    x: 3,
    y: -5,
    r: 0.5,
    color: 0xA01C4A
}, {
    x: 5,
    y: 20,
    r: 1,
    color: 0x46A01C
}]

export var init = function(state) {
    var planets = state.planets = initialState
}