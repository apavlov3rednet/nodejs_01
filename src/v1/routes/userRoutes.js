import { Router } from 'express';
import userController from './../../controllers/userController';
const router = Router();

//Получить всех пользователей
router.route('/').get((req, res) => {
    //вызвать версию и метод 
    let result = userController.getAllUsers();
    res.send(result);
});

//Получение одного пользователя по айди
router.route('/:id').get((req, res) => {
    let result = userController.getOneUser(req, res);
    res.send(result);
});

router.route('/').post((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

router.route('/:id').put((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

router.route('/:id').delete((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

export default router;