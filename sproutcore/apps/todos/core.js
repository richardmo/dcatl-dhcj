Todos = SC.Application.create(
  /** @scope Todos.prototype */ {

  NAMESPACE: 'Todos',
  VERSION: '0.1.0',

  // Create the store using the specific app's implementation of Reader.CascadeDataSource
  store: SC.Store.create({
    commitRecordsAutomatically: YES
  }).from('Todos.DataSource'),
});
