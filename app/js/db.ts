import { assign } from 'lodash'

let id = 0

export const getById = (state: State, name: string, id: number) => {
  return state[name][id]
}

export const create = (state: State, name: string, initialState: any): number => {
  state[name][++id] = assign({}, initialState)
  return id
}
