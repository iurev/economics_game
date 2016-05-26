export interface State {
    threeObjects: any,
    camera: any,
    scene: any,
    renderer: any,
    planets: Array<any>,
    stars: Array<any>
    ship: any,
    mouse: any,
    keys: Array<any>
    resources: any,
    trade: any
}

export default {
    threeObjects: {},
    camera: {},
    scene: {
        obj: null
    },
    renderer: {
        obj: null
    },
    planets: [],
    stars: [],
    ship: {},
    mouse: {
      x: null,
      y: null
    },
    keys: [],
    resources: {},
    trade: {}
}
