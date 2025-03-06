const express = require('express');
const userController = require('./../../controllers/userController.js');
const router = express.Router();

//Получить всех пользователей
router.route('/').get((req, res) => {
    //вызвать версию и метод 
    let result = userController.getAllUsers();
    res.send(result); //json
});

//Получение одного пользователя по айди
router.route('/:id').get(async (req, res) => {
    let result = await userController.getOneUser(req, res);
    res.send(result);
});

router.route('/').post((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

router.route('/:id').patch((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

router.route('/:id').delete((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

module.exports = router;