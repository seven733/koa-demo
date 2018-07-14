module.exports = ({ Todo }) => {
  return {
    createTodo: async (data) => {
      let result = await Todo.create(data);
      return result;
    },
    getTodos: async (query = {}) => {
      let newQuery = {};
      if (query.id) {
        newQuery._id = query.id;
      }
      if (query.title) {
        newQuery.title = query.title;
      }
      return await Todo.find(newQuery);
    },
    editTodo: async (id, data) => {
      await Todo.update({ _id: id }, { $set: data });
      return Todo.findOne({ _id: id });
    },
    deleteTodo: async id => {
      const result = await Todo.remove({ _id: id });
      return { success: result.n === 1 };
    }
  };
};
