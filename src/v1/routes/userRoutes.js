const express = require('express');
const userController = require('./../../controllers/userController.js');
const router = express.Router();

//Событие: Получить всех пользователей
router.route('/').get(async (req, res) => {
    //вызвать версию и метод 
    let result = await userController.getAllUsers(req);
    res.send(result); //json
});

//Событие: Создает пользователя
router.route('/').post((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

//Событие: Получение одного пользователя по айди
router.route('/:id/').get(async (req, res) => {
    let result = await userController.getOneUser(req, res);
    res.send(result);
});

//Событие: Обновление пользователя
router.route('/:id/').patch((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

//Событие: Удаление пользователя
router.route('/:id/').delete((req, res) => {
    let result = userController.deleteUser(req);
    res.send(`<h2>Пользователь ${req.params.id} успешно удален.</h2>`);
});

module.exports = router;