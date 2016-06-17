/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { clone, isEqual } from 'lodash'
import { default as initialState, savedOrInitialState, stateForKey } from '../app/js/initial_state'

describe('State', () => {
  describe('#initialState', () => {
    it('should contain something', () => {
      expect(Object.keys(initialState).length).toBeGreaterThan(0)
    })
  })

  describe('#savedOrInitialState', () => {
    it('should return initial state', () => {
      expect(initialState).toEqual(savedOrInitialState())
    })
    it('should return initial state', () => {
      let fakeState = { ok: true }
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(fakeState))
      expect(fakeState).toEqual(savedOrInitialState())
    })
  })

  describe('#stateForKey', () => {
    it('should return initial state', () => {
      let gameInfoState = stateForKey(initialState.gameInfo, 'gameInfo')
      expect(initialState.gameInfo).toEqual(gameInfoState)
    })
    it('should return initial state', () => {
      let fakeState = {
        gameInfo: { ok: true }
      }
      spyOn(localStorage, 'getItem').and.callFake((key) => {
        return JSON.stringify(fakeState)
      })
      expect(fakeState.gameInfo).toEqual(stateForKey(undefined, 'gameInfo'))
    })
  })
})
