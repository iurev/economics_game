export default {
    threeObjects: {},
    camera: {
        obj: null,
        fov: 10,
        aspect: null,
        near: 0.1,
        far: 1000,
        x: 0,
        y: 0
    },
    scene: {
        obj: null
    },
    renderer: {
        obj: null
    },
    planets: [{
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
    }],
    stars: [{
        x: 1,
        y: 10,
        color: 0xffff00,
        r: 5
    }],
    keys: []
}
