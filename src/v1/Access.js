const storage = require('../services/storage.js');

class AccessUser {
    #client = null;
    #secret = null;
    #key = null;

    constructor(client, secret, key) {
        this.#client = client;
        this.#secret = secret;
        this.#key = key;
        this.accessStorage = new Storage('access');
    }

    checkPublicKey() {
        if(!this.#key === 'sdfsdf-gdfhfgh-rwerwerw-bxcb')
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