const Storage = require('./../services/storage.js');

function getVersion(url) {
    return url.split('/')[2];
}

const getAllUsers = (req,res) => {
    let arr = new Storage('user');
    //Получить содержимое директории
    return arr.getAllFiles();
};

const getOneUser = async (req,res) => {
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/users/Data.js');
    let data = new userData();
    return await data.getByLogin(req.params.id);
}

const setUser = async (req,res) => { //request, response
    const version = getVersion(req.baseUrl);
    const userData = require('../' + version + '/users/Data.js');
    let data = new userData();
    return await data.setUser(req.body);
}

const deleteUser = (req,res) => {
    let arr = new Storage('user');
    arr.deleteFile(req.params.id);
}

module.exports = {
    getAllUsers,
    getOneUser,
    setUser
}