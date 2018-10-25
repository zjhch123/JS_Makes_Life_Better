import _ from './util'

const getItemKey = (obj, key) => {
  if (!obj || !key) {
    return
  }
  return _.isFunction(key) ? key(obj) : obj[key]
}

const makeKeyIndexAndFree = (list, key) => {
  const keyIndex = {}
  const free = []
  for (let i = 0, l = list.length; i < l; i++) {
    const item = list[i]
    const itemKey = getItemKey(item, key)
    if (itemKey) {
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex,
    free
  }
}

const diff = (oldList, newList, key) => {
  const oldMap = makeKeyIndexAndFree(oldList, key)
  const newMap = makeKeyIndexAndFree(newList, key)

  const newFree = newMap.free

  const oldKeyIndex = oldMap.keyIndex
  const newKeyIndex = newMap.keyIndex

  const moves = []

  const children = []

  let i = 0
  let item, itemKey, freeIndex = 0

  while (i < oldList.length) {
    item = oldList[i]
    itemKey = getItemKey(item, key)

    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null)
      } else {
        const newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    } else {
      const freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }

    i++
  }

  let simulateList = children.slice(0)

  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i)
      removeSimulate(i)
    } else {
      i++
    }
  }

  let j = i = 0

  console.log(simulateList)

  while (i < newList.length) {
    item = newList[i]
    itemKey = getItemKey(item, key)

    const simulateItem = simulateList[j]
    const simulateItemKey = getItemKey(simulateItem, key)

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++
      } else {
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item)
        } else {
          remove(i)
          removeSimulate(j)
          insert(i, item)
        }
      }
    } else {
      insert(i, item)
    }



    i++
  }




  function remove(index) {
    moves.push({
      index, type: 0
    })
  }

  function insert(index, item) {
    moves.push({
      index, type: 1, item
    })
  }

  function removeSimulate(index) {
    simulateList.splice(index, 1)
  }

  return {
    moves, 
    children
  }
}

const a = [{
  id: 0,
}, {
  id: 1,
}, {
  id: 2,
}, {
  id: 3,
}, {
  id: 4,
}]

const b = [ {
  id: 1,
}, {
  id: 4,
}, {
  id: 8,
}, {
  id: 2,
}, {
  id: 3,
}]

console.log(diff(a, b, 'id'))

export default diff