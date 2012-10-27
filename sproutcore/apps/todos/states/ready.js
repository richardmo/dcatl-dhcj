Todos.READY = SC.State.design({
  enterState: function() {
    // Find all pending and completed Todo.
    var tasks = Todos.store.find(SC.Query.local(Todos.Todo, { orderBy: 'nid DESC' }));
    var tasksCompleted = Todos.store.find(SC.Query.local(Todos.Todo, 'isCompleted = true'));

    Todos.todosController.set('content', tasks);
    Todos.completedTodosController.set('content', tasksCompleted);
  },

  didLoad: function () {
    if (Todos.todosController.get('status') === SC.Record.READY_CLEAN) {
      this.gotoState('SHOWING_APP');
    }
  }.stateObserves('Todos.todosController.status'),

  exitState: function() {
    // Nothing to worry about here.
  }
});
