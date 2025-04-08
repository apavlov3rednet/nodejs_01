const Storage = require('../../services/storage.js');
const Access = require('../Access.js');
const Secure = require('../Secure.js');

/**
 * Класс работы с хранилищем пользователя
 */
class Data {
    constructor(headers) {
        this.obStorage = new Storage('group');
        this.clientLogin = headers.Auth || false;
        this.clientSecret = headers.secret || false;
        this.publicKey = headers.publickey || false;
        this.access = new Access(this.clientLogin, this.clientSecret, this.publicKey);
    }

    async getByFileName(name) {
        let content = JSON.parse(await this.obStorage.readFile(name));
        return JSON.stringify(content);
    }

    async setGroup(arData) {
        let nameFile = arData.name;
        let issetFile = await this.obStorage.findFile(nameFile);

        if(issetFile) {
            return await this.obStorage.updateFile(nameFile, arData);
        }
        else {
            return this.obStorage.createFile(nameFile, arData);
        }
    }

    async dropGroup(arData) {
        let login = arData.name;

        if(!this.access.checkPublicKey) return;

        this.obStorage.deleteFile(arData);

    }
}

module.exports = Data;