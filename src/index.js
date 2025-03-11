const express = require('express');
const bodyParser = require('body-parser');
const v1UserRouter = require('./v1/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

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