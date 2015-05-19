'use strict'

import isParent from 'subdir'
import Snapshot from './snapshot'

export function dispatch (root, listeners, diff) {
  diff.forEach((change) => {
    listeners.forEach(listener => trigger(root, listener, change))
  })
}

function trigger (root, listener, change) {
  if (below(listener.path, change.get('path'))) {
    if ((listener.event) === 'value') {
      listener.callback.call(listener.context, new Snapshot(root.child(listener.path)))
    }
  }
}

function below (parent, path) {
  return parent === path || isParent(parent, path)
}
