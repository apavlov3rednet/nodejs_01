const express = require('express');
const groupController = require('../../controllers/groupController.js');
const router = express.Router();

//Событие: Получить все группы
router.route('/').get((req, res) => {
    //вызвать версию и метод 
    let result = groupController.getAllGroups();
    res.send(result); //json
});

//Событие: Создает пользователя
router.route('/').post((req, res) => {
    let result = groupController.setGroup(req, res);
    res.send(result);
});

//Событие: Получение одного пользователя по айди
router.route('/:id/').get(async (req, res) => {
    let result = await groupController.getOneUser(req, res);
    res.send(result);
});

//Событие: Обновление пользователя
router.route('/:id/').patch((req, res) => {
    let result = groupController.setGroup(req, res);
    res.send(result);
});

//Событие: Удаление пользователя
router.route('/:id/').delete((req, res) => {
    let result = groupController.deleteGroup(req);
    res.send(`<h2>Пользователь ${req.params.id} успешно удален.</h2>`);
});

module.exports = router;