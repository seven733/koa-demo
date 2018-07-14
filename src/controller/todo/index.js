module.exports = ({ Todos }) => {
  return {
    createTodo: async (ctx) => {
      const data = ctx.request.body;
      ctx.body = await Todos.createTodo(data);
    },
    getTodos: async (ctx) => {
      const query = ctx.request.query;
      ctx.body = await Todos.getTodos(query);
    },
    editTodo: async (ctx) => {
      ctx.body = await Todos.editTodo(ctx.params.id, ctx.request.body);
    },
    deleteTodo: async (ctx) => {
      ctx.body = await Todos.deleteTodo(ctx.params.id);
    }
  };
};
