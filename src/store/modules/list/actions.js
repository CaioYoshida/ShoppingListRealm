export function loadList(list, listID) {
  return {
    type: 'LOAD_LIST',
    list,
    listID,
  };
}

export function unloadList() {
  return {
    type: 'UNLOAD_LIST',
  };
}

export function addToList(item) {
  return {
    type: 'ADD_TO_LIST',
    item,
  };
}

export function removeFromList(id) {
  return {
    type: 'REMOVE_FROM_LIST',
    id,
  };
}

export function updateProductFromList(id, name, quantity, unit) {
  return {
    type: 'UPDATE_PRODUCT_FROM_LIST',
    id,
    name,
    quantity,
    unit,
  };
}

export function checkItemFromList(id) {
  return {
    type: 'CHECK_ITEM_FROM_LIST',
    id,
  };
}
