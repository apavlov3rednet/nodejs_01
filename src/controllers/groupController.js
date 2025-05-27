//Описать контроллер группы пользователей
//1. Создание/Удаление/Изменене - CRUD
//2. Задание прав группе
//3. Сравнени ролей

const Storage = require('./../services/storage.js');

function getVersion(url) {
    return url.split('/')[2];
}

const setGroup = async (req,res) => { //request, response
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/groups/Data.js');
    let data = new userData(req.headers);
    return await data.setGroup(req.body);
}


const getAllGroups = (req,res) => {
    let arr = new Storage('group');

    let filter = {};
    let count = 100;
    let offset = 0;
    //prepare filter

    if(req.query) {
        count = req.query?.count || count;
        offset = req.query?.offset || offset;
    }
    
    //Получить содержимое директории
    return arr.getAllFiles(filter, count, offset);
};

/**
 * Получение пользователя по логину
 * @param {*} req - request
 * @param {*} res - response
 * @returns 
 */
const getOneGroup = async (req,res) => {
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/groups/Data.js');
    let data = new userData(req.headers);
    return await data.getByFileName(req.params.id);
}

const deleteGroup = (req) => {
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/groups/Data.js');
    let data = new userData(req.headers);
    data.dropGroup(req.params.id);
}

module.exports = {
    setGroup,
    getAllGroups,
    getOneGroup,
    deleteGroup
}