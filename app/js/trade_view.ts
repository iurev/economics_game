import { State } from './initial_state';
import * as Ractive from 'ractive';
import 'jquery';

var view = null

var createNew = (left, right) => {
    view = new Ractive({
      // The `el` option can be a node, an ID, or a CSS selector.
      el: '#auction',

      // We could pass in a string, but for the sake of convenience
      // we're passing the ID of the <script> tag above.
      template: '#template',

      // Here, we're passing in some initial data
      data: { left, right }
    });
}

var update = (left, right) => {
  view.set('left', left)
  view.set('right', right)
}

export default (state: State) => {
    var trade = state.trade
    var left = state.resources[trade.left] 
    var right = state.resources[trade.right] 
    if (view) {
      update(JSON.stringify(left), JSON.stringify(right))
    } else {
      createNew(JSON.stringify(left), JSON.stringify(right))
    }
}

