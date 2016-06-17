/// <reference path='../typings/index.d.ts' />
/// <reference path='../app/js/camera.d.ts' />
/// <reference path='../app/js/initial_state.d.ts' />
/// <reference path='../app/js/stock.d.ts' />
/// <reference path='../app/js/planet.d.ts' />

import { copy, default as save } from '../app/js/save'
import { clone } from 'lodash'
import initialState from '../app/js/initial_state'

describe('Stock', () => {
  describe('#copy', () => {
    it('should return copy of state', () => {
      let state: State = clone(initialState)
      let copiedState: State = copy(state)
      expect(Object.keys(state).toString()).toEqual(Object.keys(copiedState).toString())
    })
    it('should be copy', () => {
      let state: State = clone(initialState)
      let copiedState: State = copy(state)
      state.keys = [1, 2, 3, 4]
      expect(copiedState.keys).toEqual([])
    })
    it('shouldn-t contain threejs objects', () => {
      let state: State = clone(initialState)
      state.threeObjects = {
        camera: {}
      }
      let copiedState: State = copy(state)
      expect(copiedState.threeObjects.camera).toEqual(undefined)
    })
  })

  describe('#save', () => {
    afterEach(() => {
      localStorage.removeItem('save')
    })
    it('should save state in local storage', () => {
      save(initialState)
      expect(localStorage.getItem('save')).not.toBeUndefined()
    })
  })
})
