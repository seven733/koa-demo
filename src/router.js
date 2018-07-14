const Router = require('koa-router');
const Controllers = require('./controller');

const router = new Router();

router.post('/login', ctx => Controllers.Users.login(ctx));
router.post('/register', ctx => Controllers.Users.register(ctx));

router.get('/users', ctx => Controllers.Users.getUsers(ctx));

router.get('/todos', ctx => Controllers.Todos.getTodos(ctx));
router.post('/todos', ctx => Controllers.Todos.createTodo(ctx));
router.post('/todos/:id', ctx => Controllers.Todos.editTodo(ctx));
router.delete('/todos/:id', ctx => Controllers.Todos.deleteTodo(ctx));

module.exports = { router };
