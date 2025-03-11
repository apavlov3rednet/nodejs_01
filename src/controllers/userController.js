const Storage = require('./../services/storage.js');

const getAllUsers = (req,res) => {
    let arr = new Storage('user');
    //Получить содержимое директории
    return arr.getAllFiles();
};

const getOneUser = async (req,res) => {
    let userName = req.params.id;
    let arr = new Storage('user');
    let content = JSON.parse(await arr.readFile(userName));
    let bIsAdmin = false;

    content.group.filter(function(item) { 
        if(item === 'admin') {
            bIsAdmin = true;
        }
    });

    if(bIsAdmin) {
        return JSON.stringify({error: 'You not access to admin group users'});
    }
    
    return JSON.stringify(content);
}

const setUser = (req,res) => { //request, response
    let arr = new Storage('user');
    let content = req.body;
    if(req.params.id) {
        arr.updateFile(req.params.id, content);
        return true;
    }
    else {
        let nameFile = content.login;
        return arr.createFile(nameFile, content);
    }
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