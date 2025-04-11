const Storage = require('../../services/storage.js');
const Access = require('../Access.js');
const Secure = require('../Secure.js');

/**
 * Класс работы с хранилищем пользователя
 */
class Data {

    constructor(headers) {
        this.obStorage = new Storage('group');
        this.arObjects = ['group', 'user', 'project', 'task'];
        // this.clientLogin = headers.Auth || false;
        // this.clientSecret = headers.secret || false;
        // this.publicKey = headers.publickey || false;
        // this.access = new Access(this.clientLogin, this.clientSecret, this.publicKey);
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

    async matrix(arGroups = []) {
        if(arGroups.length === 0)
            return false;

        let arPromises = [];

        arPromises = arGroups.map(async (groupName) => {
            try { 
                let result = {};
                result = JSON.parse(await this.getByFileName(groupName)).rule;
                return result;
            } catch (error) {
                console.error(`Error processing group ${groupName}:`, error);
                throw error;
            }
        });

        try {
            const values = await Promise.all(arPromises);
            return values;
        } catch (error) {
            console.error('Error in processing promises:', error);
            throw error;
        }
    }

    checkAccess(curValue, newValue) {
        console.log(curValue, newValue);
        if(!curValue && !newValue) {
            return {c: '0', r: '0', u: '0', d: '0'}
        }

        if(!curValue && newValue) {
            return {
                c : (newValue.c) ? newValue.c : '0',
                r : (newValue.r) ? newValue.r : '0',
                u : (newValue.u) ? newValue.u : '0',
                d : (newValue.d) ? newValue.d : '0'
            }
        }

        if(curValue && newValue) {
            return {
                c : (curValue.c == '1'  || newValue.c == '1') ? '1' : '0',
                r : (curValue.r == '1'  || newValue.r == '1') ? '1' : '0',
                u : (curValue.u == '1'  || newValue.u == '1') ? '1' : '0',
                d : (curValue.d == '1'  || newValue.d == '1') ? '1' : '0'
            }
        }
    }

    prepareRules(matrix = []) {
        if(matrix.length === 0)
            return false;

        let row = {};

        matrix.map(arMatrix => {
            this.arObjects.forEach(objectName => {
                row[objectName] = this.checkAccess(row[objectName], arMatrix[objectName]);
                console.log(row);
            });
        });

        console.log(row);

        return row;
    }
}

module.exports = Data;