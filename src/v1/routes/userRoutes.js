const express = require('express');
const userController = require('./../../controllers/userController.js');
const router = express.Router();

/**
 * @apiVersion 1.0.0
 * @api {get} /api/v1/user Get list users
 * 
 * @apiName GetUserList
 * @apiGroup User
 *
 * @apiSuccess {Object} User additional info.
 */
router.route('/').get(async (req, res) => {
    //вызвать версию и метод 
    let result = await userController.getAllUsers(req);
    res.send(result); //json
});

/**
 * @apiVersion 1.0.0
 * @api {post} /api/v1/user Create new user
 * 
 * @apiName SetUser
 * @apiGroup User
 *
 * @apiSuccess {Object} User additional info.
 */
router.route('/').post((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

/**
 * @apiVersion 1.0.0
 * @api {get} /api/v1/user/:id Request User information
 * 
 * @apiName GetUserById
 * @apiGroup User
 * 
 * @apiParam {string} id User ID.
 *
 * @apiSuccess {Object} User info.
 */
router.route('/:id/').get(async (req, res) => {
    let result = await userController.getOneUser(req, res);
    res.send(result);
});


/**
 * @apiVersion 1.0.0
 * @api {patch} /user/:id Update user info
 * 
 * @apiName PatchUser
 * @apiGroup User
 * 
 * @apiParam {string} id User ID.
 *
 * @apiSuccess {Object} User info.
 */
router.route('/:id/').patch((req, res) => {
    let result = userController.setUser(req, res);
    res.send(result);
});

/**
 * @apiVersion 1.0.0
 * @api {delete} /api/v1/user/:id Drop user
 * 
 * @apiName DropUser
 * @apiGroup User
 * 
 * @apiParam {string} id User ID.
 *
 * @apiSuccess {Object} User info.
 */
router.route('/:id/').delete((req, res) => {
    let result = userController.deleteUser(req);
    res.send(`<h2>Пользователь ${req.params.id} успешно удален.</h2>`);
});

module.exports = router;