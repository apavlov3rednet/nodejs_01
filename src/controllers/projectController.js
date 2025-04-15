const Storage = require('./../services/storage.js');

function getVersion(url) {
    return url.split('/')[2];
}

const setProject = async (req,res) => { //request, response
    const version = getVersion(req.baseUrl);
    const Data = require('../' + version + '/projects/Data.js');
    let data = new Data(req.headers);
    return await data.setProject(req.body);
}


const getAllProjects = (req,res) => {
    let arr = new Storage('projects');
    //Получить содержимое директории
    return arr.getAllFiles();
};

/**
 * Получение пользователя по логину
 * @param {*} req - request
 * @param {*} res - response
 * @returns 
 */
const getOneProject = async (req,res) => {
    const version = getVersion(req.baseUrl);
    const Data = require('../' + version + '/projects/Data.js');
    let data = new Data(req.headers);
    return await data.getByFileName(req.params.id);
}

const deleteProject = (req) => {
    const version = getVersion(req.baseUrl);
    const Data = require('../' + version + '/projects/Data.js');
    let data = new Data(req.headers);
    data.dropProject(req.params.id);
}

module.exports = {
    setProject,
    getAllProjects,
    getOneProject,
    deleteProject
}