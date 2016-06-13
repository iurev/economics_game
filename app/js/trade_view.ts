/// <reference path="./initial_state.d.ts" />
/// <reference path="./resource.d.ts" />

import { TradeActionType } from './trade'
import { ResourceTypes } from './resource'
import { getById } from './db'
import * as Ractive from 'ractive'
import 'jquery';

let view = undefined

const createNew = (renderObj, callbacks) => {
  view = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '#auction',

    // We could pass in a string, but for the sake of convenience
    // we're passing the ID of the <script> tag above.
    template: '#template',

    // Here, we're passing in some initial data
    data: { renderObj }
  });
  view.on('sell', (event) => {
    callbacks.trade(event.context.name, TradeActionType.Sell)
  })
  view.on('buy', (event) => {
    callbacks.trade(event.context.name, TradeActionType.Buy)
  })
  view.on('close', () => {
    callbacks.trade(undefined, TradeActionType.Close)
  })
}

const update = (renderObj) => {
  view.set('renderObj', renderObj)
}

export default (state: State, callbacks: any) => {
  let trade = state.trade
  let left: Stock = getById(state, 'stocks', trade.leftStockId)
  let right: Stock = getById(state, 'stocks', trade.rightStockId)
  let renderObj
  if (left && right) {
    renderObj = ResourceTypes.map(key => {
      let leftResource: Resource = getById(state, 'resources', left[`${key}ResourceId`])
      let rightResource: Resource = getById(state, 'resources', right[`${key}ResourceId`])
      return {
        name: key,
        valueLeft: leftResource.amount,
        priceLeft: leftResource.buyPrice,
        valueRight: rightResource.amount,
        priceRight: leftResource.cellPrice
      }
    })
  } else {
    renderObj = undefined
  }

  if (view) {
    update(renderObj)
  } else {
    if (!renderObj) return
    createNew(renderObj, callbacks)
  }
}
