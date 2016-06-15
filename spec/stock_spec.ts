/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { update } from '../app/js/stock'

describe('Stock', () => {
  it('should be a function', () => {
    // example spec
    expect(typeof update).toEqual('function')
    expect(update()).toEqual(1)
  })
})
