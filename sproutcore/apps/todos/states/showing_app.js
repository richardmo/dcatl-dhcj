Todos.SHOWING_APP = SC.State.design({
  enterState: function() {
    Todos.mainPage.get('mainPane').append();
    Todos.mainPage.get('field').becomeFirstResponder();
  },

  exitState: function() {},

  addTodo: function (view) {
    var todo = (view.get('value') || '').trim();

    if (todo !== '') {
      var record = {
        title: todo
      };

      SC.Request.postUrl("//api.dcatl.lo/json-rest/todo", record).json()
        .header({'Accept': 'application/json'})
        .notify(this, this.didCreatedTodo, view)
        .send();

      view.set('value', '');
    }
  },

  didCreatedTodo: function(response) {
    if (SC.ok(response)) {
      Todos.store.createRecord(Todos.Todo, response.get('body'));
    }
  },

  clearCompletedTodos: function() {
    this.gotoState('SHOWING_DESTROY_CONFIRMATION', this);
  }
});
