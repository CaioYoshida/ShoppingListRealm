import produce from 'immer';

const INITIAL_STATE = {
  listID: '',
  products: [],
};

export default function list(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOAD_LIST':
      return produce(state, (draft) => {
        draft.products = JSON.parse(action.list);
        draft.listID = action.listID;
      });
    case 'UNLOAD_LIST':
      return produce(state, (draft) => {
        draft.products = [];
        draft.listID = '';
      });
    case 'ADD_TO_LIST':
      return produce(state, (draft) => {
        draft.products.push({
          ...action.item,
          check: false,
        });
      });
    case 'REMOVE_FROM_LIST':
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(
          (p) => p.id === action.id,
        );

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
        }
      });
    case 'UPDATE_PRODUCT_FROM_LIST':
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(
          (p) => p.id === action.id,
        );

        if (productIndex >= 0) {
          const currentValue = draft.products[productIndex];

          draft.products[productIndex] = {
            id: currentValue.id,
            name: action.name,
            quantity: action.quantity,
            unit: action.unit,
            check: currentValue.check,
          };
        }
      });
    case 'CHECK_ITEM_FROM_LIST':
      return produce(state, (draft) => {
        const productIndex = draft.products.findIndex(
          (p) => p.id === action.id,
        );

        if (productIndex >= 0) {
          const currentCheckValue = draft.products[productIndex].check;

          draft.products[productIndex].check = !currentCheckValue;
        }
      });
    default:
      return state;
  }
}
