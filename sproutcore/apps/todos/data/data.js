sc_require('models/todo');

Todos.DataSource = SC.DataSource.extend({

  defaultPath: "//api.dcatl.lo/json-rest/todo",

  fetch: function(store, query) {
    if (query.recordType === Todos.Todo) {

      SC.debug("FETCHING ALL RECORDS...");

      SC.Request.getUrl(this.get('defaultPath')).json()
        .header({'Accept': 'application/json'})
        .notify(this, this.didFetchTodo, store, query)
        .send();

      return YES;
    }

    return NO;
  },

  didFetchTodo: function(response, store, query) {
    if (SC.ok(response)) {
      SC.debug("RECORD(S) FETCHED. SET RECORD STATE READY.");
      store.loadRecords(query.recordType, response.get('body'));
      store.dataSourceDidFetchQuery(query);
    }
    else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  createRecord: function(store, storeKey) {
    store.dataSourceDidComplete(storeKey);
  },

  updateRecord: function(store, storeKey) {
    var record = store.readDataHash(storeKey);
    var path = this.get('defaultPath') + '/' + store.idFor(storeKey);

    SC.debug("SENDING PUT REQUEST [id: "+store.idFor(storeKey)+"]...");

    SC.Request.putUrl(path, { 'isCompleted': record.isCompleted}).json()
      .header({'Accept': 'application/json'})
      .notify(this, this.didUpdatedRecord, store, storeKey)
      .send();
  },

  didUpdatedRecord: function(response, store, storeKey) {
    if (SC.ok(response)) {
      SC.debug("PUT RESPONSE RECEIVED [id: "+store.idFor(storeKey)+"]. SET RECORD STATE CLEAN");
      store.dataSourceDidComplete(storeKey);
    }
    else {
      store.dataSourceDidError(storeKey, response);
    }
  },

  destroyRecord: function(store, storeKey) {
    var path = this.get('defaultPath') + '/' + store.idFor(storeKey);

    SC.debug("SENDING DELETE REQUEST [id: "+store.idFor(storeKey)+"]");

    SC.Request.deleteUrl(path).json()
      .header({'Accept': 'application/json'})
      .notify(this, this.didDestroyedRecord, store, storeKey)
      .send();
  },

  didDestroyedRecord: function(response, store, storeKey) {
    if (SC.ok(response)) {
      SC.debug("DELETE RESPONSE RECEIVED [id: "+store.idFor(storeKey)+"]. SET RECORD STATE CLEAN");
      store.dataSourceDidDestroy(storeKey);
    }
    else {
      store.dataSourceDidError(response);
    }
  }
});
