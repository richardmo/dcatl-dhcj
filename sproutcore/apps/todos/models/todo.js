sc_require('core');

Todos.Todo = SC.Record.extend({
  nid: SC.Record.attr(Number),
  vid: SC.Record.attr(Number),
  title: SC.Record.attr(String),
  isCompleted: SC.Record.attr(Boolean),

  primaryKey: 'nid'
});
