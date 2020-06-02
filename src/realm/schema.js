/**
 * Creating database Schema
 */

const ListSchema = {
  name: 'List',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string?',
    products: 'string?',
    date: 'date',
  },
};

export { ListSchema };
