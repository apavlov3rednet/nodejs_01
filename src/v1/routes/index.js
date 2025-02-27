import { Router } from 'express';
const router = Router();

router.route('/task').get((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/task').post((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/task/:id').get((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/task/:id').put((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
router.route('/task/:id').delete((req, res) => {
    res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

export default router;