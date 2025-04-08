const Storage = require('../../services/storage.js');
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

        const userRole = content.group;
        let matrixRole = {};
        const arGroups = new Storage('group');
        const arObject = ['task', 'user', 'group', 'project'];

        await userRole.forEach(async item => {
            let role = JSON.parse(await arGroups.readFile(item));

            arObject.forEach(obRoleName => {
                if(role.rule[obRoleName]) {
                    matrixRole[obRoleName] = {
                        c : (role.rule[obRoleName].c === '1') ? 1 : 0,
                        r : (role.rule[obRoleName].r === '1') ? 1 : 0,
                        u : (role.rule[obRoleName].u === '1') ? 1 : 0,
                        d : (role.rule[obRoleName].d === '1') ? 1 : 0
                    }
                }
            });
        });

        console.log(matrixRole);
        content.matrixRole = matrixRole;

        console.log(content);
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