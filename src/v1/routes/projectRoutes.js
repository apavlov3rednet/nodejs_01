const express = require('express');
const projectController = require('../../controllers/projectController.js');
const router = express.Router();

//Событие: Получить все группы
router.route('/').get(async (req, res) => {
    //вызвать версию и метод 
    let result = await projectController.getAllProjects();
    res.send(result); //json
});

//Событие: Создает пользователя
router.route('/').post((req, res) => {
    let result = projectController.setProject(req, res);
    res.send(result);
});

//Событие: Получение одного пользователя по айди
router.route('/:id/').get(async (req, res) => {
    let result = await projectController.getOneProject(req, res);
    res.send(result);
});

//Событие: Обновление пользователя
router.route('/:id/').patch((req, res) => {
    let result = projectController.setProject(req, res);
    res.send(result);
});

//Событие: Удаление пользователя
router.route('/:id/').delete((req, res) => {
    let result = projectController.deleteProject(req);
    res.send(`<h2>Проект ${req.params.id} успешно удален.</h2>`);
});

module.exports = router;