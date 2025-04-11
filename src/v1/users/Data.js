const Storage = require('../../services/storage.js');
const Group = require('../groups/Data.js');
const Access = require('../Access.js');
const Secure = require('../Secure.js');

/**
 * Класс работы с хранилищем пользователя
 */
class Data {
    constructor(headers) {
        this.userStorage = new Storage('user');
        this.clientLogin = headers.Auth || false;
        this.clientSecret = headers.secret || false;
        this.publicKey = headers.publickey || false;
        this.access = new Access(this.clientLogin, this.clientSecret, this.publicKey);
    }

    async getByLogin(login) {
        let content = JSON.parse(await this.userStorage.readFile(login));
        if(this.access.checkAdminGroup(content.group)) {
            return JSON.stringify({error: 'You not access to admin group users'});
        }

        const group = new Group();
        content.matrixRole = await group.matrix(content.group);
        content.rules = group.prepareRules(content.matrixRole);
        return JSON.stringify(content);
    }

    async setUser(userData) {
        let nameFile = userData.login;
        let issetFile = await this.userStorage.findFile(nameFile);

        if(issetFile) {
            return await this.userStorage.updateFile(nameFile, userData);
        }
        else {
            return this.userStorage.createFile(nameFile, userData);
        }
    }

    async dropUser(userData) {
        let login = userData.login;

        if(!this.access.checkPublicKey) return;

        this.userStorage.deleteFile(userData);

    }
}

module.exports = Data;