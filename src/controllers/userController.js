const Storage = require('./../services/storage.js');

const getAllUsers = (req,res) => {
    let arr = new Storage('user');
    //Получить содержимое директории
    return arr.getAllFiles();
};

const getOneUser = (req,res) => {
    let userName = req.params.id;
    let arr = new Storage('user');
    let content = arr.readFile(userName);

    if(content.group.filter(item => item === 'admin')) {
        return 'You not access to admin group users';
    }
    
    return content;
}

const setUser = (req,res) => { //request, response
    let arr = new Storage('user');
    let content = req.post.toArray();
    if(req.params.id > 0) {
        arr.updateFile(req.params.id, content);
        return true;
    }
    else {
        let nameFile = content.userName;
        return arr.updateFile(nameFile, content);
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