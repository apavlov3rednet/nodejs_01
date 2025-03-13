const Storage = require('../../services/storage.js');
const Access = require('./Access.js');

class Data {
    static test() {
        console.log('this version add');
    }

    async getByLogin(login) {
        let arr = new Storage('user');
        let content = JSON.parse(await arr.readFile(login));
        if(Access.checkAdminGroup(content.group)) {
            return JSON.stringify({error: 'You not access to admin group users'});
        }
        return JSON.stringify(content);
    }

    async setUser(userData) {
        let arr = new Storage('user');
        let nameFile = userData.login;

        console.log('find', arr.findFile(nameFile));

        return arr.createFile(nameFile, userData);
    }
}

module.exports = Data;