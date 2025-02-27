//routing

//task.js
//Перемещаем всю маршрутизацию по своим скриптам внутри routes

// /src/controllers/userController.js
const getAllUsers = (req,res) => {
    res.send('Get all users');
}

const getOneUser = (req,res) => {
    res.send('Get once user');
}

const createNewUser = (req, res) => {
    res.send('Create a new user');
};

const updateOneUser = (req, res) => {
    res.send('Update an existing user');
};

const deleteOneUser = (req, res) => {
    res.send('Delete an existing user');
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};

//Патчим /src/v1/routes/userRoutes.js
const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:Id', userController.getOneUser);

router.post('/', userController.createNewUser);

router.patch(
    '/:Id',
    userController.updateOneUser
);

router.delete(
    '/:Id',
    userController.deleteOneUser
);

module.exports = router;