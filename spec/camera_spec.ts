/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { init } from '../app/js/camera'
import { clone } from 'lodash'
import initialState from '../app/js/initial_state'

describe('Camera', () => {
  it('should init camera', () => {
    let state: State = clone(initialState)
    init(state)
    expect(Object.keys(state.camera).length).toBeGreaterThan(0)
  })
})
