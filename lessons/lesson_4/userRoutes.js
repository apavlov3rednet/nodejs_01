import { Router } from 'express';
import { userController } from './'
const router = Router();

//Получить всех пользователей
router.route('/').get((req, res) => {
    //вызвать версию и метод 
    // /api/v1/

});

router.route('/').post((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/:id').get((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/:id').put((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/:id').delete((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

export default router;