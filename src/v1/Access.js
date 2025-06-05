const storage = require('../services/storage.js');

class AccessUser {
    #client = null;
    #secret = null;
    #key = null;

    constructor(client, auth) {
        this.#client = client;
        this.#secret = auth.split(' ')[1];
        this.accessStorage = new storage('access');
    }

    checkPublicKey() {
        console.log(this.#secret)

        //Получить сначала по this.#client сохраненный ключ
        //Сравнить полученный ключ с присланным
        if(this.#secret === '12346')
            return true;
        else 
            return false;
    }

    getRules() {
        if(!this.checkPublicKey()) return false;

        //Читаем содержимое файла пабликкей и возвращаем массив его значений
    }

    checkAdminGroup(groups) {
        let bIsAdmin = false;
        groups.filter(function(item) { 
            if(item === 'admin') {
                bIsAdmin = true;
            }
        });
        return bIsAdmin;
    }
}

module.exports = AccessUser;