const Storage = require('../../services/storage.js');
const Access = require('./Access.js');

class Data {
    constructor() {
        this.userStorage = new Storage('user');
    }

    async getByLogin(login) {
        let content = JSON.parse(await this.userStorage.readFile(login));
        if(Access.checkAdminGroup(content.group)) {
            return JSON.stringify({error: 'You not access to admin group users'});
        }
        return JSON.stringify(content);
    }

    async setUser(userData) {
        let nameFile = userData.login;
        if(!!await this.userStorage.findFile(nameFile)) {
            return await this.userStorage.updateFile(nameFile, userData);
        }
        else {
            return this.userStorage.createFile(nameFile, userData);
        }
    }

    async dropUser(userData) {
        let login = userData.login;
        
    }
}

module.exports = Data;