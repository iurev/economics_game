var redux = require('redux');
var createStore = redux.createStore;

var initialState = {
    planets: [
        {
            x: 0,
            y: 0,
            r: 1.5,
            color: 0x75B3DA
        },
        {
            x: 3,
            y: -5,
            r: 0.5,
            color: 0xA01C4A
        },
        {
            x: 5,
            y: 20,
            r: 1,
            color: 0x46A01C
        }
    ],
    stars: [
        {
            x: 1,
            y: 10,
            color: 0xffff00,
            r: 5
        }
    ]
}


function counter(state = initialState, action) {
  switch (action.type) {
  default:
    return state
  }
}
let s = createStore(counter)

export default function store() {
    return s;
}