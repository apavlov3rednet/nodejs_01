const express = require('express'); //axios - современный аналог
const cors = require('cors');
const bodyParser = require('body-parser');
const v1UserRouter = require('./v1/routes/userRoutes');
const v1GroupRouter = require('./v1/routes/groupRoutes');
const v1ProjectRouter = require('./v1/routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Разрешить запросы с этого источника
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешить эти методы
}));
app.use(express.static('../public'));

//Явно указываем, что в запросе у нас может существовать тело
//в формате json
//app.use(bodyParser));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*'); //Указываем какому приложению мы разрешаем доступ к серверным запросам
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, PATCH'); // 'GET, POST'
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); //Разрешить все что указано выше и считать валидным
    //res.setHeader(':', true); //Разрешить все что указано выше и считать валидным 
    next();
});

app.use(express.urlencoded({ extended : true}));
/**
 * use - middleware
 */
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/groups', v1GroupRouter);
app.use('/api/v1/projects', v1ProjectRouter);
app.use('/api/auth', (req, res) => {
    //Метод для генерации токена
    //Актуальный ли юзер
    //есть ли у него права
});
/**
 * 404 ошибка
 */
app.use((req, res) => {
    res
        .status(404)
        //.sendFile(createPath('404'));
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});