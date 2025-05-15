const Storage = require('./../services/storage.js');

function getVersion(url) {
    return url.split('/')[2];
}

/**
 * Получение всех записей
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllUsers = async (req,res) => {
    let arr = new Storage('user');
    //Получить содержимое директории
    return await arr.getAllFiles();
};

/**
 * Получение пользователя по логину
 * @param {*} req - request
 * @param {*} res - response
 * @returns 
 */
const getOneUser = async (req,res) => {
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/users/Data.js');
    let data = new userData(req.headers);
    return await data.getByLogin(req.params.id);
}

/**
 * Создание/обновление пользователя
 * @param {*} req - request
 * @param {*} res - response
 * @returns 
 */
const setUser = async (req,res) => { //request, response
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/users/Data.js');
    let data = new userData(req.headers);
    return await data.setUser(req.body);
}

/**
 * Удаление пользователя
 * @param {*} req - request
 */
const deleteUser = (req) => {
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/users/Data.js');
    let data = new userData(req.headers);
    data.dropUser(req.params.id);
}

module.exports = {
    getAllUsers,
    getOneUser,
    setUser,
    deleteUser
}